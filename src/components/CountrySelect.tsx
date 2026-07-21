import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import type { CountryOption } from "../data/countryCode";

interface CountrySelectProps {
  options: CountryOption[];
  value: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
}

function CountrySelect({
  options,
  value,
  isOpen,
  setIsOpen,
  mobileInputRef,
  onChange,
}: CountrySelectProps) {
  const selectedCountry = options.find((country) => country.value === value);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = options.filter((country) => {
    return (
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.value.includes(search)
    );
  });

  const resetDropdown = () => {
    setSearch("");
    setActiveIndex(filteredCountries.length > 0 ? 0 : -1);
  };

  const selectCountry = (countryValue: string) => {
    onChange(countryValue);

    setIsOpen(false);

    resetDropdown();

    requestAnimationFrame(() => {
      mobileInputRef.current?.focus();
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetDropdown();

      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(filteredCountries.length > 0 ? 0 : -1);
    }
  }, [search, isOpen, filteredCountries.length]);

  useEffect(() => {
    if (activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);

        resetDropdown();

        requestAnimationFrame(() => {
          mobileInputRef.current?.focus();
        });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileInputRef]);

  return (
    <div className="custom-select" ref={dropdownRef}>
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
          <div className="country-search-wrapper">
            <input
              ref={searchInputRef}
              type="text"
              className="country-search"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();

                  setIsOpen(false);

                  resetDropdown();

                  requestAnimationFrame(() => {
                    mobileInputRef.current?.focus();
                  });

                  return;
                }

                if (e.ctrlKey && e.key.toLowerCase() === "c") {
                  e.preventDefault();

                  setIsOpen(false);

                  resetDropdown();

                  requestAnimationFrame(() => {
                    mobileInputRef.current?.focus();
                  });

                  return;
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();

                  setActiveIndex((prev) => {
                    const next =
                      prev < filteredCountries.length - 1 ? prev + 1 : prev;

                    return next;
                  });

                  return;
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();

                  setActiveIndex((prev) => {
                    const next = prev > 0 ? prev - 1 : 0;

                    return next;
                  });

                  return;
                }

                if (e.key === "Enter" && activeIndex >= 0) {
                  e.preventDefault();
                  const selected = filteredCountries[activeIndex];

                  if (selected) {
                    selectCountry(selected.value);
                  }
                }
              }}
            />
          </div>

          <div className="country-list">
            {filteredCountries.map((country, index) => (
              <div
                key={country.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                className={`custom-select-option ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => selectCountry(country.value)}
              >
                <ReactCountryFlag countryCode={country.countryCode} svg />

                <span className="country-name">{country.name}</span>

                <span className="country-code">{country.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
