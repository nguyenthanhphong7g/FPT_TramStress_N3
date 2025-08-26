import React from 'react'
import './btn2_admin.css'

const BaiTap = ({ isActive, onClick }) => {
    return (
        <div className="trending-content-btn">
            <button
                className={`${isActive ? 'active' : ''}`}
                onClick={onClick}
            >Bài tập</button>
        </div>

    )
}

export default BaiTap
