import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import snippetListReducer from './snippet_list_reducers';
import snippetItemReducer from './snippet_item_reducers';
import searchSnippetsReducer from './search_snippets_reducers';

export default combineReducers({
  auth: AuthReducer,
  snippet_list: snippetListReducer,
  snippet: snippetItemReducer,
  search: searchSnippetsReducer,
});
