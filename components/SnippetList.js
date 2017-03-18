import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, ScrollView } from 'react-native';
import { fetchList } from '../actions';
import SnippetDetail from './SnippetDetail';
import ListItem from './ListItem';

class SnippetList extends Component {
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

  componentWillUnmount() {
    // console.log('will unmount');
    this.props.resetList();
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


  // renderSnippetList() {
  //   return this.props.snippets.map(snippet =>
  //     <SnippetDetail snippet={snippet} key={snippet.id} />,
  //   );
  // }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }


  // render() {
  //   return (
  //     <View>
  //       <ScrollView>
  //         {this.renderSnippetList()}
  //       </ScrollView>
  //     </View>
  //   );
  // }
}

const mapStateToPros = (state) => {
  const snippets = _.map(state.snippet_list.snippets, (val, uid) => {
    return { ...val, uid };
  });
  return {
    snippets,
  };
};

export default connect(mapStateToPros, { fetchList })(SnippetList);

