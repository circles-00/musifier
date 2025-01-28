import { HttpErrors } from '@loopback/rest'
import { Repository, typeorm } from '@loopback/typeorm'
import { Track } from '../../../entities'
import Youtube from '@yimura/scraper'
import ytdl from '@distube/ytdl-core'
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
} from 'fs'
import { join } from 'path'
import { Readable } from 'stream'
import { env } from '../../../utils'
import ffmpeg from 'fluent-ffmpeg'

export class StreamService {
  private readonly cachePath = env.CACHE_PATH

  constructor(
    @typeorm.repository(Track)
    private readonly trackRepository: Repository<Track>,
    private readonly ytSearch = new Youtube.Scraper(),
  ) {}

  async searchTrackOnYoutube(trackName: string) {
    const { videos } = await this.ytSearch.search(trackName)

    return videos
  }

  convertWithFfmpeg(stream: Readable) {
    return ffmpeg(stream).audioBitrate(128).toFormat('mp3').pipe() as Readable
  }

  downloadTrackFromYoutube(trackUrl: string) {
    return this.convertWithFfmpeg(
      ytdl(trackUrl, {
        filter: ({ audioQuality, mimeType }) => {
          return (
            audioQuality === 'AUDIO_QUALITY_LOW' &&
            Boolean(mimeType?.includes('video/mp4'))
          )
        },
      }),
    )
  }

  async getTrackMetadata(trackUrl: string) {
    const info = await ytdl.getInfo(trackUrl)
    return ytdl.chooseFormat(info.formats, {
      filter: ({ audioQuality, mimeType }) => {
        return (
          audioQuality === 'AUDIO_QUALITY_LOW' &&
          Boolean(mimeType?.includes('video/mp4'))
        )
      },
    })
  }

  async cacheTrack(trackName: string, trackId: number, trackStream: Readable) {
    const cachePathExists = existsSync(this.cachePath)
    if (!cachePathExists) {
      mkdirSync(this.cachePath)
    }

    return new Promise((resolve) => {
      trackStream.pipe(createWriteStream(join(this.cachePath, trackName)))
      trackStream.on('end', () => {
        this.trackRepository.update(trackId, { cacheKey: trackName })
        resolve('success')
      })
    })
  }

  async readTrackFromCache(cacheKey: string) {
    return readFileSync(join(this.cachePath, cacheKey))
  }

  async removeTrackFromCache(trackId: number) {
    const trackFromDb = await this.trackRepository.findOne({
      where: { id: trackId },
    })

    if (!trackFromDb) {
      throw new HttpErrors.BadRequest('Track not found')
    }

    if (!trackFromDb.cacheKey) {
      throw new HttpErrors.BadRequest('Track not cached')
    }

    unlinkSync(join(this.cachePath, trackFromDb.cacheKey))

    return await this.trackRepository.update(trackId, { cacheKey: undefined })
  }

  checkIfCacheExists(trackName: string | null) {
    if (!trackName) {
      return false
    }

    return existsSync(join(this.cachePath, trackName))
  }

  // Note: Right now we're caching on demand, but for best results sometime in the future we should have all the tracks cached when syncing the data
  async streamTrack(trackId: number) {
    const trackFromDb = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['artists'],
    })

    if (!trackFromDb) {
      throw new HttpErrors.BadRequest('Track not found')
    }

    const trackName = `${trackFromDb.name} ${trackFromDb.artists
      .map(({ name }) => name)
      .join(',')}`

    const cacheExists = this.checkIfCacheExists(trackFromDb?.cacheKey)

    if (!trackFromDb.cacheKey || !cacheExists) {
      const [trackFromYt] = await this.searchTrackOnYoutube(trackName)
      const trackStream = this.downloadTrackFromYoutube(trackFromYt.link)

      this.cacheTrack(trackName, trackFromDb.id, trackStream)

      return {
        track: trackStream,
        isCached: false,
      }
    }

    const cacheResult = await this.readTrackFromCache(trackFromDb.cacheKey)

    return {
      track: Readable.from(cacheResult),
      isCached: true,
    }
  }
}
