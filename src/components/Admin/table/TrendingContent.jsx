import React, { useState } from 'react'
import TatCa from '../../Common/Button/Admin/TatCa';
import BaiTap from '../../Common/Button/Admin/BaiTap';
import GiaiDieu from '../../Common/Button/Admin/GiaiDieu';
import LoiHay from '../../Common/Button/Admin/LoiHay';
import Pagination from '../../Common/Pagination/Admin/Pagination';
import popularContent from '../../../data/contentRelax/popularContent'
import dataExercise from '../../../data/contentRelax/dataExercise'
import dataMusic from '../../../data/contentRelax/dataMusic'
import dataQuote from '../../../data/contentRelax/dataQuote'

const TrendingContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pagesize = 5;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const [selected, setSelected] = useState('tatca');
    const getFilteredContent = () => {
        switch (selected) {
            case 'baitap':
                return dataExercise;
            case 'giaidieu':
                return dataMusic;
            case 'loihay':
                return dataQuote;
            default:
                return popularContent;
        }
    };

    const filteredContent = getFilteredContent();
    const totalPages = Math.ceil(filteredContent.length / pagesize);
    const startIdx = (currentPage - 1) * pagesize;
    const endIdx = startIdx + pagesize;
    const currentContent = filteredContent.slice(startIdx, endIdx);

    return (
        <div className="trending-content">
            <div className="trending-content-header">
                <h5>Nội dung thịnh hành</h5>
                <div className="filter-bar">
                    <TatCa isActive={selected === 'tatca'} onClick={() => { setSelected('tatca'); setCurrentPage(1); }} />
                    <BaiTap isActive={selected === 'baitap'} onClick={() => { setSelected('baitap'); setCurrentPage(1); }} />
                    <GiaiDieu isActive={selected === 'giaidieu'} onClick={() => { setSelected('giaidieu'); setCurrentPage(1); }} />
                    <LoiHay isActive={selected === 'loihay'} onClick={() => { setSelected('loihay'); setCurrentPage(1); }} />
                </div>
            </div>
            <div className="admin-user-table"
                style={{ minHeight: `${pagesize * 60 + 125}px` }}
            >
                <div className="table-wrapper">
                    <table>
                        <colgroup>
                            <col style={{ width: '167px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '150px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Nội dung</th>
                                <th>Cảm xúc</th>
                                <th>Loại hình</th>
                                <th>Thời lượng</th>
                                <th>Tương tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentContent.map(content => (
                                <tr key={content.id}>
                                    <td>{content.title}</td>
                                    <td>{content.emotion_number}</td>
                                    <td>{content.type}</td>
                                    <td>{content.duration}</td>
                                    <td>{content.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="footer-admin">
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        start={startIdx}
                        end={endIdx}
                        total={filteredContent.length}
                    />
                </div>
            </div>
        </div>

    )
}

export default TrendingContent
