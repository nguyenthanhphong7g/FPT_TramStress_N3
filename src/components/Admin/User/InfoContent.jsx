import React from 'react'
import './InfoContent.css'
import icon_profile from '../../../assets/images/admin/icon_profile.png'
import { useLocation } from 'react-router-dom';

const InfoContent = () => {
    const location = useLocation();
    const user = location.state;
    return (
        <div className="info-content">
            <div className='info-content-information' style={{ padding: 0 }}>
                <div className="info-content-header ">
                    <div className='img'>
                        <img src={icon_profile} alt="" />
                    </div>
                    <div>
                        <h5>Thông tin cá nhân</h5>
                    </div>

                </div>
            </div>

            <div className="info-content-information">
                <h5>Họ và tên</h5>
                <h4>{user.user_name}</h4>
            </div>
            <div className="content-row">
                <div className="info-content-information">
                    <h5>Số điện thoại</h5>
                    <h4>{user.phone}</h4>
                </div>
                <div className="info-content-information">
                    <h5>Email</h5>
                    <h4>{user.email}</h4>
                </div>
            </div>
            <div className="content-row">
                <div className="info-content-information">
                    <h5>Tuổi</h5>
                    <h4>{user.age}</h4>
                </div>
                <div className="info-content-information">
                    <h5>Giới tính</h5>
                    <h4>{user.gender}</h4>
                </div>
            </div>
        </div>
    )
}

export default InfoContent
