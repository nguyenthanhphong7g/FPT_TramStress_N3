import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import BarChartEmoji from "../../Common/Recharts/BarChartComponent";
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

function BarChart() {
    const [dailyMoods, setDailyMoods] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [timeRange, setTimeRange] = useState("week");

    // Hàm xử lý dữ liệu
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

    // Lấy dữ liệu từ localStorage hoặc tạo dữ liệu demo
    useEffect(() => {
        let storedData = localStorage.getItem("dailyMoods");
        if (!storedData) {
            const today = dayjs();
            const demoData = [];
            for (let i = 0; i < 365; i++) {
                demoData.push({
                    date: today.subtract(i, "day").format("YYYY-MM-DD"),
                    value: Math.floor(Math.random() * 5) + 1
                });
            }
            localStorage.setItem("dailyMoods", JSON.stringify(demoData));
            storedData = JSON.stringify(demoData);
        }

        const parsedData = JSON.parse(storedData);
        setDailyMoods(parsedData);
        setChartData(groupData(parsedData, timeRange, dayjs()));
    }, []);

    // Cập nhật dữ liệu khi đổi chế độ xem
    useEffect(() => {
        setChartData(groupData(dailyMoods, timeRange, dayjs()));
    }, [timeRange, dailyMoods]);

    return (
        <div>
            <BarChartEmoji
                weekData={chartData}
                isCustomWeek={false}
                setIsCustomWeek={() => {}}
                dailyMoods={dailyMoods}
                selectedMonth={dayjs()}
            />
        </div>
    );
}

export default BarChart;
