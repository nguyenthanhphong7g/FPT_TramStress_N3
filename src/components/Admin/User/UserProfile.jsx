import React, { useState } from 'react'
import './UserProfile.css'
import arrow from '../../../assets/images/admin/arrow.png'
import avatar from '../../../assets/images/admin/avar.png'
import profile from '../../../assets/images/admin/profile.png'
import activities from '../../../assets/images/admin/activities.png'
import ActiContent from './ActiContent'
import InfoContent from './InfoContent'
import { useLocation, useParams } from 'react-router-dom'
import TotalConsults from './OverviewStatItems/TotalConsults'
import Frequency from './OverviewStatItems/Frequency'
import TotalInteractions from './OverviewStatItems/TotalInteractions'

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('information');
    const { id } = useParams();
    const location = useLocation();
    const user = location.state;
    return (
        <div className='user-profile'>
            <div className="admin-user-title">
                <h4>Người dùng</h4>
                <div className='admin-user-title-sub'>
                    <h5>Người dùng</h5>
                    <img src={arrow} alt="" />
                    <h5 className='title-sub-current'>Profile</h5>
                </div>
            </div>
            <div className="user-profile-content">
                <div className="overview">
                    <div className="overview-header">
                        <img src={avatar} alt="" />
                        <p>{user.name}</p>
                    </div>
                    <div className="overview-stats">
                        <TotalConsults totalConsult={user.totalConsults} />
                        <Frequency frequency={user.frequency} />
                        <TotalInteractions totalInteraction={user.totalInteractions} />
                    </div>
                </div>
                <div className="details">
                    <div className="tab-buttons">
                        <button
                            className={activeTab === 'information' ? 'active' : ''}
                            onClick={() => setActiveTab('information')}
                        >
                            <div className='tab-button-img'>
                                <img src={profile} alt="" />
                            </div>

                            <p>Profile</p>
                        </button>
                        <button
                            className={activeTab === 'activities' ? 'active' : ''}
                            onClick={() => setActiveTab('activities')}
                        >
                            <div className='tab-button-img'>
                                <img src={activities} alt="" />
                            </div>

                            <p>Hoạt động</p>
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'information' && (
                            <InfoContent />
                        )}

                        {activeTab === 'activities' && (
                            <ActiContent />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
