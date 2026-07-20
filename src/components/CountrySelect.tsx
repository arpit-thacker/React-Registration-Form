import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import type { CountryOption } from "../data/countryCode";

interface CountrySelectProps {
  options: CountryOption[];
  value: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: string) => void;
}

function CountrySelect({
  options,
  value,
  isOpen,
  setIsOpen,
  onChange,
}: CountrySelectProps) {
  const selectedCountry = options.find((country) => country.value === value);

  return (
    <div className="custom-select">
      {/* Selected Country */}
      <div
        className="custom-select-header"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        {selectedCountry && (
          <div className="selected-option-content">
            <ReactCountryFlag countryCode={selectedCountry.countryCode} svg />

            <span>{selectedCountry.value}</span>
          </div>
        )}

        <FaChevronDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="custom-select-options">
          {options.map((country) => (
            <div
              key={country.value}
              className="custom-select-option"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                onChange(country.value);
                setIsOpen(false);
              }}
            >
              <ReactCountryFlag countryCode={country.countryCode} svg />

              <span className="country-name">{country.name}</span>

              <span className="country-code">{country.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
