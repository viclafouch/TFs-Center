class Video {
  constructor(video = {}) {
    this.id = video.id
    this.title = video.title || ''
    this.summary = video.summary || null
    this.description = video.description || null
    this.nbViews = video.nbViews || 0
    this.tags = video.tags || []
    this.removedAt = video.removedAt || null
    this.reviewedAt = video.reviewedAt || null
    this.createdAt = video.createdAt || null
    this.channel = video.channel || {}
  }

  get url() {
    return `https://www.youtube.com/watch?v=${this.id}`
  }

  thumbnail(size = 'default') {
    if (size === 'default') {
      return {
        url: `https://i.ytimg.com/vi/${this.id}/default.jpg`,
        width: 120,
        height: 90
      }
    } else if (size === 'standard') {
      return {
        url: `https://i.ytimg.com/vi/${this.id}/sddefault.jpg`,
        width: 640,
        height: 480
      }
    } else if (size === 'medium') {
      return {
        url: `https://i.ytimg.com/vi/${this.id}/mqdefault.jpg`,
        width: 320,
        height: 180
      }
    } else if (size === 'high') {
      return {
        url: `https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`,
        width: 480,
        height: 360
      }
    } else if (size === 'maxres') {
      return {
        url: `https://i.ytimg.com/vi/${this.id}/maxresdefault.jpg`,
        width: 1280,
        height: 720
      }
    }
  }
}

export default Video
