import React from 'react'
import average_rating from '../../../../assets/images/admin/average_rating.png'
import star from '../../../../assets/images/admin/star.png'

const AverageRating = ({ averageRating }) => {
    return (
        <div className="overview-stat-item">
            <div className="stat-img-rating">
                <img src={average_rating} alt="" />
            </div>
            <div className="stat-info">
                <h5>Đánh giá trung bình</h5>
                <div className="stat-info-content">
                    <h4>{averageRating ?? 0}</h4>
                    <img src={star} alt="" />
                </div>

            </div>
        </div>
    )
}

export default AverageRating
