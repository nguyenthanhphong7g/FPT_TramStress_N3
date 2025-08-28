import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import InputFeild from './InputFeild';
import SosialLogin from './SosialLogin';
import './login.css';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, getCurrentUser } from '../../../services/services';
import { registerAdmin } from '../../../services/services';
import { useAuth } from '../../../contexts/AuthContext';
const schema = Yup.object().shape({
    email: Yup.string()
        .required('Bạn chưa nhập email')
        .email('Email không hợp lệ'),
    password: Yup.string()
        .required('Bạn chưa nhập mật khẩu')
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    // useEffect(() => {
    //     const Admin = {
    //         email: "Admin@tramstress.com",
    //         password: "12345678",
    //         role: "admin",
    //     };
    //     (async () => {
    //         await registerAdmin(Admin);
    //     })();
    // }, []);
    const onSubmit = async (data) => {
        const result = await loginUser(data.email, data.password);
        if (result.success) {
            login(getCurrentUser());
            getCurrentUser().role === "admin" ? navigate("/adminlayout/home") :
                navigate("/userlayout/home");
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const handleRegisterClick = () => {
        navigate('/signin');
    };
    const handleGuest = () => {
        navigate('userlayout/home')
    }
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
                <a href="#" className='left' onClick={handleGuest}>Tiếp tục với vai trò khách</a>
                <a href="#" className='right' onClick={handleRegisterClick}>Đăng ký hành trình ngay</a>
            </div>
            {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Login;
