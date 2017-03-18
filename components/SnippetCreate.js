import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snippetUpdate, snippetCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import SnippetForm from './SnippetForm';

class SnippetCreate extends Component {

  onButtonPress() {
    const { title, description, code } = this.props;
    this.props.snippetCreate({ title, description, code });
  }
  render() {
    return (
      <Card>
        <SnippetForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, description, code } = state.snippetForm;
  return { title, description, code };
};

export default connect(mapStateToProps, {
  snippetCreate, snippetUpdate,
})(SnippetCreate);
