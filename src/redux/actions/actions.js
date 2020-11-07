export const SIGNUP = (formData) => {
  console.log(formData);
  return {
  type: 'SIGNUP', payload: formData
  }
};
