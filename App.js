import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import Router from './Router';
import { getUserDetails } from './actions';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: { },
});

global.storage = storage;
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, ReduxPromise));


storage.load({
  key: 'token',
}).then((ret) => {
  if (ret.token) {
    store.dispatch(getUserDetails(ret.token));
    Actions.main();
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
