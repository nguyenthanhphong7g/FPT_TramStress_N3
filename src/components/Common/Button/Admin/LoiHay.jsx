import React from 'react'
import './btn2_admin.css'

const LoiHay = ({ isActive, onClick }) => {
    return (
        <div className="trending-content-btn">
            <button
                className={`${isActive ? 'active' : ''}`}
                onClick={onClick}
            >Giai điệu</button>
        </div>

    )
}

export default LoiHay
