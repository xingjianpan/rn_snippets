
import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case actionTypes.UNAUTH_USER:
      return { ...state, authenticated: false, user: null };
    case actionTypes.CLEAR_AUTH_ERROR:
      return { error: '' };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload.data };
    case actionTypes.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case actionTypes.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case actionTypes.LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case actionTypes.LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    default:
      return state;
  }
};
