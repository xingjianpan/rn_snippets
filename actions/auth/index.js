import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AUTH_ROOT_URL } from '../../services/api'
import * as actionTypes from '../../constants/actionTypes';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};



export function getUserDetails(token) {

  return (dispatch) => {
    axios.get(
      `${AUTH_ROOT_URL}/user/`,
      { headers: { Authorization: `Token ${token}`} },
    )
    .then((response) => {
      console.log('reponse from getuserDetail', response)
      dispatch({ type: actionTypes.SET_USER, payload: response });
      dispatch({ type: actionTypes.AUTH_USER });
      Actions.main();
    })
    .catch((error) => {
    });
  };
}

export function loginUser({ email, password }) {

  // use 'redux-thunk' to return an function
  // instead an object
  return (dispatch) => {
    // submit email/password to server
    axios.post(`${AUTH_ROOT_URL}/login/`, { email, password })
      .then((response) => {
        const token = response.data.key;
        dispatch(getUserDetails(token));
      })
      .catch((e) => {
        dispatch(authError('Bad Login Info!!!'));
      });
  };
}



export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  return {
    type: actionTypes.UNAUTH_USER,
  };
}

export function clearAuthError() {
  return {
    type: actionTypes.CLEAR_AUTH_ERROR,
  };
}

