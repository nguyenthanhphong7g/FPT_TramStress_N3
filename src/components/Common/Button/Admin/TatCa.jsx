import React from 'react'
import './btn2_admin.css'

const TatCa = ({ isActive, onClick }) => {
    return (
        <div className="trending-content-btn">
            <button
                className={`${isActive ? 'active' : ''}`}
                onClick={onClick}
            >Tất cả</button>
        </div>


    )
}

export default TatCa
