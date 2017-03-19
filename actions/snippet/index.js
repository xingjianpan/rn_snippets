import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as actionTypes from '../../constants/actionTypes';
import { SNIPPET_ROOT_URL } from '../../services/api';
import { fetchList } from '../../actions/snippet-list';

export const snippetUpdate = ({ prop, value }) => {
  return {
    type: actionTypes.SNIPPET_UPDATE,
    payload: { prop, value },
  };
};

export const resetSnippetForm = () => {
  return {
    type: actionTypes.SNIPPET_FORM_RESET,
  };
};

export const snippetCreate = ({ title, code, description, token }) => {
  return (dispatch) => {
    axios.post(
      `${SNIPPET_ROOT_URL}/`,
      { title, code, description, ispublic: true },
      { headers: { Authorization: `Token ${token}` } },
    )
    .then(() => {
      dispatch({ type: actionTypes.SNIPPET_CREATE });
      dispatch(fetchList());
      Actions.snippetList({ type: 'reset' });
    });
  };
};

export const snippetSave = ({ id, title, code, description, token }) => {
  return (dispatch) => {
    axios.put(
      `${SNIPPET_ROOT_URL}/${id}/`,
      { title, code, description },
      { headers: { Authorization: `Token ${token}` } },
    )
    .then(() => {
      dispatch({ type: actionTypes.SNIPPET_SAVE_SUCCESS });
      dispatch(fetchList());
      Actions.snippetList({ type: 'reset' });
    });
  };
};


export const snippetDelete = ({ id, token }) => {
  return (dispatch) => {
    //  The second parameter to axios.delete is config, not data
    axios.delete(
      `${SNIPPET_ROOT_URL}/${id}/`,
      { headers: { Authorization: `Token ${token}` } },
    ).then(() => {
      dispatch(fetchList());
      Actions.snippetList({ type: 'reset' });
    });
  };
};
