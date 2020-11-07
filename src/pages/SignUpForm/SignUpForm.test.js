  
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe('SignUpForm', () => {
  const renderSignUp = () => render(<Provider store={store}><SignUpForm /></Provider>);
  describe('lastname field', () => {
    it('should show error Message, when minimum character amount of field is not reached', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const input = getByPlaceholderText('Mustermann');
      
      fireEvent.change(input, {
        target: {
          value: 'Y',
        },
      });
  
      expect(container).toMatchSnapshot();
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
      const input = getByPlaceholderText('Maxi@gmail.com');
      
      fireEvent.change(input, {
        target: {
          value: '@IamA@fake@mail',
        },
      });

      expect(container).toMatchSnapshot();
    });

    it('renders correctly with valid email', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const input = getByPlaceholderText('Maxi@gmail.com');
      
      fireEvent.change(input, {
        target: {
          value: 'valid@email.com',
        },
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('password', () => {
    it('shows error when input is too short (or contains not enough digits)', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const input = getByPlaceholderText('Your smart password');
      
      fireEvent.change(input, {
        target: {
          value: 'short',
        },
      });

      expect(container).toMatchSnapshot();
    });

    it('renders correctly when at least 6 characters long and container at least 2 digist', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const input = getByPlaceholderText('1d!43g@OY05twm');
      
      fireEvent.change(input, {
        target: {
          value: 's2hort5!fd6',
        },
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('submit button', () => {
    // TODO: test the checkbox (snapshot)
    // TODO: write an abstraction function for filling of form
    // TODO: test submit button disablement
    it('only is disabled when all required fields are filled in and valid', () => {
      const { getByPlaceholderText, container } = renderSignUp();
      const lastname = getByPlaceholderText('Mustermann');
      const firstname = getByPlaceholderText('Maxime');
      const email = getByPlaceholderText('Maxi@gmail.com');
      const password = getByPlaceholderText('Your smart password');
      const pwdConfirmation = getByPlaceholderText('1d!43g@OY05twm');

      const street = getByPlaceholderText('Mustermann Straße');
      const zip = getByPlaceholderText('11233');
      const city = getByPlaceholderText('Porto');
      
      fireEvent.change(input, {
        target: {
          value: 'Kent',
        },
      });

      expect(container).toMatchSnapshot();
    });
  });
});