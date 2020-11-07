import InputField from './InputField';
import React from "react";
import { render, fireEvent } from "@testing-library/react";


describe('InputField', () => {
  const props = {
    label: 'label',
    name: 'name',
    onChange: jest.fn(),
    label: 'label',
    placeholder: 'test'
  };
  it('should render correctly with props', () => {
    const {container} = render(
      <InputField { ...props }/>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with all optional props provided', () => {
    const newProps = { ...props, className: 'className', type: 'password', errorMessage: 'errorMessage' };
    const {container} = render(
      <InputField { ...newProps }/>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fire onChange prop', () => {
    const { getByPlaceholderText, container } = render(<InputField {...props} />);
    const input = getByPlaceholderText('test');
    
    fireEvent.change(input, {
      target: {
        value: 'inputValue',
      },
    });

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });
});
