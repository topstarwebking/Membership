import React, { useState } from "react";
import "./SelectBox.css";

export default function SelectBox({
  label,
  onChange,
  options,
  optionKey,
  optionValue,
  optionName,
  selected,
  placeholder,
  newClass,
  required,
  disabled = false,
  customStyle,
  onBlur = () => {},
}) {
  const [isFocussed, setFocus] = useState(false);
  return (
    <div id="select-box">
    {
      label?.length > 0 &&  <p
          className={`${required && label.length > 0 ? "required " : ""} ${
            isFocussed || selected
              ? "label-selectBox"
              : "not-focus-label-selectBox"
          } mb-0`}
        >
          {label}
        </p>
      }
      <select
        onBlur={onBlur}
        onFocus={() => setFocus(true)}
        // className={`custom-select yellowBGDiv position-relative p-3 ${newClass}`}
        className={`custom-select position-relative ${newClass}`}
        style={{
          opacity: disabled ? 0.5 : 1,
          ...customStyle,
        }}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.value);
        }}
        disabled={disabled}
      >
        {isFocussed && !selected && <option defaultValue>{placeholder}</option>}
        {(isFocussed || selected) &&
          options.map((item,item_i) => {
            return (
              <option
                key={item[optionKey]+item_i}
                value={item[optionValue]}
                selected={selected === item[optionValue]}
              >
                {item[optionName]}
              </option>
            );
          })}
      </select>
    </div>
  );
}
