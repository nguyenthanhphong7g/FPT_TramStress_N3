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
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import './BarChartEmoji.css';
import { getData } from '../../../services/apiService';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const BarChartEmoji = ({ weekData, isCustomWeek, setIsCustomWeek, dailyMoods, selectedMonth }) => {
    const [timeRange, setTimeRange] = useState('week');
    const [chartData, setChartData] = useState([]);
    const [moodMap, setMoodMap] = useState([])

    useEffect(() => {
        const fetchMoods = async () => {
          try {
            const data = await getData("mood"); 
            setMoodMap(data);
          } catch (err) {
            console.error("Error fetching mood:", err);
          }
        };
    
        fetchMoods();
      }, []);

    useEffect(() => {
        if (!dailyMoods || dailyMoods.length === 0) return;
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
                if (date.isoWeek() === now.isoWeek() && date.isoWeekYear() === now.isoWeekYear()) {
                    const dayIndex = date.isoWeekday() - 1;
                    result[dayIndex].value = entry.value;
                }
            });
            return result;
        }

        if (range === 'month') {
            const startOfMonth = now.startOf('month');
            const endOfMonth = now.endOf('month');

            const weeks = [];
            let current = startOfMonth;
            while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
                const weekNumber = current.isoWeek();
                if (!weeks.includes(weekNumber)) {
                    weeks.push(weekNumber);
                }
                current = current.add(1, 'day');
            }

            const result = weeks.map(week => {
                const startOfWeek = dayjs().year(now.year()).week(week).startOf('isoWeek');
                const endOfWeek = dayjs().year(now.year()).week(week).endOf('isoWeek');

                const startDate = startOfWeek.isBefore(startOfMonth) ? startOfMonth : startOfWeek;

                let endDate = endOfWeek.isAfter(endOfMonth) ? endOfMonth : endOfWeek;
                if (endDate.isAfter(now)) {
                    endDate = now;
                }

                return {
                    name: `Tuần ${week}`,
                    sum: 0,
                    count: 0,
                    dateRange: `${startDate.format('DD/MM/YYYY')} ~ ${endDate.format('DD/MM/YYYY')}`
                };
            });

            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, 'month')) {
                    const weekNumber = date.isoWeek();
                    const index = weeks.indexOf(weekNumber);
                    if (index !== -1) {
                        result[index].sum += entry.value;
                        result[index].count += 1;
                    }
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
        const mood = moodMap.find(m => m.mood_id === payload.value);
        return mood ? (
            <image
                href={mood.image}
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
                <button className={`${timeRange === 'week' ? 'active' : ""}`} onClick={() => { setTimeRange('week'); setIsCustomWeek(false); }}>Tuần</button>
                <button className={`${timeRange === 'month' ? 'active' : ""}`} onClick={() => { setTimeRange('month'); setIsCustomWeek(false); }}>Tháng</button>
                <button className={`${timeRange === 'year' ? 'active' : ""}`} onClick={() => { setTimeRange('year'); setIsCustomWeek(false); }}>Năm</button>
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
                            const mood = moodMap.find(m => m.mood_id === entry.value);
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`url(#gradient-${mood?.mood_id || 'default'})`}
                                />
                            );
                        })}
                    </Bar>

                    <defs>
                        {moodMap.map((mood) => (
                            <linearGradient
                                key={mood.mood_id}
                                id={`gradient-${mood.mood_id}`}
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
