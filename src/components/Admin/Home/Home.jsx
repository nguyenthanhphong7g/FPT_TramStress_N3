import './Home.css'
import TotalConsults from '../User/OverviewStatItems/TotalConsults'
import Frequency from '../User/OverviewStatItems/Frequency'
import TotalInteractions from '../User/OverviewStatItems/TotalInteractions'
import AverageRating from '../User/OverviewStatItems/AverageRating'
import EmotionTest from './EmotionTest'
import TrendingContent from '../table/TrendingContent'
import AppointmentTable from '../table/AppointmentTable'
import WorkArea from '../ConsultingSchedule/WorkArea'
import TableExpert from '../table/TableExpert'
import { getData } from '../../../services/apiService'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelaxContent = async () => {
            try {
                const json = await getData('users');
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRelaxContent();
    }, []);

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    const totalConsultAvg = data.length > 0
        ? Math.round(data.reduce((sum, item) => sum + (item.totalConsults || 0), 0) / data.length)
        : 0;
    const frequencyAvg = data.length > 0
        ? Math.round(data.reduce((sum, item) => sum + (item.frequency || 0), 0) / data.length)
        : 0;
    const totalInteractionAvg = data.length > 0
        ? Math.round(data.reduce((sum, item) => sum + (item.totalInteractions || 0), 0) / data.length)
        : 0;

    return (
        <div className='admin-home'>
            <div className="admin-home-title">
                <h5>Trang chủ</h5>
            </div>
            <div className="stat-row">
                <TotalConsults totalConsult={totalConsultAvg} />
                <AverageRating />
                <TotalInteractions totalInteraction={totalInteractionAvg} />
                <Frequency frequency={frequencyAvg} />
            </div>
            <div className="admin-section-row">
                <EmotionTest />
                <div className="trending-content-table">
                    <TrendingContent />
                </div>
            </div>
            <div className="admin-section-row">
                <AppointmentTable />
                <WorkArea />
            </div>
            <div className="featured-experts-table">
                <div className="title">
                    <h5>Chuyên gia nổi bật</h5>
                </div>
                <TableExpert />
            </div>
        </div>
    );
};
export default Home;