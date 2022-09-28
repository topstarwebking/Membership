import React, { useRef } from "react";
import "./style.css"

export default function DateField(props) {
  const { type, placeholder, value, onChange, required } = props;
  const dateRef = useRef();

  return (
    <div id="date-filed">
     {placeholder? <p className={`floating-label-input mb-0 ${required && "required"}`}>
        {placeholder}
      </p>:null}
      <input
        ref={dateRef}
        type={value?.length > 0 ? "date" : "text"}
        maxDate={new Date()}
        className="form-control"
        value={value}
        onFocus={(e) => (e.currentTarget.type = "date")}
        onChange={(e) => {
          onChange(e);
          dateRef.current.value = e.target.value;
        }}
        // placeholder=""
        {...props}
      />
    </div>
  );
}
