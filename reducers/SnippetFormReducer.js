import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  code: '',
  title: '',
  description: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action)
  switch (action.type) {
    case actionTypes.SNIPPET_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case actionTypes.SNIPPET_CREATE:
      return INITIAL_STATE;
    case actionTypes.SNIPPET_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
