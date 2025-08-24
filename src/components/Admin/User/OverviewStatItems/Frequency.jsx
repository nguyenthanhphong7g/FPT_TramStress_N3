import React from 'react'
import './OverviewStatItems.css'
import frequencyimg from '../../../../assets/images/admin/frequency.png'

const Frequency = ({frequency}) => {
    return (
        <div className="overview-stat-item">
            <div className="stat-img-2">
                <img src={frequencyimg} alt="" />
            </div>
            <div className="stat-info">
                <h5>Mức độ thường xuyên</h5>
                <h4>{frequency}h/tuần</h4>
            </div>
        </div>
    )
}

export default Frequency
