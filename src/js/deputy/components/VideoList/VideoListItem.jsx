import React, { useRef, memo } from 'react'
import { formatDistance } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle'
import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag'
import greyScreen from '@/img/grey-screen.jpg'
import Player from '../Player/Player'
import Modal from '../Modal/Modal'
import './video-list-item.scoped.scss'

function VideoListItem({ video, showCheckbox = false, checkedType, onCheck, onRemove }) {
  const player = useRef(null)
  const thumbnail = video.thumbnail('default')
  const isRemoved = !!video.removedAt
  const isReviewed = !!video.reviewedAt

  return (
    <>
      <Modal ref={player} fade id="player">
        <Player video={video} />
      </Modal>
      <li
        data-id={video.id}
        className={`video-list-item ${isRemoved ? 'video-removed' : ''} ${isReviewed ? 'video-reviewed' : ''}`}
      >
        {onRemove && (
          <span
            onClick={() => onRemove(video.id)}
            title="Remove from list"
            className="video-remove-from"
            role="button"
            aria-label="remove from list"
          >
            <FontAwesomeIcon icon={faTimes} size="1x" fixedWidth />
          </span>
        )}
        <div
          className="video-thumbnail"
          onClick={() => {
            if (!isRemoved) {
              player.current.open()
            }
          }}
        >
          <img
            src={!isRemoved ? thumbnail.url : greyScreen}
            alt={video.title}
            loading="lazy"
            width={thumbnail.width}
            height={thumbnail.height}
          />
          {!isRemoved && (
            <span className="video-thumbnail-play">
              <FontAwesomeIcon icon={faPlayCircle} size="2x" />
            </span>
          )}
        </div>
        <div className="video-content">
          <h3 className="video-title">
            <a href={video.url} target="_blank" rel="noreferrer">
              {video.removedAt ? 'This video is not longer avalaible' : video.title}
            </a>
          </h3>
          <div className="video-summary">
            <p
              dangerouslySetInnerHTML={{
                __html: video.summary
              }}
            />
          </div>
          {!video.removedAt && (
            <p className="video-notes">
              {video.channel.url && (
                <a className="video-channel" href={video.channel.url} target="_blank" rel="noreferrer">
                  {video.channel.name}
                </a>
              )}
              {!video.channel.url && <span className="video-channel">{video.channel.name}</span>}

              {video.createdAt && (
                <>
                  {' | '}
                  <span className="video-created">{video.createdAt}</span>
                </>
              )}

              {video.nbViews && (
                <>
                  {' | '}
                  <span>{video.nbViews.toLocaleString()} views</span>
                </>
              )}
            </p>
          )}
        </div>
        <div className="video-actions">
          {video.isValidRemovedAt && (
            <span className="video-status video-is-removed">
              <FontAwesomeIcon icon={faTrash} size="1x" fixedWidth />{' '}
              {formatDistance(new Date(video.removedAt), new Date(), {
                addSuffix: true
              })}
            </span>
          )}
          {video.reviewedAt && (
            <span className="video-status video-is-reviewed">
              <FontAwesomeIcon icon={faFlag} size="1x" fixedWidth />{' '}
              {video.isValidReviewedAt
                ? formatDistance(new Date(video.reviewedAt), new Date(), {
                    addSuffix: true
                  })
                : 'Already examined'}
            </span>
          )}
          <span className="video-id">
            <FontAwesomeIcon icon={faHashtag} size="1x" fixedWidth />
            {video.id}
          </span>
          {showCheckbox && (
            <>
              <label htmlFor={`video-${video.id}`}>
                Video
                <input
                  id={`video-${video.id}`}
                  name={`video-${video.id}`}
                  type="checkbox"
                  onChange={() =>
                    onCheck({
                      type: checkedType === 'video' ? null : 'video',
                      id: video.id
                    })
                  }
                  checked={checkedType === 'video'}
                />
              </label>
              <label htmlFor={`channel-${video.id}`}>
                Channel
                <input
                  id={`channel-${video.id}`}
                  name={`channel-${video.id}`}
                  type="checkbox"
                  onChange={() =>
                    onCheck({
                      type: checkedType === 'channel' ? null : 'channel',
                      id: video.id
                    })
                  }
                  checked={checkedType === 'channel'}
                />
              </label>
            </>
          )}
        </div>
      </li>
    </>
  )
}

export default memo(VideoListItem)
