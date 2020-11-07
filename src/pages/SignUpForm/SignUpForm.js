import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../../components/InputField';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SIGNUP } from '../../redux/signUp/actions/signUp.actions';
import style from './SignUpForm.module.scss';

const SignUpForm = () => {
  const storedFormData = JSON.parse(window.localStorage.getItem('formData'));
  const minLengths = {
    password: 6,
    lastname: 2,
    firstname: 2,
    street: 4,
    zip: 5,
    city: 4
  };

  let initialState = {
    lastname: '',
    firstname: '',
    nickname: '',
    email: '',
    password: '',
    pwdConfirmation: '',
    street: '',
    house: '',
    zip: '',
    city: '',
    additionalInfo: ''
  };
  

  const [showAddress, setShowAddress] = useState(false);
  const [formData, setFormData] = useState(storedFormData ? storedFormData : initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [formDataLS, setFormDataLS] = useLocalStorage('formData', initialState);
  const dispatch = useDispatch();
  // https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
  const mailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //https://stackoverflow.com/questions/32534109/javascript-password-validation-at-least-2-number-digits
  const pwPattern = new RegExp('(?=^.{6,}$)(?=(.*\\d){2}).*');
  const toggle = () => {
    setShowAddress(!showAddress)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(initialState);
    setFormDataLS(initialState);
    setFormErrors(initialState)
    dispatch(SIGNUP(formData));
    alert('Form was submitted');
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormDataLS({ ...formData, [name]: value });
  };

  const fieldLengthError = (maxLength) => {
    return `This field must contain at least ${maxLength} characters.`
  };

  useEffect(() => {
    let errors = {};
    if (formData.lastname.length < minLengths.lastname) {
      errors = {...errors, lastname: fieldLengthError(minLengths.lastname)};
    }
    if (formData.firstname.length < minLengths.firstname) {
      errors = {...errors, firstname: fieldLengthError(minLengths.firstname)};
    }
    if (!mailPattern.test(formData.email)) {
      errors = {...errors, email: 'This field must contain a valid email address.'};
    }
    if (!pwPattern.test(formData.password)) {
      errors = {...errors, password: 'This password must contain at least 2 numbers.'};
    }
    if (formData.password.length < minLengths.password) {
      errors = {...errors, password: fieldLengthError(minLengths.password)};
    }
    if (formData.password !== formData.pwdConfirmation) {
      errors = {...errors, pwdConfirmation: 'The passwords have to be identical.'};
    }
    if(formData.street.length < minLengths.street) {
      errors = {...errors, street: fieldLengthError(minLengths.street)};
    }
    if(formData.zip.length < minLengths.zip) {
      errors = {...errors, zip: fieldLengthError(minLengths.zip)};
    }
    if(formData.city.length < minLengths.city) {
      errors = {...errors, city: fieldLengthError(minLengths.city)};
    }
    if(formData == initialState) {
      errors = {};
    }
    setFormErrors(errors);
  }, [formData]);

  useEffect(() => {
    const errorExists = !!Object.values(formErrors).filter(error => error.length).length;
    const isRequiredField = (key) => (key !== 'nickname') && (key !== 'additionalInfo') && (key !== 'house');
    const allFieldsFilled = () => {
      for (const key in formData) {
        if (isRequiredField(key)) {
          if (formData[key] == initialState[key]) {
            return false;
          }
        }
      }
      return true;
    }

    if (!errorExists && allFieldsFilled()) {
      setIsFormDataValid(true);
    } else {
      setIsFormDataValid(false);
    }

  }, [formData, formErrors]);

  return(
    <div className={style.signUpWrapper}>
      <fieldset>
        <form onSubmit={(event) => handleSubmit(event)} >
          <InputField
            value={formData.lastname}
            label='Last name'
            placeholder='Mustermann'
            name='lastname'
            onChange={handleInput}
            errorMessage={formErrors.lastname}
          />
          <InputField
            value={formData.firstname}
            label='First name'
            placeholder='Maxime'
            name='firstname'
            onChange={handleInput}
            errorMessage={formErrors.firstname}
          />
          <InputField
            value={formData.nickname}
            label='Nick name'
            placeholder='Maxi'
            name='nickname'
            onChange={handleInput}
          />
          <InputField
            value={formData.email}
            label='Email'
            placeholder='Maxi@gmail.com'
            name='email'
            onChange={handleInput}
            errorMessage={formErrors.email}
          />
          <InputField
            value={formData.password}
            label='Password'
            name='password'
            placeholder='Your smart password'
            type='password'
            onChange={handleInput}
            errorMessage={formErrors.password}
          />
          <InputField
            value={formData.pwdConfirmation}
            label='Repeat password'
            name='pwdConfirmation'
            placeholder='1d!43g@OY05twm'
            type='password'
            onChange={handleInput}
            errorMessage={formErrors.pwdConfirmation}
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
                value={formData.street}
                label='Street'
                placeholder='Mustermann Straße'
                name='street'
                onChange={handleInput}
                errorMessage={formErrors.street}
              />
              <InputField
                value={formData.house}
                label='House/Apartment'
                placeholder='10'
                name='house'
                onChange={handleInput}
                errorMessage={formErrors.house}
              />
              <InputField
                value={formData.zip}
                label='ZIP'
                placeholder='11233'
                name='zip'
                onChange={handleInput}
                errorMessage={formErrors.zip}
              />
              <InputField
                value={formData.city}
                label='City'
                placeholder='Porto'
                name='city'
                onChange={handleInput}
                errorMessage={formErrors.city}
              />
            </>
          )}
          <label>{'Additional information'}</label>
          <textarea
            className={style.textarea}
            value={formData.additionalInfo}
            name='additionalInfo'
            onChange={handleInput}
            rows={5}
          />
          <input type='submit' value='Submit' className={style.submitButton} disabled={!isFormDataValid && "disabled"}/>
        </form>
      </fieldset>
    </div>
  );
};

export default SignUpForm;