import { createSelector } from "reselect";

const getSignUp = (state) => state.signUp;

const getUsername = createSelector([getSignUp], (signUp) => signUp.firstname);

export { getSignUp, getUsername };
