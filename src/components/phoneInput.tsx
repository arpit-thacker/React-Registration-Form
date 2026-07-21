import { useRef, useState } from "react";
import { countryOptions } from "../data/countryCode";

import "./phoneInput.css";
import CountrySelect from "./CountrySelect";

interface PhoneInputProps {
  countryCode: string;
  mobile: string;
  error?: string;
  required?: boolean;

  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function PhoneInput({
  countryCode,
  mobile,
  error,
  required,
  onCountryChange,
  onMobileChange,
  onKeyDown,
}: PhoneInputProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);

  const mobileInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countryOptions.find(
    (country) => country.value === countryCode,
  );

  return (
    <div className="form-group">
      <div className="input-wrapper phone-wrapper">
        <div className="phone-container">
          {isMobileFocused && (
            <CountrySelect
              options={countryOptions}
              value={countryCode}
              isOpen={isCountryOpen}
              setIsOpen={setIsCountryOpen}
              mobileInputRef={mobileInputRef}
              onChange={(value) => {
                onCountryChange({
                  target: {
                    value,
                  },
                } as React.ChangeEvent<HTMLSelectElement>);

                setIsMobileFocused(true);

                requestAnimationFrame(() => {
                  mobileInputRef.current?.focus();
                });
              }}
            />
          )}

          <input
            ref={mobileInputRef}
            className="phone-input"
            id="mobile"
            name="mobile"
            type="tel"
            placeholder=" "
            value={mobile}
            readOnly={isCountryOpen}
            onChange={onMobileChange}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key.toLowerCase() === "c") {
                e.preventDefault();

                setIsCountryOpen((prev) => {
                  const next = !prev;

                  if (!next) {
                    requestAnimationFrame(() => {
                      mobileInputRef.current?.focus();
                    });
                  }

                  return next;
                });

                return;
              }

              onKeyDown?.(e);
            }}
            onFocus={() => setIsMobileFocused(true)}
            onBlur={() => {
              if (!isCountryOpen) {
                setIsMobileFocused(false);
              }
            }}
            maxLength={selectedCountry?.phoneLength}
          />

          <label htmlFor="mobile">
            Mobile Number
            {required && <span className="required">*</span>}
          </label>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PhoneInput;
