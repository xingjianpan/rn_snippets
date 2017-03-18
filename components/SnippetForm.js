import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { snippetUpdate } from '../actions';
import { CardSection, Input } from './common';

class SnippetForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Title"
            placeholder="Title"
            value={this.props.title}
            onChangeText={value => this.props.snippetUpdate({ prop: 'title', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Description"
            placeholder="Description"
            value={this.props.description}
            onChangeText={value => this.props.snippetUpdate({ prop: 'description', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Code"
            placeholder="Code"
            value={this.props.code}
            onChangeText={value => this.props.snippetUpdate({ prop: 'code', value })}
          />
        </CardSection>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { title, description, code } = state.snippetForm;
  return { title, description, code };
};

export default connect(mapStateToProps, { snippetUpdate })(SnippetForm);
