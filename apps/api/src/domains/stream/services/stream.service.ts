import { HttpErrors } from '@loopback/rest'
import { Repository, typeorm } from '@loopback/typeorm'
import { Track } from '../../../entities'
import Youtube from '@yimura/scraper'
import ytdl from 'ytdl-core'
import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { Readable } from 'stream'
import { env } from '../../../utils'

export class StreamService {
  private readonly cachePath = env.CACHE_PATH

  constructor(
    @typeorm.repository(Track)
    private readonly trackRepository: Repository<Track>,
    private readonly ytSearch = new Youtube.Scraper(),
  ) { }

  async searchTrackOnYoutube(trackName: string) {
    const { videos } = await this.ytSearch.search(trackName)

    return videos
  }

  downloadTrackFromYoutube(trackUrl: string) {
    return ytdl(trackUrl, { filter: 'audioonly', quality: 'highestaudio' })
  }

  async getTrackMetadata(trackUrl: string) {
    const info = await ytdl.getInfo(trackUrl)
    return ytdl.chooseFormat(info.formats, {
      filter: 'audioonly',
      quality: 'highestaudio',
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
      const trackMetadata = await this.getTrackMetadata(trackFromYt.link)

      return {
        track: trackStream,
        length: Number.parseInt(trackMetadata.contentLength),
        isCached: false,
      }
    }

    const cacheResult = await this.readTrackFromCache(trackFromDb.cacheKey)

    return {
      track: Readable.from(cacheResult),
      length: cacheResult.length,
      isCached: true,
    }
  }
}
