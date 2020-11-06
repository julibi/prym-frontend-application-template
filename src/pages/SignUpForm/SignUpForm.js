import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import style from './SignUpForm.module.scss';


const SignUpForm = () => {
  const [showAddress, setShowAddress] = useState(false);
  const toggle = () => {
    setShowAddress(!showAddress)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return(
    <div className={style.signUpWrapper}>
      <fieldset>
        <form onSubmit={(event) => handleSubmit(event)} >
          <InputField
            value='value'
            label='Last name'
            name='lastname'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <InputField
            value='value'
            label='First name'
            name='firstname'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <InputField
            value='value'
            label='Nick name'
            name='nickname'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <InputField
            value='value'
            label='Email'
            name='email'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <InputField
            value='value'
            label='Password'
            name='password'
            type='password'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <InputField
            value='value'
            label='Repeat password'
            name='pwdConfirmation'
            type='password'
            onChange={() => {}}
            onBlur={() => {}}
          />
          <label>{'Show address'}</label>
          <input
            type='checkbox'
            checked={showAddress}
            onChange={toggle}
            className={style.checkbox}
          />
          <br />
          { showAddress && (
            <>
              <InputField
                value='value'
                label='Street'
                name='street'
                onChange={() => {}}
                onBlur={() => {}}
              />
              <InputField
                value='value'
                label='House/Apartment'
                name='house'
                onChange={() => {}}
                onBlur={() => {}}
              />
              <InputField
                value='value'
                label='ZIP'
                name='zip'
                onChange={() => {}}
                onBlur={() => {}}
              />
              <InputField
                value='value'
                label='City'
                name='city'
                onChange={() => {}}
                onBlur={() => {}}
              />
            </>
          )}
          <input type="submit" value="Submit" className={style.submitButton} />
        </form>
      </fieldset>
    </div>
  );
};

export default SignUpForm;