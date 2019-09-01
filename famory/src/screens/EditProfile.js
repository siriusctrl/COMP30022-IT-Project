import React, { Component } from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import { Container, Header, Content, ListItem, Text, Icon, Left, Body, Right, Switch, View, Separator } from 'native-base';

import strings from "../config/strings";
import CheckButton from "../components/CheckButton"


export default class EditProfile extends Component {

  static navigationOptions = {
    title: 'Edit Profile',
    headerStyle: {
      backgroundColor: '#4E91C4',
    },

    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
    },
    headerTintColor: '#FFFFFF',
    headerRight: (
      <CheckButton
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#FFFFFF"
        style={{marginRight: 11}}
      ></CheckButton>
    ),
  }

  render () {
    return (
      <Container>
        <View>
          <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />

        </View>



      </Container>
    );

  }


}




const styles = StyleSheet.create({
  avatar: {
    width: "30%",
    resizeMode: "contain",
    alignSelf: "center",
    paddingTop: 10,
    borderRadius: 40,
  },
});