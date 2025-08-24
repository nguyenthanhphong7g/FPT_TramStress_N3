import React, { useState } from 'react';
import './Pagination.css';
import pre from '../../../../assets/images/admin/pre.png';
import next from '../../../../assets/images/admin/next.png';

const Pagination = ({ totalPages, onPageChange, start, end, total }) => {
    const [currentPage, setCurrentPage] = useState(1);
    start=start+1;
    if (end>total) end=total;
    const handleClick = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        if (onPageChange) onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...');
            } else if (currentPage >= totalPages - 1) {
                pages.push('...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
            }
        }

        return pages.map((page, idx) => {
            if (page === '...') {
                return <span key={`dot-${idx}`} className="pagination-dot">...</span>;
            }
            return (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => handleClick(page)}
                >
                    <div>
                        {page}
                    </div>
                </button>
            );
        });
    };

    return (
        <div className='pagination-admin'>
            <div className="pagination-admin-left">
                <h6>Showing {start} - {end} from {total}</h6>
            </div>
            <div className="pagination-admin-right">
                <button
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <div>
                        <img src={pre} alt="prev" />
                    </div>
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <div>
                        <img src={next} alt="next" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
