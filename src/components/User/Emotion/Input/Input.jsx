import React, { useState } from "react";
import dayjs from "dayjs";
import "./Input.css";
import Cat from '../../../../assets/images/Emotion_Cat.png';

const hashtags = [
  { text: "#MệtMỏi", value: 1, color: "#002241" },
  { text: "#LoLắng", value: 2, color: "#38aadc" },
  { text: "#CăngThẳng", value: 3, color: "#a14747" },
  { text: "#Buồn", value: 4, color: "#5c6bc0" },
  { text: "#HàoHứng", value: 5, color: "#cc4f35" },
  { text: "#ThưGiãn", value: 6, color: "#81c784" },
  { text: "#VuiVẻ", value: 7, color: "#dbc255" },
  { text: "#BìnhYên", value: 8, color: "#f48fb1" },
];
const firstRow = hashtags.slice(0, 4);
const secondRow = hashtags.slice(4, 8);

function Input() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const saveMood = () => {
    if (!selectedTags.length) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // ẩn tooltip sau 2s
      return;
    }

    const avgValue = (() => {
      if (!selectedTags.length) return 1;

      const avgOriginal =
        selectedTags.reduce((sum, tag) => sum + tag.value, 0) /
        selectedTags.length;

      const scaled = 1 + (avgOriginal - 1) * (4 / 7);

      return Math.min(5, Math.max(1, Math.round(scaled)));
    })();

    const newEntry = {
      date: dayjs().format("YYYY-MM-DD"),
      value: avgValue,
      note: note.trim(),
      hashtags: selectedTags.map((tag) => tag.text),
    };

    const existing = JSON.parse(localStorage.getItem("dailyMoods") || "[]");
    const updated = [
      ...existing.filter((e) => e.date !== newEntry.date),
      newEntry,
    ];
    localStorage.setItem("dailyMoods", JSON.stringify(updated));

    window.location.reload();
  };

  return (
    <div className="mood-container">
      <div className="left-box">
        <textarea
          className="note-input"
          placeholder="Hôm nay bạn cảm thấy ..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="save-btn-wrapper">
          <button
            className="save-btn"
            onClick={saveMood}
            onMouseLeave={() => setShowTooltip(false)}
          >
            Ok rồi!!!
          </button>
          {showTooltip && (
            <div className="character-tooltip">
              <img src={Cat} alt="Mèo" className="character-img" />
              <div className="speech-bubble">
                Bạn quên chọn hashtag rồi!
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="tag-grid">
        <div className="tag-row">
          {firstRow.map((tag) => (
            <button
              key={tag.text}
              className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </button>
          ))}
        </div>
        <div className="tag-row">
          {secondRow.map((tag) => (
            <button
              key={tag.text}
              className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Input;
