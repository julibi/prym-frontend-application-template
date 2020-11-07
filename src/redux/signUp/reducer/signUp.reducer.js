const initialState = {
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

const signUpReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SIGNUP':
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export { signUpReducer, initialState };
