import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faChrome } from '@fortawesome/free-brands-svg-icons/faChrome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { CONTRIBUTOR_LINK, HANGOUTS_ME, EMAIL_FLAGGER_LABEL } from '../../../../private'
import { YouTubeContext } from '../../main';
import { urlsAvailable } from '../../config';

export class Sidebar extends Component {
    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <div className="sidebar">
                        <div className="profile-wrapper">
                            <img src={context.state.user.avatar} alt={context.state.user.username} />
                        </div>
                        <nav className="navbar">
                            <ul className="nav-link">
                                <li>
                                    <a href="/flagging_history" className={'youtube-link '+(context.state.pathname === urlsAvailable[0] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faHistory} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">History</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/deputy?context=templates" className={'youtube-link ' + (context.state.pathname === urlsAvailable[3] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faFlag} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Templates</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/deputy?context=searches" className={'youtube-link ' + (context.state.pathname === urlsAvailable[4] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faSearch} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Searches</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/deputy" className={'youtube-link ' + (context.state.pathname === urlsAvailable[5] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faBullseye} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Targets</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/deputy?context=stats" className={'youtube-link ' + (context.state.pathname === urlsAvailable[2] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faChartLine} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Analytics</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={CONTRIBUTOR_LINK} className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faUsers} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Trusted Flagger Forum</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={EMAIL_FLAGGER_LABEL} target="_blank" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faEnvelope} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">trusted@flagging</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav-link">
                                <li>
                                    <a href="https://chrome.google.com/webstore/detail/tcs-center/hanknpkmjbfhcalmipokkfplndkohgdm?authuser=1" target="_blank" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faChrome} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">TC's Center</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={HANGOUTS_ME} target="_blank" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faComment} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Help</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faSignOutAlt} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Exit</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default Sidebar
