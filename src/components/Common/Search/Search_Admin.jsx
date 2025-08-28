import React, { useState } from 'react';
import './Search_Admin.css';
import search_icon from '../../../assets/images/admin/search.png'

const Search_Admin = ({ onSearch }) => {
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
        <form className="search-bar" onSubmit={handleSubmit}>
            <div>
                <img src={search_icon} alt="" />
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
        </form>
    );
};

export default Search_Admin;
