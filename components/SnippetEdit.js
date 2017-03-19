import _ from 'lodash';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import SnippetForm from './SnippetForm';
import { snippetUpdate, snippetSave, snippetDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common'

class SnippetEdit extends Component {

  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.snippet, (value, prop) => {
      this.props.snippetUpdate({ prop, value});
    });
  }

  onButtonPress() {
    const { title, code, description, token } = this.props;
    this.props.snippetSave({ code, description, title, token, id: this.props.snippet.id, ispublic:true });
  }

  onAccept() {
    const { id } = this.props.snippet;
    const { token } = this.props;
    this.props.snippetDelete({ id, token })
  }

  onDecline() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <Card>
        <SnippetForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            FireEmployee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you wnat to delete this?
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { id, title, code, description } = state.snippetForm;
  const { token } = state.auth;
  return { title, code, description, token };
}

export default connect(mapStateToProps, {
  snippetUpdate, snippetDelete, snippetSave,
})(SnippetEdit);
