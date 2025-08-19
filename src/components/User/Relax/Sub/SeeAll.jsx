import React, { useState } from 'react'

import '../Main/NoiDungThuGian.css'
import './SeeAll.css'
import return_relax from '../../../../assets/images/Relax/return_relax.png'


import { Link, useLocation, useParams } from 'react-router-dom'
import GocThuGian from '../Main/GocThuGian'
import Pagination from './Pagination'

const XemTatCa = () => {
    const { slug } = useParams();
    const section = GocThuGian.find(sec => sec.slug === slug);

    const [activeIndex, setActiveIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = section.items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(section.items.length / itemsPerPage);
    const handleClick = (itemIdx, itemType) => {
        if (itemType !== 'loihay') return;
        setActiveIndex(activeIndex === itemIdx ? null : itemIdx);
    };

    if (!section) return <h2>Không tìm thấy nội dung</h2>;

    return (
        <div className='see-all'>
            <div className="see-all-text">
                <Link to="/userlayout/relax">
                    <img src={return_relax} alt="Quay lại" />
                </Link>
                <h4>{section.title}</h4>
            </div>

            <div className="see-all-content">
                <div className='noidung-bottom'>
                    {currentItems.map((item, itemIdx) => {
                        const globalIndex = startIndex + itemIdx;

                        return (
                            <div
                                key={globalIndex}
                                className={`${item.type} 
                                            ${item.type === 'loihay' 
                                            && activeIndex === globalIndex ? 'show' : ''}`
                                        }
                                onClick={() => {
                                    if (item.type === "loihay") {
                                        handleClick(globalIndex, item.type);
                                    } else if (item.url) {
                                        window.open(item.url, "_blank"); // mở YouTube
                                    }
                                }}
                                style={{ cursor: item.url || item.type === "loihay" ? "pointer" : "default" }}
                            >
                                <img src={item.img} alt={item.type} />
                                <div className='content-relax'>
                                    <p>{item.text}</p>
                                    {item.author && <h4>{item.author}</h4>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};


export default XemTatCa
