import React, { useState } from 'react'
import '../Main/NoiDungThuGian.css'
import './SeeAll.css'
import return_relax from '../../../../assets/images/Relax/return_relax.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import Pagination from '../../../Common/Pagination/Pagination'
import Item from '../Main/Item'
import dataExercise from '../../../../data/contentRelax/dataExercise'
import dataMusic from '../../../../data/contentRelax/dataMusic'
import dataQuote from '../../../../data/contentRelax/dataQuote'
import popularContent from '../../../../data/contentRelax/popularContent'

const XemTatCa = () => {
    const { slug } = useParams();
    const dataMap = {
        exercise: dataExercise,
        music: dataMusic,
        quote: dataQuote,
        popular: popularContent,
    };
    const data = dataMap[slug] || [];
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handleClick = (itemIdx, itemType) => {
        if (itemType !== 'quote') return;
        setActiveIndex(activeIndex === itemIdx ? null : itemIdx);
    };
    return (
        <div className='see-all'>
            <div className="see-all-text">
                <Link to="/userlayout/relax">
                    <img src={return_relax} alt="Quay lại" />
                </Link>
                <h4>Bài tập</h4>
            </div>
            <div className="see-all-content">
                <div className='noidung-bottom'>
                    {currentItems.map((item, itemIdx) => {
                        return (
                            <Item item={item} itemIdx={itemIdx} />
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