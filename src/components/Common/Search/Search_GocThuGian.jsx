import React from 'react'
import search from '../../../assets/images/Relax/search.png'
import './Search_GocThuGian.css'

const Search_GocThuGian = () => {
    return (
        <div className="search-box">
            <input type="text" placeholder='Tìm kiếm' />
            <img src={search} alt="" />
        </div>
    )
}

export default Search_GocThuGian
