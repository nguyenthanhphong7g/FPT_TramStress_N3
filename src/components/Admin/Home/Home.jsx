import React, { useEffect, useState } from 'react'
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
    const totalConsultAvg = Math.round(
        data.reduce((sum, data) => sum + data.totalConsults, 0) / data.length
    );
    const frequencyAvg = Math.round(
        data.reduce((sum, data) => sum + data.frequency, 0) /data.length
    );
    const totalInteractionAvg = Math.round(
        data.reduce((sum, data) => sum + data.totalInteractions, 0) / data.length
    );
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
    )
}

export default Home
