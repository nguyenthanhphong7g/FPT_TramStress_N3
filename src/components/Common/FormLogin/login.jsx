import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import InputFeild from './InputFeild';
import SosialLogin from './SosialLogin';
import './login.css';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useState } from 'react';
const schema = Yup.object().shape({
    email: Yup.string()
        .required('Bạn chưa nhập email')
        .email('Email không hợp lệ'),
    password: Yup.string()
        .required('Bạn chưa nhập mật khẩu')
});

const Login = () => {
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = storedUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (matchedUser) {
  localStorage.setItem("currentUser", JSON.stringify(matchedUser)); 
  navigate("/userlayout/home");
} else {
  alert("Email hoặc mật khẩu không đúng!");
}
  };



    const handleRegisterClick = () => {
        navigate('/signin');
    };
    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Hôm nay bạn thế nào !!!</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputFeild
                    header="Nhập email của bạn ở đây!!!"
                    type="email"
                    placeholder="Nhập email..."
                    icon="mail"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <InputFeild
                    header="Nhập 'mật mã riêng' của bạn!!! "
                    type="password"
                    placeholder="Nhập mật khẩu ở đây"
                    icon="lock"
                    {...register("password")}
                    error={errors.password?.message}
                />

                <a onClick={handleForgotPasswordClick} className="forgot-pass-link">
                    Bạn cần lấy lại mật khẩu ư?
                </a>
                <button type="submit" className="login-button">Bắt đầu hành trình của bạn</button>
            </form>

            <p className="separator"><span>hoặc tiếp tục với</span></p>
            <SosialLogin />
            <p className="separator"></p>
            <p className="signup-text">Lần đầu ghé Trạm?</p>
            <div className='footer'>
                <a href="#" className='left'>Tiếp tục với vai trò khách</a>
                <a href="#" className='right' onClick={handleRegisterClick}>Đăng ký hành trình ngay</a>
            </div>
            {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />}
        </div>
    );
};

export default Login;
