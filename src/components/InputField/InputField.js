import React from 'react';
import classNames from 'classnames';

import style from "./InputField.module.scss";

const InputField = ({ className, errorMessage, label, name, onChange, placeholder, type = 'text', value }) => {
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
        placeholder={placeholder}
      />
      <p className={style.errorMessage}>{errorMessage}</p>
    </>
  );
};

export default InputField;