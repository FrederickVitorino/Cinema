// src/components/Input/LabelInput.jsx
import React from "react";

export function LabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  min,
  ...props
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        {...props}
      />
      {required && <div className="invalid-feedback">Campo obrigatório.</div>}
    </div>
  );
}
