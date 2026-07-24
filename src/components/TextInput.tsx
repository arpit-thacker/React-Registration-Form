import { forwardRef } from "react";
import type { TextInputProps } from "../types/input";

/* function TextInput */const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  type,
  name,
  /* placeholder, */
  value,
  error,
  required,
  readOnly = false,
  onChange,
  onKeyDown,
  tabIndex,
}: TextInputProps, ref) => {
  /* return (
        <div className="form-group">
            <label>
                {label} 
                {required && <span className="required">*</span>}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                readOnly={readOnly}
                className={error ? "input error-input" : "input"}
                autoFocus={name === "firstName"}
                tabIndex={tabIndex}
            />

            

            {error && <p className="error">{error}</p>}
        </div>
    ); */

  /* Like Google */
  return (
    <div className="form-group">
      <div className="input-wrapper">
        <input
          ref={ref}
          type={type}
          name={name}
          /* placeholder={placeholder} */
          placeholder=" "
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          className={error ? "input error-input" : "input"}
          autoFocus={name === "firstName"}
          tabIndex={tabIndex}
        />

        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

);
export default TextInput;
