import Signin from "../../components/Common/FormLogin/signin"
import './FormLogin.css'

const FormSign = () => {
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
        <Signin />
      </div>
    </div>
  )
}

export default FormSign