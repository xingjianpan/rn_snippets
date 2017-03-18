// import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { fetchList } from '../actions';
import { PUBLIC_SNIPPETS_URL } from '../services/api';
import SnippetDetail from './SnippetDetail';

class SnippetList extends Component {
  componentDidMount() {
    this.props.fetchList(PUBLIC_SNIPPETS_URL);
  }

  componentWillUnmount() {
    // console.log('will unmount');
    this.props.resetList();
  }

  renderSnippetList() {
    return this.props.snippets.map(snippet =>
      <SnippetDetail snippet={snippet} key={snippet.id} />,
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.renderSnippetList()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToPros = (state) => {
  const { snippets, isLoading, hasErrored,
          nextHref, prevHref,
          isInfiniteLoading, hasMoreToLoad,
        } = state.snippet_list;
  return {
    isLoading,
    snippets,
    hasErrored,
    nextHref,
    prevHref,
    isInfiniteLoading,
    hasMoreToLoad,
  };
};

export default connect(mapStateToPros, { fetchList })(SnippetList);

