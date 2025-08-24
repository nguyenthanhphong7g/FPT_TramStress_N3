import React from 'react'
import './OverviewStatItems.css'
import totalInteractions from '../../../../assets/images/admin/totalInteractions.png'

const TotalInteractions = ({totalInteraction}) => {
    return (
        <div className="overview-stat-item">
            <div className="stat-img-3">
                <img src={totalInteractions} alt="" />
            </div>
            <div className="stat-info">
                <h5>Số nội dung tương tác</h5>
                <h4>{totalInteraction}</h4>
            </div>
        </div>
    )
}

export default TotalInteractions
