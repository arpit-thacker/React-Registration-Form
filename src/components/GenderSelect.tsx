import { useState } from "react";
import { highlightMatch } from "../utils/highlightMatch";

type Gender = "Male" | "Female" | "Other" | null;

interface GenderSelectProps {
  value: Gender;

  error?: string;

  required?: boolean;

  onChange: (value: Gender) => void;
}

function GenderSelect({ value, error, required, onChange }: GenderSelectProps) {
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const [activeGenderIndex, setActiveGenderIndex] = useState(-1);

  const genderOptions: Exclude<Gender, null>[] = ["Male", "Female", "Other"];

  const filteredGenders = genderOptions.filter((gender) =>
    gender.toLowerCase().includes((value ?? "").toLowerCase()),
  );

  return (
    <div className="form-group searchable-dropdown">
      <div className="input-wrapper">
        <input
          id="gender"
          type="text"
          className={error ? "input error-input" : "input"}
          placeholder=" "
          value={value ?? ""}
          onChange={(e) => {
            onChange(e.target.value as Gender);

            setShowGenderOptions(true);

            setActiveGenderIndex(-1);
          }}
          onFocus={() => {
            setShowGenderOptions(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowGenderOptions(false);
            }, 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();

              setActiveGenderIndex((prev) =>
                prev < filteredGenders.length - 1 ? prev + 1 : prev,
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();

              setActiveGenderIndex((prev) => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === "Enter") {
              e.preventDefault();

              if (activeGenderIndex >= 0) {
                onChange(filteredGenders[activeGenderIndex]);
              } else if (filteredGenders.length > 0) {
                onChange(filteredGenders[0]);
              }

              setShowGenderOptions(false);
            }
          }}
        />

        <label htmlFor="gender">
          Gender
          {required && <span className="required">*</span>}
        </label>
      </div>

      {showGenderOptions && filteredGenders.length > 0 && (
        <div className="dropdown-options">
          {filteredGenders.map((gender, index) => (
            <div
              key={gender}
              className={`dropdown-option ${
                index === activeGenderIndex ? "active" : ""
              }`}
              onMouseDown={() => {
                onChange(gender);

                setShowGenderOptions(false);
              }}
            >
              {highlightMatch(gender, value ?? "")}
            </div>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default GenderSelect;
