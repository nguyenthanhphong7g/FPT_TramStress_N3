import BarChart from "../Recharts/BarChart";
import './HomeMain.css'
import Cat from '../../../assets/images/Home/Home_Emotion_Cat.png';
const HomeMain = () => {
    return (
        <div className="home-container">
            <div className="home-emotion">
                <div className="main">
                    <div className="text">
                    <h2>Tín hiệu từ trái tim</h2>
                    <span>Cảm xúc tuần này của bạn có nhiều biến động.  Hãy thử bài test nhỏ này để lắng nghe cảm xúc nhé!</span>
                    <button className="save-btn">
                        Làm bài test ngay
                    </button>
                </div>
                <img src={Cat} alt="Angry Emoji" />
                </div>
                <div className="bar">
                    <BarChart />
                </div>
            </div>
            
            <div>

            </div>
            <div className="home-action">

            </div>
        </div>
    )
}

export default HomeMain;