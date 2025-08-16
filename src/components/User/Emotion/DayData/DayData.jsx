import React from "react";
import dayjs from "dayjs";
import "./DayData.css";

const hashtagColors = {
    "#MệtMỏi": "#002241",
    "#LoLắng": "#38aadc",
    "#CăngThẳng": "#a14747",
    "#Buồn": "#5c6bc0",
    "#HàoHứng": "#cc4f35",
    "#ThưGiãn": "#81c784",
    "#VuiVẻ": "#dbc255",
    "#BìnhYên": "#f48fb1",
};

function DayData({ date, onClose, dailyMoods }) {
    const entry = dailyMoods.find((m) => dayjs(m.date).isSame(date, "day"));

    return (
        <div className="modal-overlay">
            <div className="content">
                <div className="header">
                    <button className="close-button" onClick={onClose}>×</button>
                    <p>{dayjs(date).format("D/M/YYYY")}</p>
                </div>

                {entry?.hashtags?.length > 0 && (
                    <div className="hashtag-list">
                        {entry.hashtags.map((tag, i) => (
                            <span
                                key={i}
                                style={{ background: hashtagColors[tag] || "#ccc" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="modal-note">
                    {entry?.note || "Hôm nay bạn chưa viết gì cả."}
                </div>
            </div>

        </div>
    );
}

export default DayData;
