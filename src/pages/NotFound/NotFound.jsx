import NotFound404 from "../../assets/images/NotFound404.png";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound-container">
      <img src={NotFound404} alt="Not Found" />
      <div className="NotFound-text">
        <h1>404</h1>
        <h2>not found</h2>
      </div>
    </div>
  );
};

export default NotFound;
