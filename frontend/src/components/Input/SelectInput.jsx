export function SelectInput({
  options = [],
  value,
  onChange,
  label = "Options",
  id = "inputGroupSelect",
  disabled = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
