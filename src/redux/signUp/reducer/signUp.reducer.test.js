import { signUpReducer, initialState } from './signUp.reducer';


describe('signUp reducer', () => {
  it('should return the initial state', () => {
    expect(
      signUpReducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should return all form data that is sent on SIGNUP', () => {
    const action = { type: 'SIGNUP', payload: { foo: 'foo', bar: 'bar' } };
    expect(
      signUpReducer(initialState, action)
    ).toEqual(action.payload);
  });
});