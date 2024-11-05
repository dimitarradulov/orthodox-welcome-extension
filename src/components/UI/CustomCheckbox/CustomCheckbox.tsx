import React from "react";
import "./CustomCheckbox.css";

type CustomCheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label = "", // Text to display next to checkbox
  checked = false, // Controlled checked state
  onChange = () => {}, // Callback for state changes
  className = "", // Additional classes for the container
  disabled = false, // Disabled state
  labelClassName = "", // Additional classes for the label text
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <label
        className={`checkbox-label ${disabled ? "checkbox-disabled" : ""}`}
      >
        <input
          type="checkbox"
          className="checkbox-input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className={`checkbox-box ${checked ? "checkbox-checked" : ""}`}>
          {checked && (
            <svg
              viewBox="0 0 24 24"
              className="checkbox-icon"
              aria-hidden="true"
            >
              <path
                d="M12 3v18M7.5 8.5h9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </div>
        {label && (
          <span className={`checkbox-text ${labelClassName}`}>{label}</span>
        )}
      </label>
    </div>
  );
};

export default CustomCheckbox;

{
  /* <path
d="M12 3v18M7.5 8.5h9"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
fill="none"
/> */
}
