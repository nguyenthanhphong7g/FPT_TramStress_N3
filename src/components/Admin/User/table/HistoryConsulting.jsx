import React, { useState } from 'react'
import Pagination from '../../../Common/Pagination/Admin/Pagination'
import './AdminTable.css'

const HistoryConsulting = ({ arr_user, pagesize }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * pagesize;
    const endIdx = startIdx + pagesize;

    const currentFeedback = arr_user.slice(startIdx, endIdx);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    return (
        <div className="admin-user-table" style={{ minHeight: `${pagesize * 60 +125}px`}}>
            <div className="table-wrapper" >
                <table>
                    <colgroup>
                        <col style={{ width: '250px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Chuyên gia</th>
                            <th>Thời gian</th>
                            <th>Phản hồi</th>
                            <th>Đánh giá</th>
                            <th>Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFeedback.map((item, index) => (
                            <tr key={index}>
                                <td>{item.expertId}</td>
                                <td>{item.time}</td>
                                <td>{item.response}</td>
                                <td>{item.rating}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer-admin">
                <Pagination
                    totalPages={Math.ceil(arr_user.length / pagesize)}
                    onPageChange={handlePageChange}
                    start={startIdx}
                    end={endIdx}
                    total={arr_user.length}
                />
            </div>
        </div>

    )
}

export default HistoryConsulting
