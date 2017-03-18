import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SnippetList from './components/SnippetList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>


      <Scene key="main">
        <Scene
          key="snippetList"
          component={SnippetList}
          title="snippets"
          initial
        />
      </Scene>

      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
