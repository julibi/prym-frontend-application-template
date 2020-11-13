  
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe('SignUpForm', () => {
  const renderSignUp = () => render(<Provider store={store}><SignUpForm /></Provider>);
  const changeInput = (container, field, input) => {
    fireEvent.change(field, {
      target: {
        value: input,
      },
    });

    expect(container).toMatchSnapshot();
  };
  describe('lastname field', () => {
    it('should show error Message, when minimum character amount of field is not reached', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const lastnameField = getByPlaceholderText('Mustermann');
  

      changeInput(container, lastnameField, 'Y');
    });
  
    it('should render correctly when conditions are met', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const input = getByPlaceholderText('Mustermann');
      
      fireEvent.change(input, {
        target: {
          value: 'Yi',
        },
      });
  
      expect(container).toMatchSnapshot();
    });
  });

  describe('email field', () => {
    it('must match valid e-mail pattern', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const emailField = getByPlaceholderText('Maxi@gmail.com');

      changeInput(container, emailField, '@IamA@fake@mail');
    });

    it('renders correctly with valid email', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const emailField = getByPlaceholderText('Maxi@gmail.com');
      
      changeInput(container, emailField, 'valid@mail.com');
    });
  });

  describe('password', () => {
    it('shows error when input is too short (or contains not enough digits)', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const passWordField = getByPlaceholderText('Your smart password');

      changeInput(container, passWordField, 'short');
    });

    it('renders correctly when at least 6 characters long and container at least 2 digist', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const passWordConfirmationField = getByPlaceholderText('1d!43g@OY05twm');

      changeInput(container, passWordConfirmationField, 's2hort5');
    });
  });

  describe('submit button', () => {
    it('only is enabled when all required fields are filled in and valid', () => {
      const { getByPlaceholderText, getByTestId, getByText, container } = renderSignUp();
      const lastname = getByPlaceholderText('Mustermann');
      const firstname = getByPlaceholderText('Maxime');
      const email = getByPlaceholderText('Maxi@gmail.com');
      const password = getByPlaceholderText('Your smart password');
      const pwdConfirmation = getByPlaceholderText('1d!43g@OY05twm');
      const checkbox = getByTestId('checkbox');
      fireEvent.click(checkbox);
      const street = getByPlaceholderText('Mustermann Straße');
      const zip = getByPlaceholderText('11233');
      const city = getByPlaceholderText('Porto');
      
      changeInput(container, lastname, 'Müller');
      changeInput(container, firstname, 'Julia');
      changeInput(container, email, 'JuMu@email.com');
      changeInput(container, password, 'jumüjumü12');
      changeInput(container, pwdConfirmation, 'jumüjumü12');
      expect(getByText(/Submit/i).closest('input')).toBeDisabled();
      changeInput(container, street, 'Müllstraße');
      changeInput(container, zip, '12345');
      changeInput(container, city, '');
      expect(getByText(/Submit/i).closest('input')).toBeDisabled();
      changeInput(container, city, 'Müllster');
      expect(getByText(/Submit/i).closest('input')).not.toBeDisabled();
      expect(container).toMatchSnapshot();
    });
  });
});