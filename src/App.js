import React from "react";
import style from "./App.module.scss";
import { connect } from "react-redux";

import SignUpForm from './pages/SignUpForm';

function App() {
  return(
    <div className={style.rock}>Lets Rock! 🤘
      <SignUpForm />
    </div>
  );
}
const mapDispatch = (dispatch) => ({});
const mapState = (state) => ({});

export default connect(mapState, mapDispatch)(App);
