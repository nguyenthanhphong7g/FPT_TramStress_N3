import React, { useState } from "react";
import "./../Test/Test.css";
import imgCat01 from "../../../../assets/images/Emotion_Cat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../contexts/AuthContext";

const Test = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState("");
  const [answersRecord, setAnswersRecord] = useState({});
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();

  const questions = [
    {
      id: 1,
      text: "Cảm xúc hiện tại của bạn là gì?",
      answers: [
        { icon: "😊", text: "Vui vẻ" },
        { icon: "😢", text: "Buồn" },
        { icon: "😡", text: "Tức giận" },
        { icon: "😴", text: "Mệt mỏi" },
      ],
      quote: "Cảm xúc là ngôn ngữ của tâm hồn.",
    },
    {
      id: 2,
      text: "Điều gì khiến bạn có cảm xúc này?",
      answers: [
        { icon: "👨‍👩‍👧", text: "Gia đình" },
        { icon: "💼", text: "Công việc" },
        { icon: "❤️", text: "Tình cảm" },
        { icon: "📚", text: "Học tập" },
      ],
      quote: "Mọi cảm xúc đều có nguyên nhân.",
    },
    {
      id: 3,
      text: "Bạn muốn cải thiện tâm trạng như thế nào?",
      answers: [
        { icon: "🎵", text: "Nghe nhạc" },
        { icon: "🚶", text: "Đi dạo" },
        { icon: "💬", text: "Tâm sự" },
        { icon: "🛌", text: "Nghỉ ngơi" },
      ],
      quote: "Chăm sóc bản thân là điều quan trọng.",
    },
    {
      id: 4,
      text: "Bạn muốn chia sẻ cảm xúc này với ai?",
      answers: [
        { icon: "👫", text: "Bạn bè" },
        { icon: "👨‍👩‍👧", text: "Gia đình" },
        { icon: "🧑", text: "Chuyên gia" },
        { icon: "🙅", text: "Không chia sẻ" },
      ],
      quote: "Chia sẻ là cách giảm tải cảm xúc.",
    },
    {
      id: 5,
      text: "Bạn đã sẵn sàng xem kết quả chưa?",
      answers: [
        { icon: "✅", text: "Sẵn sàng" },
        { icon: "⏳", text: "Chưa chắc" },
      ],
      quote: "Một hành trình cảm xúc sắp khép lại.",
    },
    {
      id: 6,
      text: "Tóm tắt lại lựa chọn của bạn",
      answers: [],
      quote: "Bạn đã hoàn thành kiểm tra cảm xúc!",
    },
  ];

  const currentQuestion = questions.find((q) => q.id === currentPage);

  const handleAnswer = (ans) => {
    setSelected(ans.text);
    setAnswersRecord({ ...answersRecord, [currentPage]: ans.text });
  };

  const nextPage = () => {
    if (currentQuestion.answers.length > 0 && !selected) {
      alert("👉 Vui lòng chọn một đáp án trước khi tiếp tục!");
      return;
    }
    if (currentPage < questions.length) {
      setCurrentPage(currentPage + 1);
      setSelected("");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelected("");
    }
  };

  // 👉 Hàm phân tích kết luận tâm trạng
  const getConclusion = () => {
    const q1 = answersRecord[1]; // cảm xúc hiện tại
    if (q1 === "Vui vẻ") {
      return {
        mood: "Bạn đang rất vui vẻ 🌞",
        advice: "Hãy giữ vững tinh thần tích cực này nhé!",
      };
    } else if (q1 === "Buồn") {
      return {
        mood: "Bạn đang buồn 😢",
        advice: "Hãy thử tâm sự cùng ai đó, hoặc nghe nhạc thư giãn.",
      };
    } else if (q1 === "Tức giận") {
      return {
        mood: "Bạn đang tức giận 😡",
        advice: "Hãy hít thở sâu và thử đi dạo để giải tỏa cảm xúc.",
      };
    } else if (q1 === "Mệt mỏi") {
      return {
        mood: "Bạn đang mệt mỏi 😴",
        advice: "Hãy nghỉ ngơi và chăm sóc bản thân nhiều hơn.",
      };
    }
    return {
      mood: "Chưa rõ tâm trạng",
      advice: "Hãy chia sẻ thêm để chúng tôi hiểu bạn hơn.",
    };
  };

  // Hàm lưu kết quả vào localStorage
  const saveResultToLocalStorage = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để tiếp tục!!!")
      return;
    }
    const resultData = {
      date: new Date().toLocaleString("vi-VN"), // ngày giờ lưu
      answers: answersRecord,
      conclusion: conclusion,
    };

    // Lấy dữ liệu cũ
    const savedResults = JSON.parse(
      localStorage.getItem("emotionTestResults") || "[]"
    );

    // Thêm kết quả mới
    savedResults.push(resultData);

    // Lưu lại vào localStorage
    localStorage.setItem("emotionTestResults", JSON.stringify(savedResults));

    setSaved(true);
  };

  const conclusion = getConclusion();

  return (
    <div className="emotion-container">
      {/* Thanh bước */}
      <div className="step-bar">
        {questions.map((q, i) => (
          <React.Fragment key={q.id}>
            <div
              className={`step-circle ${
                currentPage === q.id
                  ? "active"
                  : currentPage > q.id
                  ? "done"
                  : ""
              }`}
            >
              {q.id}
            </div>
            {i < questions.length - 1 && (
              <div
                className={`step-line ${currentPage > q.id ? "done" : ""}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Nội dung câu hỏi hoặc kết quả */}
      <div className="question-box">
        <p className="question-text">{currentQuestion.text}</p>

        {currentPage !== 6 ? (
          <ul className="answer-list">
            {currentQuestion.answers.map((ans, i) => (
              <li
                key={i}
                className={`answer-item ${
                  selected === ans.text ? "selected" : ""
                }`}
                onClick={() => handleAnswer(ans)}
              >
                <span className="icon">{ans.icon}</span>
                <span>{ans.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="result-box">
            <h3>Kết quả khảo sát của bạn</h3>
            <ul>
              {Object.keys(answersRecord).map((key) => (
                <li key={key}>
                  <strong>Câu {key}:</strong> {answersRecord[key]}
                </li>
              ))}
            </ul>

            {/* Kết luận */}
            <div className="conclusion-box">
              <h4>👉 Kết luận tâm trạng:</h4>
              <p>
                <strong>{conclusion.mood}</strong>
              </p>
              <p>{conclusion.advice}</p>
            </div>

            {/* Nút hành động */}
            <div className="result-actions">
              <button className="btn-save" onClick={saveResultToLocalStorage}>
                💾 Lưu lại
              </button>

              <button
                className="btn-restart"
                onClick={() => {
                  setAnswersRecord({});
                  setCurrentPage(1);
                  setSaved(false);
                }}
              >
                🔄 Làm lại
              </button>
            </div>

            {saved && (
              <p className="saved-msg">✅ Kết quả đã được lưu thành công!</p>
            )}
          </div>
        )}

        {/* Châm ngôn */}
        <p className="quote-Test">
          <span className="quote-icon">🍀</span> {currentQuestion.quote}
        </p>
      </div>

      {/* Điều hướng */}
      <div className="step-actions">
        {currentPage > 1 && currentPage < 6 && (
          <button className="btn-prev" onClick={prevPage}>
            ← Quay lại
          </button>
        )}
        {currentPage < questions.length && (
          <button
            className="btn-next"
            onClick={nextPage}
            disabled={currentQuestion.answers.length > 0 && !selected}
          >
            Tiếp tục →
          </button>
        )}
      </div>

      {/* Mèo */}
      <div className="cat-footer">
        <img src={imgCat01} alt="Mèo" className="cat-img" />
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Test;
