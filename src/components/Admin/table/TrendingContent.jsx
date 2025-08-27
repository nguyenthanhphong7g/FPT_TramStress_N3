import React, { useState, useEffect } from 'react';
import TatCa from '../../Common/Button/Admin/TatCa';
import BaiTap from '../../Common/Button/Admin/BaiTap';
import GiaiDieu from '../../Common/Button/Admin/GiaiDieu';
import LoiHay from '../../Common/Button/Admin/LoiHay';
import Pagination from '../../Common/Pagination/Admin/Pagination';
import { getRelaxContent } from '../../../services/activity/getRelaxContent';

const TrendingContent = () => {
    const [allData, setAllData] = useState([]);
    const [selected, setSelected] = useState('tatca');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pagesize = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRelaxContent();
                setAllData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getFilteredContent = () => {
        switch (selected) {
            case 'baitap':
                return allData.filter(item => item.slug === 'exercise');
            case 'giaidieu':
                return allData.filter(item => item.slug === 'music');
            case 'loihay':
                return allData.filter(item => item.slug === 'quote');
            default:
                return allData;
        }
    };

    const filteredContent = getFilteredContent();
    const totalPages = Math.ceil(filteredContent.length / pagesize);
    const startIdx = (currentPage - 1) * pagesize;
    const endIdx = startIdx + pagesize;
    const currentContent = filteredContent.slice(startIdx, endIdx);

    const handlePageChange = (page) => setCurrentPage(page);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error}</p>;

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
            <div className="admin-user-table" style={{ minHeight: `${pagesize * 60 + 125}px` }}>
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
    );
};

export default TrendingContent;
