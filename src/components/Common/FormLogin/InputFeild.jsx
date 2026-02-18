import { useState, forwardRef } from "react";
import './InputFeild.css';

const InputFeild = forwardRef(
  ({ header, type, placeholder, icon, error, options, ...rest }, ref) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
      <div className="input-group">
        {header && <label className="input-header">{header}</label>}

        {type === "select" ? (
          <div className="input-wrapper">
            <select
              className={`input-feild ${error ? "input-error" : ""}`}
              value={rest.value || ""}  
              onChange={rest.onChange}
              name={rest.name}
            >
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {icon && <i className="material-symbols-rounded input-icon">{icon}</i>}
          </div>
        ) : (
          <div className={`input-wrapper ${error ? "input-wrapper-error" : ""}`}>
            <input
              type={isPasswordShown && type === "password" ? "text" : type}
              placeholder={placeholder}
              className={`input-feild ${error ? "input-error" : ""}`}
              ref={ref}
              {...rest}
            />

            {icon && <i className="material-symbols-rounded input-icon">{icon}</i>}

            {type === "password" && (
              <i
                onClick={() => setIsPasswordShown((prev) => !prev)}
                className="material-symbols-rounded eye-icon"
                style={{ cursor: "pointer" }}
              >
                {isPasswordShown ? "visibility" : "visibility_off"}
              </i>
            )}
          </div>
        )}

        {error && <p className="input-error-message">{error}</p>}
      </div>
    );
  }
);

export default InputFeild;
