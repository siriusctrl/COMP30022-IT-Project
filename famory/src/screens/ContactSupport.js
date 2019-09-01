import React, { Component } from "react";
import { Container, Header, Content, Textarea, Form } from "native-base";
import Text from "react-native-web/src/exports/Text";

export default class TextArea extends Component {
  static navigationOptions = {
    title: 'Contact Support',
    headerStyle: {
      backgroundColor: '#4E91C4',
    },

    headerTitleStyle: {
      fontWeight: 'bold',
      marginLeft:40,
      flex: 1,
    },
    headerTintColor: '#FFFFFF',

  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Textarea" />
          </Form>
        </Content>

        <Button primary><Text>Send</Text></Button>
      </Container>
    );
  }
}