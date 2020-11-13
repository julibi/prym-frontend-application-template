import React, { useState, useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../../components/InputField';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SIGNUP } from '../../redux/signUp/actions/signUp.actions';
import { getUsername, getSignUp } from '../../redux/signUp/selectors/signUp.selector';
import style from './SignUpForm.module.scss';

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

// https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
const mailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//https://stackoverflow.com/questions/32534109/javascript-password-validation-at-least-2-number-digits
const pwPattern = new RegExp('(?=^.{6,}$)(?=(.*\\d){2}).*');

const fieldLengthError = (maxLength) => {
  return `This field must contain at least ${maxLength} characters.`
};
const validateForm = (formDataLS) => {
  let errors = {};
  if (formDataLS.lastname.length < minLengths.lastname) {
    errors = {...errors, lastname: fieldLengthError(minLengths.lastname)};
  }
  if (formDataLS.firstname.length < minLengths.firstname) {
    errors = {...errors, firstname: fieldLengthError(minLengths.firstname)};
  }
  if (!mailPattern.test(formDataLS.email)) {
    errors = {...errors, email: 'This field must contain a valid email address.'};
  }
  if (!pwPattern.test(formDataLS.password)) {
    errors = {...errors, password: 'This password must contain at least 2 numbers.'};
  }
  if (formDataLS.password.length < minLengths.password) {
    errors = {...errors, password: fieldLengthError(minLengths.password)};
  }
  if (formDataLS.password !== formDataLS.pwdConfirmation) {
    errors = {...errors, pwdConfirmation: 'The passwords have to be identical.'};
  }
  if(formDataLS.street.length < minLengths.street) {
    errors = {...errors, street: fieldLengthError(minLengths.street)};
  }
  if(formDataLS.zip.length < minLengths.zip) {
    errors = {...errors, zip: fieldLengthError(minLengths.zip)};
  }
  if(formDataLS.city.length < minLengths.city) {
    errors = {...errors, city: fieldLengthError(minLengths.city)};
  }
  if(formDataLS == initialState) {
    errors = {};
  }
  return errors;
};

const canSubmitForm = (formErrors, formDataLS, initialState) => {
  const errorExists = !!Object.values(formErrors).filter(error => error.length).length;
  const isRequiredField = (key) => (key !== 'nickname') && (key !== 'additionalInfo') && (key !== 'house');
  const allFieldsFilled = () => {
    for (const key in formDataLS) {
      if (isRequiredField(key)) {
        if (formDataLS[key] == initialState[key]) {
          return false;
        }
      }
    }
    return true;
  }
  return allFieldsFilled() && !errorExists
};

const SignUpForm = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [formErrors, setFormErrors] = useState(initialState);
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [formDataLS, setFormDataLS] = useLocalStorage('formData', initialState);

  const dispatch = useDispatch();
  const toggle = () => {
    setShowAddress(!showAddress)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormDataLS(initialState);
    setFormErrors(initialState)
    dispatch(SIGNUP(formDataLS));
    alert('Form was submitted');
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormDataLS({ ...formDataLS, [name]: value });
  };

  useEffect(() => {
    //TODO: read up on passing arrow functions to setState...
    setFormErrors(validateForm(formDataLS));
  }, [formDataLS]);

  useEffect(() => {
    if (canSubmitForm(formErrors, formDataLS, initialState)) {
      setIsFormDataValid(true);
    } else {
      setIsFormDataValid(false);
    }

  }, [formDataLS, formErrors]);

  const getFormData = (fieldname) => {
    return formDataLS[fieldname];
  };

  return(
    <div className={style.signUpWrapper}>
      <fieldset>
        <form onSubmit={(event) => handleSubmit(event)} >
          <InputField
            value={getFormData('lastname')}
            label='Last name'
            placeholder='Mustermann'
            name='lastname'
            onChange={handleInput}
            errorMessage={formErrors.lastname}
          />
          <InputField
            value={getFormData('firstname')}
            label='First name'
            placeholder='Maxime'
            name='firstname'
            onChange={handleInput}
            errorMessage={formErrors.firstname}
          />
          <InputField
            value={getFormData('nickname')}
            label='Nick name'
            placeholder='Maxi'
            name='nickname'
            onChange={handleInput}
          />
          <InputField
            value={getFormData('email')}
            label='Email'
            placeholder='Maxi@gmail.com'
            name='email'
            onChange={handleInput}
            errorMessage={formErrors.email}
          />
          <InputField
            value={getFormData('password')}
            label='Password'
            name='password'
            placeholder='Your smart password'
            type='password'
            onChange={handleInput}
            errorMessage={formErrors.password}
          />
          <InputField
            value={getFormData('pwdConfirmation')}
            label='Repeat password'
            name='pwdConfirmation'
            placeholder='1d!43g@OY05twm'
            type='password'
            onChange={handleInput}
            errorMessage={formErrors.pwdConfirmation}
          />
          <label>{'Show address'}</label>
          <input
            data-testid='checkbox'
            type='checkbox'
            checked={showAddress}
            onChange={toggle}
            className={style.checkbox}
          />
          <br />
          { showAddress && (
            <>
              <InputField
                value={getFormData('street')}
                label='Street'
                placeholder='Mustermann Straße'
                name='street'
                onChange={handleInput}
                errorMessage={formErrors.street}
              />
              <InputField
                value={getFormData('house')}
                label='House/Apartment'
                placeholder='10'
                name='house'
                onChange={handleInput}
                errorMessage={formErrors.house}
              />
              <InputField
                value={getFormData('zip')}
                label='ZIP'
                placeholder='11233'
                name='zip'
                onChange={handleInput}
                errorMessage={formErrors.zip}
              />
              <InputField
                value={getFormData('city')}
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
            value={getFormData('additionalInfo')}
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