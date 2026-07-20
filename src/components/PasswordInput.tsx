import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import type { PasswordInputProps } from "../types/password";

function PasswordInput({
  label,
  name,
  value,
  error,
  strength,
  required,
  onChange,
  onKeyDown,
  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  
  return (
    <div className="form-group">
      <div className="password-container">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          className={error ? "input error-input" : "input"}
          name={name}
          placeholder=" "
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "v") {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }

            onKeyDown?.(e);
          }}
        />

        <label htmlFor={name}>
          {label}

          {required && <span className="required">*</span>}
        </label>

        <div className="password-actions">
          {value.trim() !== "" && strength && (
            <span
              className={`strength ${
                strength === "Strong" || strength === "Matched"
                  ? "success"
                  : strength === "Medium"
                    ? "warning"
                    : "danger"
              }`}
            >
              {strength}
            </span>
          )}

          <button
            type="button"
            className="eye-btn"
            title={
              showPassword
                ? "Hide password (Ctrl + V)"
                : "Show password (Ctrl + V)"
            }
            tabIndex={-1} /* eye button focus remove or skipped */
            onMouseDown={(e) => e.preventDefault() } /* eye button focus remove or skipped */
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PasswordInput;

/* OLD CODE

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import type { PasswordInputProps } from "../types/password";

function PasswordInput({
    label,
    name,
    placeholder,
    value,
    error,
    strength,
    required,   
    onChange,
    onKeyDown,
}: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (

    <div className="form-group">

        <label>
            {label}
             {required && <span className="required">*</span>}
        </label>

        <div className="password-container">

            <input
                type={showPassword ? "text" : "password"}
                className={error ? "input error-input" : "input"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />

            <div className="password-actions">

                {value.trim() !== "" && strength && (
                    <span
                        className={`strength ${
                            strength === "Strong" || strength === "Matched"
                                ? "success"
                                : strength === "Medium"
                                ? "warning"
                                : "danger"
                        }`}
                    >
                        {strength}
                    </span>
                )}

                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

            </div>

        </div>

        {error && (
            <p className="error">
                {error}
            </p>
        )}

    </div>

);

}

export default PasswordInput; */
