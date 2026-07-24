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
  companyInputRef: React.RefObject<HTMLInputElement | null>;
  stateInputRef: React.RefObject<HTMLInputElement | null>;
}

function PhoneInput({
  countryCode,
  mobile,
  error,
  required,
  onCountryChange,
  onMobileChange,
  onKeyDown,
  companyInputRef,
  stateInputRef,
}: PhoneInputProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);

  const mobileInputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef(false);
  const selectedCountry = countryOptions.find(
    (country) => country?.value === countryCode,
  );

  const restoreMobileFocus = () => {
    restoreFocusRef.current = true;
    setIsMobileFocused(true);

    requestAnimationFrame(() => {
      mobileInputRef.current?.focus();
    });
  };

  return (
    <div className="form-group">
      <div className="input-wrapper phone-wrapper">
        <div
          className= {`phone-container ${
            isMobileFocused || isCountryOpen /* || mobile */
              ? "phone-container-focused"
              : ""
          }`}
        >
         {(isMobileFocused || isCountryOpen) && (
            <CountrySelect
              options={countryOptions}
              value={countryCode}
              isOpen={isCountryOpen}
              setIsOpen={setIsCountryOpen}
              mobileInputRef={mobileInputRef}
              stateInputRef={stateInputRef}
              onClose={restoreMobileFocus}
              onChange={(value) => {
                onCountryChange({
                  target: {
                    value,
                  },
                } as React.ChangeEvent<HTMLSelectElement>);

                restoreMobileFocus();
              }}
              companyInputRef={companyInputRef}
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
            minLength={selectedCountry?.phoneLength}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key.toLowerCase() === "c") {
                e.preventDefault();

                setIsCountryOpen((prev) => {
                  const next = !prev;

                  if (!next) {
                    restoreMobileFocus();
                  }

                  return next;
                });

                return;
              }

              if (e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                setIsCountryOpen(true);
                return;
              }

              onKeyDown?.(e);
            }}

            onFocus={() => {
              setIsMobileFocused(true);
              restoreFocusRef.current = false;
            }}
            onBlur={() => {
              if (restoreFocusRef.current) {
                restoreFocusRef.current = false;
                return;
              }

              setIsMobileFocused(false);
            }}
            maxLength={selectedCountry?.phoneLength}
          />

          <label
            htmlFor="mobile" /* className={isMobileFocused || isCountryOpen ? "phone-label-active" : ""} */
          >
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
