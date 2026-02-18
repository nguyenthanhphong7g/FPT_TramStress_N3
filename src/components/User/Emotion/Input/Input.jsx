import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Input.css";
import Cat from '../../../../assets/images/Emotion_Cat.png';
import { useAuth } from "../../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveMoodFlow } from "../../../../services/activity/moodFlowService";
import { getData } from "../../../../services/apiService";


function Input() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const { user } = useAuth();
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
  const firstRow = hashtag.slice(0, 4);
  const secondRow = hashtag.slice(4, 8);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
  const saveMood = async () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để tiếp tục!!!");
      return;
    }

    if (!selectedTags.length) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    const avgValue = (() => {
      if (!selectedTags.length) return 1;

      const avgOriginal =
        selectedTags.reduce((sum, tag) => sum + tag.hashtag_id, 0) / selectedTags.length;

      const scaled = 1 + (avgOriginal - 1) * (4 / 7);

      return Math.min(5, Math.max(1, Math.round(scaled)));
    })();
    try {
      await saveMoodFlow({
        currentUser: user,
        moodData: {
          content: note.trim(),
          mood_id: avgValue,
        },
        hashtagIds: selectedTags.map((tag) => tag.hashtag_id),
      });
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      // toast.error("Đã có lỗi xảy ra khi lưu dữ liệu!");
      console.error(err);
    }
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
              key={tag.hashtag_id}
              className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="tag-row">
          {secondRow.map((tag) => (
            <button
              key={tag.hashtag_id}
              className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Input;
