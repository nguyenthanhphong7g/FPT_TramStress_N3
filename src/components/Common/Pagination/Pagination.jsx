import React from 'react'
import './Pagination.css'
import page_into_left from '../../../assets/images/Relax/page_into_left.png'
import page_into_right from '../../../assets/images/Relax/page_into_right.png'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
            >
                <img src={page_into_left} alt="Trang trước" />
            </button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
            >
                <img src={page_into_right} alt="Trang sau" />
            </button>
        </div>
    );
};
export default Pagination
