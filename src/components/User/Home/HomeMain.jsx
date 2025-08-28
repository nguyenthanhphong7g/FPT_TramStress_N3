import react, { useEffect, useState } from "react";
import BarChart from "../Recharts/BarChart";
import "./HomeMain.css";
import Cat from "../../../assets/images/Home/Home_Emotion_Cat.png";
import { Link, useNavigate } from "react-router-dom";
import SectionBlock from "../Relax/Main/SectionBlock";
import { getRelaxContent } from "../../../services/activity/getRelaxContent";
import icon_search from '../../../assets/images/Relax/icon_search.png'
import Item from "../Relax/Main/Item";
const HomeMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelaxContent = async () => {
      try {
        const json = await getRelaxContent();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRelaxContent();
  }, []);
  return (
    <div className="home-container">
      <div className="home-emotion">
        <div className="main">
          <div className="text">
            <h2>Tín hiệu từ trái tim</h2>
            <span>
              Cảm xúc tuần này của bạn có nhiều biến động. Hãy thử bài test nhỏ
              này để lắng nghe cảm xúc nhé!
            </span>
            <button
              onClick={() => navigate("/userlayout/home/test")}
              className="save-btn"
            >
              Làm bài test ngay
            </button>
          </div>
          <img src={Cat} alt="Angry Emoji" />
        </div>
        <div className="bar">
          <BarChart />
        </div>
      </div>

      <div className='home-relax'>
        <div className="noidung">
          <div className="noidung-top">
            <h4>Nội dung thư giãn hôm nay!!!</h4>
            <Link to={`/userlayout/relax`} className="noidung-top-right">
              <h5>Xem tất cả</h5>
              <img src={icon_search} alt="" />
            </Link>
          </div>
          <div className='noidung-bottom'>
            {data.slice(0, 4).map((item, itemIdx) => (
              <Item key={item.id} item={item} itemIdx={itemIdx} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-action"></div>
    </div>
  );
};

export default HomeMain;