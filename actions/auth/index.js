import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AUTH_ROOT_URL } from '../../services/api';
import * as actionTypes from '../../constants/actionTypes';

export const emailChanged = (text) => {
  return {
    type: actionTypes.EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: actionTypes.PASSWORD_CHANGED,
    payload: text,
  };
};

export function getUserDetails(token) {
  return (dispatch) => {
    axios.get(
      `${AUTH_ROOT_URL}/user/`,
      { headers: { Authorization: `Token ${token}` } },
    )
    .then((response) => {
      dispatch({ type: actionTypes.SET_USER, payload: response });
      dispatch({ type: actionTypes.AUTH_USER });
    });
  };
}

const loginUserFail = (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, token) => {
  dispatch(getUserDetails(token));
  Actions.main();
};


export function loginUser({ email, password }) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER });
    axios.post(`${AUTH_ROOT_URL}/login/`, { email, password })
      .then((response) => {
        const token = response.data.key;
        loginUserSuccess(dispatch, token);
      })
      .catch(() => loginUserFail(dispatch));
  };
}

export function signoutUser() {
  return {
    type: actionTypes.UNAUTH_USER,
  };
}

