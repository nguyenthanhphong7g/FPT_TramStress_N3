import React from 'react'
import Loc from '../../Common/Button/Admin/Loc'
import Pagination from '../../Common/Pagination/Admin/Pagination'
import trash from '../../../assets/images/admin/trash.png'
import message_filled from '../../../assets/images/admin/messagefilled.png'

const AppointmentTable = () => {
    const pagesize = 5;
    return (
        <div className="appointment-table">
            <div className="trending-content-header">
                <h5>Lịch hẹn hôm nay</h5>
                <div className="filter-bar">
                    <Loc />
                </div>
            </div>
            <div className="admin-user-table"
                style={{ minHeight: `${pagesize * 60 + 125}px` }}
            >
                <div className="table-wrapper">
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
                                <th>Người dùng</th>
                                <th>Thời gian</th>
                                <th>Ngày</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nguyễn Thanh Phong</td>
                                <td>abc</td>
                                <td>14:00-14:30</td>
                                <td>03/08/2025</td>
                                <td className='admin-table-action'>
                                    <button>
                                        <img src={message_filled} alt="" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nguyễn Thanh Phong</td>
                                <td>abc</td>
                                <td>14:00-14:30</td>
                                <td>03/08/2025</td>
                                <td className='admin-table-action'>
                                    <button>
                                        <img src={message_filled} alt="" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nguyễn Thanh Phong</td>
                                <td>abc</td>
                                <td>14:00-14:30</td>
                                <td>03/08/2025</td>
                                <td className='admin-table-action'>
                                    <button>
                                        <img src={message_filled} alt="" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nguyễn Thanh Phong</td>
                                <td>abc</td>
                                <td>14:00-14:30</td>
                                <td>03/08/2025</td>
                                <td className='admin-table-action'>
                                    <button>
                                        <img src={message_filled} alt="" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nguyễn Thanh Phong</td>
                                <td>abc</td>
                                <td>14:00-14:30</td>
                                <td>03/08/2025</td>
                                <td className='admin-table-action'>
                                    <button>
                                        <img src={message_filled} alt="" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer-admin">
                    {/* <Pagination
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        start={startIdx}
                        end={endIdx}
                        total={filteredContent.length}
                    /> */}
                    <Pagination
                        totalPages={0}
                        onPageChange={0}
                        start={0}
                        end={0}
                        total={0}
                    />
                </div>
            </div>
        </div>
    )
}

export default AppointmentTable
