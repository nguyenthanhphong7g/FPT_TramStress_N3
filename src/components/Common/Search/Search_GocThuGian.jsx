import React, { useState } from 'react'
import search from '../../../assets/images/Relax/search.png'
import './Search_GocThuGian.css'

const Search_GocThuGian = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setCurrentPage(1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            onSearch(query);          // Gọi hàm tìm kiếm
        }
    };
    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
            <img src={search} alt="" />
        </form>
    )
}

export default Search_GocThuGian
