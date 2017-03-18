import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SnippetDetail from './SnippetDetail';

class ListItem extends Component {
  onRowPress() {
    Actions.snippetEdit({ employee: this.props.employee });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <SnippetDetail snippet={this.props.snippet} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
