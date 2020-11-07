import React from "react";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from "./App";

describe('App', () => {
  it('renders title', () => {
    const {getByText} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(getByText(/Let's Rock/i)).toBeInTheDocument();
  });
});
