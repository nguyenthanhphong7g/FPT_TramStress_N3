import Signin from "../../components/Common/FormLogin/signin"
import './FormLogin.css'
import Logo from "../../assets/images/Logo.png"

const FormSign = () => {
  return (
    <div className="form-login-container">
      <div className="form-login-image">
        <div className="overlay">
          <p className="login-quote">
            “Hãy đối xử với chính mình <br />
            như cách bạn đối xử với người bạn yêu thương” <br />
            <span className="login-author">– Brené Brown –</span>
          </p>
        </div>
      </div>

      <div className="form-login-form">
        <div className="form-login-header">
          <img src={Logo} alt="logo" className="logo"/>
          <h1>Trạm Stress</h1>
        </div>
        <Signin />
      </div>
    </div>
  )
}

export default FormSign