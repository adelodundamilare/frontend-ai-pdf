import { useField } from "formik";
import React from "react";

function FormikField({
  label,
  name,
  type,
  accept,
  value,
  onChange,
  placeholder,
  handleChangeEndDate,
  ...rest
}) {
  const [field, meta] = useField(name);
  return (
    <div>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        {...field}
        {...rest}
        type={type}
        placeholder={placeholder}
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
      />
      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
}

export default FormikField;