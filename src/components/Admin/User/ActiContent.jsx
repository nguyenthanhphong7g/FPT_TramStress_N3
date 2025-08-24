import React, { useState } from 'react'
import './ActiContent.css'
import ChonNgay from '../../Common/Button/Admin/ChonNgay'
import Loc from '../../Common/Button/Admin/Loc'
import Pagination from '../../Common/Pagination/Admin/Pagination'
import './User.css'
import feedback from './ConsultingHistory'
import HistoryConsulting from './table/HistoryConsulting'

const ActiContent = () => {
    const itemsPerPage = 5;
    return (
        <div className="activity-content">
            <div className="activity-content-header">
                <h5>Lịch sử tư vấn</h5>
                <div className="filter-bar">
                    <ChonNgay />
                    <Loc />
                </div>
            </div>
            <HistoryConsulting arr_user={feedback} pagesize={itemsPerPage}/>
        </div>
    )
}

export default ActiContent
