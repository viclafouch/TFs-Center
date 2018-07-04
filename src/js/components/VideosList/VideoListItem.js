import React, { Component } from 'react'

export class VideoListItem extends Component {

    constructor() {
        super();

        this.state = {
            iframeActive: false,
            active: false
        }
    }

    render() {

        let { video } = this.props;

        return (
            <article className={"video-item " + (!video.isRemoved ? 'isAccess' : '')}>
                {/* <label className="video-item-thumbnail" htmlFor={video.id}>
                    <img className="thumbnail" src={video.thumbnail.replace('default', 'hqdefault')} />
                </label> */}
                <div className="video-item-thumbnail">
                    <img className="thumbnail" src={video.thumbnail.replace('default', 'hqdefault')} />
                </div>
                <div className="video-item-text">
                    <h3 className="mgi--bottom-8 mgi--top-8 video-item-title">
                        <a href={video.url} target="_blank" title={!video.isRemoved ? video.title : ''} className={video.isRemoved ? 'removed-on-text' : ''}>{video.title || 'This video is not longer available'}</a>
                    </h3>
                    <a className="video-item-creator" href={video.channelLink}>{video.creator}</a>
                </div>
            </article>
        )
    }
}

export default VideoListItem