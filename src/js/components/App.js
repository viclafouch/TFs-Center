import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar';
import { YouTubeContext } from '@stores/YouTubeContext';
import FlagButton from '@components/FlagButton/FlagButton';
import AppRouter from '../routes/router';
import { withRouter } from "react-router";
import { fetchHistory, fetchSearch } from '@shared/api/Deputy';
import { getAllUrlParams, wait } from '@utils/index';

class App extends Component {

  constructor() {
    super()
    this.state = {
      isFetching: false
    }
  }

  async getVideos(type = 'history') {
    const params = getAllUrlParams()
    await this.props.context.setState('isLoading', true)
    try {
      let videos = []
      if (type === 'history') {
        videos = await fetchHistory(params)
      } else if (type === 'search') {
        videos = await fetchSearch(params)
      }
      await this.props.context.setMultipleState({
        ...videos,
        canFlag: type !== 'history',
        videosDisplayed: videos.videos
      })
      await wait(100) // Hide animation css pagination number changes
    } catch (error) {
      console.log(error)
    } finally {
      this.props.context.setState('isLoading', false)
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const params = getAllUrlParams()
      if (this.props.location.pathname === '/flagging_history') {
        return this.getVideos('history')
      } else if (params.search_query) {
        return this.getVideos('search')
      }
    }
  }

  render() {
      return (
          window.location.pathname !== '/watch'
          ?
            <React.Fragment>
                <Sidebar location={this.props.location} />
                <div className="main-container">
                  <AppRouter />
                </div>
            </React.Fragment>
          :
          <YouTubeContext.Consumer>
            {(context) => (
              <FlagButton
                videoWatched={context.state.videoWatched}
                videosToFlag={context.state.videosToFlag}
                setContextState={context.setState}
                removeVideo={context.setState}
              />
            )}
          </YouTubeContext.Consumer>
      )
  }
}

export default withRouter(App)