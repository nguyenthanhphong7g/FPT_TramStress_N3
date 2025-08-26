import React, { useState } from 'react'
import Pagination from '../../Common/Pagination/Admin/Pagination'
import eye from '../../../assets/images/admin/eye.png'
import pencil from '../../../assets/images/admin/pencil.png'
import trash from '../../../assets/images/admin/trash.png'
import { useNavigate } from 'react-router-dom'
import './AdminTable.css'

const TableUser = ({ arr_user, pagesize }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const startIdx = (currentPage - 1) * pagesize;
    const endIdx = startIdx + pagesize;

    const currentUsers = arr_user.slice(startIdx, endIdx);
    const handleViewUser = (user) => {
        navigate(`${user.id}`, { state: user }); // Truyền dữ liệu qua route state
    };
    return (
        <div className="admin-user-table" style={{ minHeight: `${pagesize * 60 + 125}px` }}>
            <div className="table-wrapper">
                <table>
                    <colgroup>
                        <col style={{ width: '250px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Người dùng</th>
                            <th>Số điện thoại</th>
                            <th>Giới tính</th>
                            <th>Cảm xúc</th>
                            <th>Trạng thái</th>
                            <th>Ngày thêm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td className='td-name'>
                                    <div>
                                        {user.name}
                                        <h6>{user.email}</h6>
                                    </div>
                                </td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
                                <td>{user.emotion}</td>
                                <td>{user.status}</td>
                                <td>{user.date}</td>
                                <td className='admin-table-action'>
                                    <button onClick={() => handleViewUser(user)}>
                                        <img src={eye} alt="view" />
                                    </button>
                                    <button>
                                        <img src={pencil} alt="edit" />
                                    </button>
                                    <button>
                                        <img src={trash} alt="delete" />
                                    </button>
                                </td>
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

export default TableUser
