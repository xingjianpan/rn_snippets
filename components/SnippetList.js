import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { View, Text } from 'react-native';
import { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad, resetList } from '../actions';

const SnippetList = () => {
  return (
    <View>
      <Text>sdf</Text>
    </View>
  )
}


const mapStateToPros = (state) => {
  const { snippets, isLoading, hasErrored,
          nextHref, prevHref,
          isInfiniteLoading, hasMoreToLoad,
        } = state.snippet_list;
  const { isActive, message, action } = state.notifications;

  return {
    isLoading,
    snippets,
    hasErrored,
    nextHref,
    prevHref,
    isActive,
    message,
    action,
    isInfiniteLoading,
    hasMoreToLoad,
  };
};

export default connect(mapStateToPros,
  { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad, resetList })(SnippetList);

