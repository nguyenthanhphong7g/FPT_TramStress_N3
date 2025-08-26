import React, { useState } from 'react'
import eye from '../../../assets/images/admin/eye.png'
import pencil from '../../../assets/images/admin/pencil.png'
import trash from '../../../assets/images/admin/trash.png'
import Pagination from '../../Common/Pagination/Admin/Pagination'
import { useNavigate } from 'react-router-dom'

const TableExpert = () => {
    const pagesize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const startIdx = (currentPage - 1) * pagesize;
    const endIdx = startIdx + pagesize;

    // const currentUsers = arr_user.slice(startIdx, endIdx);
    // const handleViewUser = (user) => {
    //     navigate(`${user.id}`, { state: user }); // Truyền dữ liệu qua route state
    // };
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
                            <th>Chuyên gia</th>
                            <th>Số điện thoại</th>
                            <th>Giới tính</th>
                            <th>Chức danh</th>
                            <th>Trạng thái</th>
                            <th>Ngày thêm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='td-name'>
                                <div>
                                    Nguyễn Thanh Phong
                                    <h6>phong@gmail.com</h6>
                                </div>
                            </td>
                            <td>0123456789</td>
                            <td>Nam</td>
                            <td>Thạc sĩ</td>
                            <td>Đang hoạt động</td>
                            <td>03/08/2025</td>
                            <td className='admin-table-action'>
                                <button
                                    //onClick={() => handleViewUser(user)}
                                >
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
                    </tbody>
                </table>
            </div>
            <div className="footer-admin">
                {/* <Pagination
                    totalPages={Math.ceil(arr_user.length / pagesize)}
                    onPageChange={handlePageChange}
                    start={startIdx}
                    end={endIdx}
                    total={arr_user.length}
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
    )
}

export default TableExpert
