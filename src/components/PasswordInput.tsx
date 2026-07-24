import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import type { PasswordInputProps } from "../types/password";
import { getPasswordRequirements } from "../utils/passwordValidation";

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
  const [showRequirements, setShowRequirements] = useState(false);
  const requirements = getPasswordRequirements(value);
  const isPasswordField = name === "password";

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
          maxLength={30}
          onFocus={() => setShowRequirements(true)}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "v") {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }

            onKeyDown?.(e);
          }}
          onBlur={() => setShowRequirements(false)}
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
            onMouseDown={(e) =>
              e.preventDefault()
            } /* eye button focus remove or skipped */
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {isPasswordField && showRequirements && (
        <div className="password-requirements">
          <div
            className={`requirement-item ${
              requirements.minLength ? "completed" : "pending"
            }`}
          >
            <span>{requirements.minLength ? "✓" : "○"}</span>
            <span>At least 8 characters</span>
          </div>

          <div
            className={`requirement-item ${
              requirements.uppercase ? "completed" : "pending"
            }`}
          >
            <span>{requirements.uppercase ? "✓" : "○"}</span>
            <span>One uppercase letter</span>
          </div>

          <div
            className={`requirement-item ${
              requirements.lowercase ? "completed" : "pending"
            }`}
          >
            <span>{requirements.lowercase ? "✓" : "○"}</span>
            <span>One lowercase letter</span>
          </div>

          <div
            className={`requirement-item ${
              requirements.number ? "completed" : "pending"
            }`}
          >
            <span>{requirements.number ? "✓" : "○"}</span>
            <span>One number</span>
          </div>

          <div
            className={`requirement-item ${
              requirements.special ? "completed" : "pending"
            }`}
          >
            <span>{requirements.special ? "✓" : "○"}</span>
            <span>One special character</span>
          </div>
        </div>
      )}

      {error && !showRequirements && <p className="error">{error}</p>}
    </div>
  );
}

export default PasswordInput;