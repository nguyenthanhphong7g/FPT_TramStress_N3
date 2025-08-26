import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import InputFeild from './InputFeild';
import SosialLogin from './SosialLogin';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { signinSchema } from '../Schema/Schema';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from '../../../services/services';

const Signin = () => {
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(signinSchema)
    });


    const onSubmit = async (data) => {
        const result = await registerUser({ ...data, role: 'user' });
        if (!result.success) {
            console.log(result.message)
            toast.error(result.message);
        } else {
            toast.success(result.message);
            handleLoginClick();
        };
    };

    const handleGuest =() => {
        navigate('userlayout/home')
    }
    const handleLoginClick = () => {
        navigate('/');
    }

    return (
        <div className="login-container">
            <h2 className="form-title">Đăng ký hành trình của bạn !!!</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputFeild
                    header="Nhập email của bạn ở đây!!!"
                    type="email"
                    placeholder="Nhập email ..."
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

                <button type="submit" className="login-button">Bắt đầu hành trình của bạn</button>
            </form>

            <p className="separator"><span>hoặc tiếp tục với</span></p>
            <SosialLogin />
            <p className="separator"></p>
            <p className="signup-text">Bạn đã có tài khoản ư?</p>
            <div className='footer'>
                <a href="#" className='left' onClick={handleGuest}>Tiếp tục với vai trò khách</a>
                <a href="#" className='right' onClick={handleLoginClick}>Vậy thì bắt đầu thôi </a>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Signin;
