import React, { useState } from 'react'
import Pagination from '../../Common/Pagination/Admin/Pagination'
import users from './UserData'
import Search_Admin from '../../Common/Search/Search_Admin'
import ChonNgay from '../../Common/Button/Admin/ChonNgay'
import Loc from '../../Common/Button/Admin/Loc'
import './User.css'
import TableUser from './table/TableUser'

const User = () => {
    const itemsPerPage = 10;
    return (
        <div className='admin-user'>
            <div className="admin-user-title">
                <h4>Người dùng</h4>
                <h5>Người dùng</h5>
            </div>
            <div className="admin-user-filter-bar">
                <Search_Admin />
                <div className="admin-filter">
                    <ChonNgay />
                    <Loc />
                </div>
            </div>
            <TableUser arr_user={users} pagesize={itemsPerPage}/>
        </div>
    )
}

export default User
