import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SnippetList from './components/SnippetList';
import SnippetCreate from './components/SnippetCreate';
import SnippetEdit from './components/SnippetEdit';
import TabExample from './components/TabExample';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>

      <Scene key="tab">
        <Scene key="tab-list" component={TabExample} title="Tab Navigation" />
      </Scene>

      <Scene key="auth" initial>
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.snippetCreate()}
          rightTitle="Add"
          key="snippetList"
          component={SnippetList}
          title="Snippets"
          initial
        />
        <Scene key="snippetCreate" component={SnippetCreate} title="Create Snippet" />
        <Scene key="snippetEdit" component={SnippetEdit} title="Edit Snippet" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
