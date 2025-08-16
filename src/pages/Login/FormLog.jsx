import Login from "../../components/Common/FormLogin/login"
import './FormLogin.css'

const FormLogin = () => {
  return (
    <div className="form-login-container">
      <div className="form-login-image">
        <div className="overlay">
          <p className="quote">
            “Hãy đối xử với chính mình <br />
            như cách bạn đối xử với người bạn yêu thương” <br />
            <span className="author">– Brené Brown –</span>
          </p>
        </div>
      </div>

      <div className="form-login-form">
        <h1>Trạm Stress</h1>
        <Login />
      </div>
    </div>
  )
}

export default FormLogin