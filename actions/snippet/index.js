import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as actionTypes from '../../constants/actionTypes';
import { SNIPPET_ROOT_URL } from '../../services/api';

export const snippetUpdate = ({ prop, value }) => {
  return {
    type: actionTypes.SNIPPET_UPDATE,
    payload: { prop, value },
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
      Actions.snippetList({ type: 'reset' });
    });
  };
};

export const editItem = (item) => {
  const { id, title, code, linenos, language, style, ispublic, description } = item;
  return (dispatch) => {
    axios.put(
      `${SNIPPET_ROOT_URL}/${id}/`,
      { title, code, linenos, language, style, ispublic, description },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
    .then((response) => {
    });
  };
};


export const deleteItem = (item) => {
  return (dispatch) => {
    //  The second parameter to axios.delete is config, not data
    axios.delete(
      `${SNIPPET_ROOT_URL}/${item.id}/`,
      { headers: { Authorization: `Token ${localStorage.getItem('token')}`} },
    ).then(() => {
    });
  };
};

export const fetchItemSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_ITEM_SUCCESS,
    payload: response,
  };
};

export const fetchItemFailed = (bool) => {
  return {
    type: actionTypes.FETCH_ITEM_FAILED,
    payload: bool,
  };
};


export const ItemIsLoading = (bool) => {
  return {
    type: actionTypes.ITEM_IS_LOADING,
    payload: bool,
  };
};


export const fetchHighlightSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_HIGHLIGHT_SUCCESS,
    payload: response,
  };
};

export const fetchItem = (id) => {
  return (dispatch) => {
    dispatch(ItemIsLoading(true));

    axios.all([
      axios.get(`${SNIPPET_ROOT_URL}/${id}/`),
      axios.get(`${SNIPPET_ROOT_URL}/${id}/highlight/`),
    ])
      .then(axios.spread(function (snippetResponse, highlightResponse) {
        dispatch(fetchItemSuccess(snippetResponse));
        dispatch(fetchHighlightSuccess(highlightResponse));
      }))
      .catch(()=> dispatch(fetchItemFailed(true)));
  };
};

