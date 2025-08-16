import InputFeild from './InputFeild';
import './ForgotPasswordModal.css';
import ForgotPassImg from '../../../assets/images/ForgotPass.png';


const ForgotPasswordModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
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
                />
                <div className="modal-buttons">
                    <button className="modal-back" onClick={onClose}>← Trở lại</button>
                    <button type="submit" className="modal-submit">Tiếp tục</button>
                </div>

            </div>
        </div>
    );
};

export default ForgotPasswordModal;
