import { inject } from '@loopback/core'
import {
  api,
  get,
  HttpErrors,
  param,
  Response,
  RestBindings,
  del,
} from '@loopback/rest'
import { STREAM_SERVICE } from '../keys'
import { StreamService } from '../services'

@api({ basePath: '/stream' })
export class StreamController {
  constructor(
    @inject(STREAM_SERVICE) private readonly streamService: StreamService,

    @inject(RestBindings.Http.RESPONSE) private readonly response: Response,
  ) {}

  @get('/{id}')
  async streamTrack(@param.path.number('id') trackId: number) {
    const trackResult = await this.streamService.streamTrack(trackId)

    if (!trackResult) {
      throw new HttpErrors.BadRequest('Track not found')
    }

    this.response.setHeader('Content-Type', 'audio/mpeg')
    this.response.setHeader('Accept-Ranges', 'bytes')
    this.response.setHeader(
      'Content-Disposition',
      'inline; filename="stream.mp3"',
    )
    this.response.setHeader('Cache-Control', 'no-cache')
    this.response.setHeader('X-Accel-Buffering', 'no')

    return trackResult.track.pipe(this.response)
  }

  @del('/')
  async deleteTrackFromCache(@param.query.number('id') trackId: number) {
    const trackResult = await this.streamService.removeTrackFromCache(trackId)

    return trackResult
  }
}
