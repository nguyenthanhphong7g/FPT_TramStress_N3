import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import InputFeild from './InputFeild';
import SosialLogin from './SosialLogin';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { signinSchema } from '../Schema/Schema';


const Signin = () => {
    const navigate = useNavigate();


const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: yupResolver(signinSchema)
});


    const onSubmit = (data) => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = storedUsers.some((user) => user.email === data.email);

        if (emailExists) {
            alert("Email đã được đăng ký trước đó. Vui lòng dùng email khác!");
            return;
        }
        storedUsers.push(data);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        alert("Đăng ký thành công!");
        navigate("/", { state: data });
    };

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
                <a href="#" className='left'>Tiếp tục với vai trò khách</a>
                <a href="#" className='right' onClick={handleLoginClick}>Vậy thì bắt đầu thôi </a>
            </div>
        </div>
    );
};

export default Signin;
