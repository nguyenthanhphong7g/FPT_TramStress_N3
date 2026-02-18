import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./DayData.css";
import { getData } from "../../../../services/apiService";



function DayData({ date, onClose, dailyMoods }) {
    const [hashtag, setHashtag] = useState([])
    useEffect(() => {
        const fetchMoods = async () => {
          try {
            const data = await getData("hashtag"); 
            setHashtag(data);
          } catch (err) {
            console.error("Error fetching mood:", err);
          }
        };
    
        fetchMoods();
      }, []);
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
                        {entry.hashtags.map((tag, i) => {
                            const matched = hashtag.find((h) => h.name === tag);
                            return (
                                <span
                                    key={i}
                                    style={{ background: matched ? matched.color : "#ccc" }}
                                >
                                    {tag}
                                </span>
                            );
                        })}
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
