import react from "react";
import BarChart from "../Recharts/BarChart";
import "./HomeMain.css";
import Test from "./../Emotion/Test/Test";
import Cat from "../../../assets/images/Home/Home_Emotion_Cat.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Relax/Main/NoiDungThuGian.css'
import GocThuGian from '../Relax/Main/GocThuGian'
import icon_search from '../../../assets/images/Relax/icon_search.png'
import Item from "../Relax/Main/Item";
import popularContent from '../../../data/contentRelax/popularContent'

const HomeMain = () => {
  const navigate = useNavigate();
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
        <div className='noidung-top'>
          <h4>Nội dung thư giãn hôm nay!!!</h4>
          <Link
            to={'/userlayout/relax'}
            className='noidung-top-right'
          >
            <h5>Xem tất cả</h5>
            <img src={icon_search} alt="" />
          </Link>
        </div>
        <div className='noidung-bottom'>
          {popularContent.slice(0, 4).map((item, itemIdx) => (
            <Item item={item} itemIdx={itemIdx} />
          ))}
        </div>
      </div>
      <div className="home-action"></div>
    </div>
  );
};

export default HomeMain;
