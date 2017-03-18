import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Card, CardSection, Button } from './common';

const SnippetDetail = ({ snippet }) => {
  const { title, description, code, highlight } = snippet;
  const { headerContentStyle, headerTextStyle } = styles;
  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}> {title}</Text>
        </View>
      </CardSection>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}> {description}</Text>
        </View>
      </CardSection>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}> {code}</Text>
        </View>
      </CardSection>
      <CardSection>
        <Button onPress={() => Linking.openURL(highlight)}>
          Highlight
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 18,
  },
};

export default SnippetDetail;
