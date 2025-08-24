import InputFeild from './InputFeild';
import './ForgotPasswordModal.css';
import ForgotPassImg from '../../../assets/images/ForgotPass.png';
import {useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPasswordSchema, } from '../Schema/Schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });

    const handleChangePassword = (data) => {
    if (!data.password || !data.confirmPassword) {
        toast.error('Bạn cần nhập đầy đủ mật khẩu!');
        return;
    }
    if (data.password !== data.confirmPassword) {
        toast.error('Mật khẩu mới và xác nhận không khớp!');
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map(u =>
        u.email === email ? { ...u, password: data.password } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success('Mật khẩu đã được cập nhật thành công!');
    onClose();
};


    const sendCode = () => {
        const emailValue = getValues("email"); 
        if (!emailValue) {
            setError('Bạn cần nhập email để nhận mã xác nhận!');
            return;
        }
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find(user => user.email === emailValue);

    if (!currentUser) {
        setError('Email chưa được đăng ký!');
        return;
    }
        setEmail(emailValue);
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('verifyCode', randomCode);
        setStep(2);
    }
    const verifyCode = () => {
        const savedCode = localStorage.getItem('verifyCode');
        if (code === savedCode) {
            toast.success('Mã xác nhận hợp lệ! Bạn có thể đặt lại mật khẩu mới.');
            setStep(3);
        } else {
            toast.error('Mã xác nhận không đúng! Vui lòng thử lại.');
        }
        
    }
    return (
        <div className="modal-overlay">
            {step === 1 && (
                <div className="modal-content">
                    <div className='Head'>
                        <button className="close-button" onClick={onClose}>×</button>
                        <img src={ForgotPassImg} alt="Meo icon" className="cat-icon" />
                        <h2>Bạn cần lấy lại mật khẩu ư?</h2>
                    </div>
                    <p>Đừng lo, Meo sẽ giúp bạn nhé! Nhập email bên dưới, Meo sẽ gửi mã xác nhận để bạn tạo mật khẩu mới nè!</p>

                    <InputFeild
                        header="Nhập email của bạn ở đây!!!"
                        type="email"
                        placeholder="Điền ở đây nhé!"
                        icon="mail"
                        {...register("email")}
                        error={error}
                    />
                    <div className="modal-buttons">
                        <button className="modal-back" onClick={onClose}>← Trở lại</button>
                        <button type="submit" className="modal-submit" onClick={sendCode}>Tiếp tục</button>
                    </div>

                </div>
            )}
            {step === 2 && (
                <div className="modal-content">
                    <div className='Head'>
                        <button className="close-button" onClick={onClose}>×</button>
                        <img src={ForgotPassImg} alt="Meo icon" className="cat-icon" />
                        <h2>Xác thực nhẹ nhàng nhé</h2>
                    </div>
                    <p>Meo vừa gửi mã xác nhận đến email *** @gmail.com.
                        Bạn hãy nhập mã gồm 6 số để tiếp tục nha.</p>

                    <div className="otp-inputs">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength="1"
                                className="otp-box"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    if (/^[0-9]$/.test(val)) {
                                        const newCode = code.split('');
                                        newCode[i] = val;
                                        const joined = newCode.join('');
                                        setCode(joined);
                                        if (e.target.nextSibling) {
                                            e.target.nextSibling.focus();
                                        }
                                    } else {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="modal-buttons">
                        <span>⏳ Đôi khi có thể mất vài giây để nhận mã.  Không thấy mã? 👉 <a onClick={sendCode}>Gửi lại mã mới.</a></span>
                        <button type="submit" className="modal-submit" onClick={verifyCode}>Xác nhận ngay</button>
                    </div>

                </div>
            )}
            {step === 3 && (
                <div className="modal-content">
                    <div className='Head'>
                        <button className="close-button" onClick={onClose}>×</button>
                        <img src={ForgotPassImg} alt="Meo icon" className="cat-icon" />
                        <h2>Đặt lại mật khẩu mới nào!!!</h2>
                    </div>
                    <form className="tab-content-pass" onSubmit={handleSubmit(handleChangePassword)} noValidate>
                        <p>Meo đã xác nhận mã của bạn rồi! Giờ hãy đặt mật khẩu mới nhé!</p>

                        <InputFeild
                            header="Nhập mật khẩu mới của bạn ở đây!!!"
                            type="password"
                            placeholder="Mật khẩu mới..."
                            icon="lock"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <InputFeild
                            header="Xác nhận mật khẩu mới của bạn ở đây!!!"
                            type="password"
                            placeholder="Xác nhận mật khẩu..."
                            icon="lock"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        />

                        <div className="modal-buttons">
                            <button className="modal-back" onClick={() => setStep(2)}>← Trở lại</button>
                            <button type="submit" className="modal-submit">Xác nhận ngay</button>
                        </div>
                    </form>



                </div>
            )}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default ForgotPasswordModal;
