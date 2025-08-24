import React from 'react'
import './btn_admin.css'
import calendar from '../../../../assets/images/admin/calendar.png'

const ChonNgay = () => {
    return (
        <div className='admin-filter'>
            <button>
                <img src={calendar} alt="" />
                <p>Chọn ngày</p>
            </button>
        </div>
    )
}

export default ChonNgay
