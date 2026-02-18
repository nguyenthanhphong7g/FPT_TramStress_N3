import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import BarChartEmoji from "../../Common/Recharts/BarChartComponent";
import { useAuth } from "../../../contexts/AuthContext";
import { getDailyMoodEntry } from "../../../services/activity/getDailyMoodEntry";
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

function BarChart() {
    const [dailyMoods, setDailyMoods] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [timeRange, setTimeRange] = useState("week");
    const { user } = useAuth();

    const groupData = (data, range, baseDate) => {
        if (!Array.isArray(data)) return [];
        const now = baseDate || dayjs();

        if (range === "week") {
            const startOfWeek = now.startOf("isoWeek");
            const result = Array(7).fill(null).map((_, i) => ({
                name: startOfWeek.add(i, "day").format("ddd"),
                value: null,
                date: startOfWeek.add(i, "day").format("DD/MM/YYYY")
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, "week")) {
                    const dayIndex = date.isoWeekday() - 1;
                    result[dayIndex].value = entry.value;
                }
            });
            return result;
        }

        if (range === "month") {
            const weeksInMonth = Math.ceil(now.daysInMonth() / 7);
            const result = Array(weeksInMonth).fill(null).map((_, i) => ({
                name: `Tuần ${i + 1}`,
                sum: 0,
                count: 0,
                dateRange: `${now.date(i * 7 + 1).format('DD/MM/YYYY')} ~ ${now.date(Math.min((i + 1) * 7, now.daysInMonth())).format('DD/MM/YYYY')}`
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, "month")) {
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

        if (range === "year") {
            const result = Array(12).fill(null).map((_, i) => ({
                name: `Th${i + 1}`,
                sum: 0,
                count: 0,
                label: dayjs().month(i).startOf('month').format('MM/YYYY')
            }));
            data.forEach(entry => {
                const date = dayjs(entry.date);
                if (date.isSame(now, "year")) {
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


    useEffect(() => {
        if (!user) return;
        const fetchMood = async () => {
            const userId = user.id;
            // const date = dayjs().format("YYYY-MM-DD")

            const moodEntry = await getDailyMoodEntry(userId);
            setDailyMoods(moodEntry)
        };

        fetchMood();
    }, []);

    useEffect(() => {
        setChartData(groupData(dailyMoods, timeRange, dayjs()));
    }, [timeRange, dailyMoods]);

    return (
        <div>
            <BarChartEmoji
                weekData={chartData}
                isCustomWeek={false}
                setIsCustomWeek={() => { }}
                dailyMoods={dailyMoods}
                selectedMonth={dayjs()}
            />
        </div>
    );
}

export default BarChart;
