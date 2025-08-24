import React from 'react'
import './InfoContent.css'
import icon_profile from '../../../assets/images/admin/icon_profile.png'

const InfoContent = () => {
    return (
        <div className="info-content">
            <div className='info-content-information' style={{padding:0}}>
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
                <h4>Nguyễn Thanh Phong</h4>
            </div>
            <div className="content-row">
                <div className="info-content-information">
                    <h5>Số điện thoại</h5>
                    <h4>0123456789</h4>
                </div>
                <div className="info-content-information">
                    <h5>Email</h5>
                    <h4>phong@gmail.com</h4>
                </div>
            </div>
            <div className="content-row">
                <div className="info-content-information">
                    <h5>Ngày sinh</h5>
                    <h4>19/06/2004</h4>
                </div>
                <div className="info-content-information">
                    <h5>Giới tính</h5>
                    <h4>Nam</h4>
                </div>
            </div>
        </div>
    )
}

export default InfoContent
