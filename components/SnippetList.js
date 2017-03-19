import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text, StyleSheet } from 'react-native';
import Tabs from 'react-native-tabs';
import { fetchList } from '../actions';
import ListItem from './ListItem';
import { Actions } from 'react-native-router-flux';
class SnippetList extends Component {

  state = {page: 'second'};

  componentWillMount() {
    this.props.fetchList();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ snippets }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(snippets);
  }

  renderRow(snippet) {
    return <ListItem snippet={snippet} />;
  }

  onButtonPress() {
    Actions.snippetCreate()
  }
  render() {
    return (
      <View>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <View style={styles.container}>
          <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="first">First</Text>
            <Text name="second" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
            <Text name="fifth" onPress={this.onButtonPress.bind(this)}>Fifth</Text>

          </Tabs>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
const mapStateToPros = (state) => {
  const snippets = _.map(state.snippet_list.snippets, (val, uid) => {
    return { ...val, uid };
  });
  return {
    snippets,
  };
};

export default connect(mapStateToPros, { fetchList })(SnippetList);

