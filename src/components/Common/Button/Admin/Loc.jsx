import React from 'react'
import './btn_admin.css'
import filter from '../../../../assets/images/admin/filter.png'

const Loc = () => {
    return (
        <div className='admin-filter'>
            <button>
                <img src={filter} alt="" />
                <p>Lọc</p>
            </button>
        </div>
    )
}

export default Loc
