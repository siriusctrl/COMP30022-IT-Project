import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import Empty from "../components/Empty";

import Meteor from "../assets/icons/meteor";
import SendMessage from "../assets/icons/sendMessage";

export default class CommunityCommentScreen extends Component {

  static navigationOptions = {
    title: 'Recent Comments',
    headerStyle: {
      backgroundColor: '#E0836B',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
    },
    headerTintColor: '#FFFFFF',
  }

  state = {
    visible: false,
  }

  render() {

    return (
      <View style={styles.container}>
 
        <View style={styles.RectangleShapeView}>
          <Text>Hello!!!</Text>
        </View>
        <Empty/>
        <Empty/>
        <Empty/>
        <Empty/>
        <View style={{ flex: 1, justifyContent: 'center', width: "100%", flexDirection: "row"}}>
          <Meteor style={{marginTop: 8}}></Meteor>
          <LinearGradient 
          colors={['#E2E2E2', '#F4F3F3']} 
          style={styles.LinearGradientStyle}
          start={[0.1, 0.9]}
          end={[0.9,0.1]}
          >
  
            <View style={styles.ChildViewStyle}>

              <TextInput
                placeholder="Write a comment..."
                underlineColorAndroid='transparent'
                multiline
                style={styles.TextInputStyleClass}
              />
              <SendMessage style={styles.SendMessage}></SendMessage>
            </View>
                  
          </LinearGradient>
        </View>
 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "95%",
    marginLeft: 9,
    marginTop: 10,
  },
  RectangleShapeView: {
    justifyContent: "center",
    height: 380,
    borderColor: "#C9C7C7",
    borderRadius: 17,
    borderWidth: 2,
  },
  LinearGradientStyle: {
    width: '80%',
    height: 45,
    borderRadius: 25,
    marginLeft: 15,
    flexDirection: "row",
  },
  ChildViewStyle:{
    height: 45,
    borderRadius: 25,
    padding: 5,
  },
  TextInputStyleClass:{
    flex: 1,
    height: 45,
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 0.6,
    borderRadius: 25,
  },
  SendMessage: {
    marginTop: 5,
    marginLeft: 10,
  },
});