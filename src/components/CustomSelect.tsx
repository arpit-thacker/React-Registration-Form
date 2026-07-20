import { FaChevronDown } from "react-icons/fa";

interface Option {
  value: string;
  label: React.ReactNode;
}

interface BasicCustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileFocused: boolean;
}

function BasicCustomSelect({
  options,
  value,
  onChange,
  isOpen,
  setIsOpen,
  isMobileFocused,
}: BasicCustomSelectProps) {

  const selectedOption = options.find(
    (option) => option.value === value
  );
  

  return (
    <div className="custom-select">

      <div
        className="custom-select-header"

        title={
          isOpen
            ? "Hide country list (Ctrl + C)"
            : "Show country list (Ctrl + C)"
        }

        onMouseDown={(e) => {
          e.preventDefault();
          if (!isMobileFocused) {
            return;
          }
          setIsOpen((prev) => !prev);
        }}
      >

        <div className="selected-option-content">
          {selectedOption?.label}
        </div>

        <FaChevronDown
          className={`dropdown-arrow ${
            isOpen ? "open" : ""
          }`}
        />

      </div>


      {isOpen && (
        <div className="custom-select-options">

          {options.map((option) => (
            <div
              key={option.value}
              className="custom-select-option"
              tabIndex={0}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default BasicCustomSelect;