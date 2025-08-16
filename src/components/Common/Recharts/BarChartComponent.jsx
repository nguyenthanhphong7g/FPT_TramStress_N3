import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import happyImg from '../../../assets/images/Emoji/XanhLa.png';
import smileImg from '../../../assets/images/Emoji/XanhNhat.png';
import neutralImg from '../../../assets/images/Emoji/Vang.png';
import sadImg from '../../../assets/images/Emoji/Cam.png';
import angryImg from '../../../assets/images/Emoji/Do.png';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import './BarChartEmoji.css';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const moodMap = [
    { value: 5, img: happyImg, color: '#4AAF57' },
    { value: 4, img: smileImg, color: '#8CC255' },
    { value: 3, img: neutralImg, color: '#FFC12D' },
    { value: 2, img: sadImg, color: '#FF981E' },
    { value: 1, img: angryImg, color: '#F54334' },
];

const BarChartEmoji = ({ weekData, isCustomWeek, setIsCustomWeek, dailyMoods, selectedMonth }) => {
    const [timeRange, setTimeRange] = useState('week');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (isCustomWeek && weekData && weekData.length > 0) {
            setChartData(weekData);
        } else {
            setChartData(groupData(dailyMoods, timeRange, selectedMonth));
        }
    }, [timeRange, weekData, isCustomWeek, dailyMoods, selectedMonth]);

    const groupData = (data, range, baseDate) => {
        const now = baseDate || dayjs();

        if (range === 'week') {
            const startOfWeek = now.startOf('isoWeek');
            const result = Array(7).fill(null).map((_, i) => ({
                name: startOfWeek.add(i, 'day').format('ddd'),
                value: null,
                date: startOfWeek.add(i, 'day').format('DD/MM/YYYY')
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, 'week')) {
                    const dayIndex = date.isoWeekday() - 1;
                    result[dayIndex].value = entry.value;
                }
            });
            return result;
        }

        if (range === 'month') {
            const weeksInMonth = Math.ceil(now.daysInMonth() / 7);
            const result = Array(weeksInMonth).fill(null).map((_, i) => ({
                name: `Tuần ${i + 1}`,
                sum: 0,
                count: 0,
                dateRange: `${now.date(i * 7 + 1).format('DD/MM/YYYY')} ~ ${now.date(Math.min((i + 1) * 7, now.daysInMonth())).format('DD/MM/YYYY')}`
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, 'month')) {
                    const weekIndex = Math.floor((date.date() - 1) / 7);
                    result[weekIndex].sum += entry.value;
                    result[weekIndex].count += 1;
                }
            });
            return result.map(r => ({
                name: r.name,
                value: r.count ? Math.round(r.sum / r.count) : null,
                label: r.dateRange
            }));
        }


        if (range === 'year') {
            const result = Array(12).fill(null).map((_, i) => ({
                name: `Th${i + 1}`,
                sum: 0,
                count: 0,
                label: dayjs().month(i).startOf('month').format('MM/YYYY')
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, 'year')) {
                    const monthIndex = date.month();
                    result[monthIndex].sum += entry.value;
                    result[monthIndex].count += 1;
                }
            });
            return result.map(r => ({
                name: r.name,
                value: r.count ? Math.round(r.sum / r.count) : null,
                label: r.label
            }));
        }


        return [];
    };

    const renderCustomYAxis = ({ x, y, payload }) => {
        const mood = moodMap.find(m => m.value === payload.value);
        return mood ? (
            <image
                href={mood.img}
                x={x - 38}
                y={y - 32}
                height={40}
                width={40}
                preserveAspectRatio="xMidYMid meet"
            />
        ) : null;
    };

    return (
        <div className="barchart-container">
            <div className="barchart-buttons">
                <button onClick={() => { setTimeRange('week'); setIsCustomWeek(false); }}>Tuần</button>
                <button onClick={() => { setTimeRange('month'); setIsCustomWeek(false); }}>Tháng</button>
                <button onClick={() => { setTimeRange('year'); setIsCustomWeek(false); }}>Năm</button>
            </div>

            <ResponsiveContainer className="my-barchart-container" width="100%" height="85%" >
                <BarChart data={chartData} margin={{ top: 35, bottom: 10 }} >
                    <XAxis dataKey="name" />
                    <YAxis
                        type="number"
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={renderCustomYAxis}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length > 0) {
                                return (
                                    <div className="custom-tooltip">
                                        {payload[0].payload.label || payload[0].payload.date}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    <Bar dataKey="value" radius={[50, 50, 0, 0]} minPointSize={10} 
                    >
                        {chartData.map((entry, index) => {
                            const mood = moodMap.find(m => m.value === entry.value);
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`url(#gradient-${mood?.value || 'default'})`}
                                />
                            );
                        })}
                    </Bar>

                    <defs>
                        {moodMap.map((mood) => (
                            <linearGradient
                                key={mood.value}
                                id={`gradient-${mood.value}`}
                                x1="0" y1="0" x2="0" y2="1"
                            >
                                <stop offset="30%" stopColor={mood.color} stopOpacity={0.9} />
                                <stop offset="70%" stopColor="#F54334" stopOpacity={0.5} />
                            </linearGradient>
                        ))}
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartEmoji;
