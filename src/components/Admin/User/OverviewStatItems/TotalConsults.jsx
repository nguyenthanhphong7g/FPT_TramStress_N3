import React from 'react'
import './OverviewStatItems.css'
import totalConsults from '../../../../assets/images/admin/totalConsults.png'

const TotalConsults = ({totalConsult}) => {
    return (
        <div className="overview-stat-item">
            <div className="stat-img-consult">
                <img src={totalConsults} alt="" />
            </div>
            <div className="stat-info">
                <h5>Tổng lượt tư vấn</h5>
                <h4>{totalConsult ?? 0}</h4>
            </div>
        </div>
    )
}

export default TotalConsults
