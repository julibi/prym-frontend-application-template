import React from 'react';
import classNames from 'classnames';

import style from "./InputField.module.scss";

const InputField = ({ className,  error,  label,  name, onChange, onBlur, type = 'text', value }) => {
  return(
    <>
      <label
        className={style.label}
        htmlFor={name}  
      >
        {label}
      </label>
      <input
        className={classNames(style.inputField, className)}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className={style.errorMessage}>{error}</p>
    </>
  );
};

export default InputField;