import React, { Component } from 'react';
import {StyleSheet, Image, Alert, View, Text, TextInput} from 'react-native';
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch, Separator } from 'native-base';

import strings from "../config/strings";
import CheckButton from "../components/CheckButton"
import Homeicon from "./AccountHold";


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
  constructor(props) {
    super(props);
    this.state = { text: 'Nazarri' };
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: "center", }}>
          <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />
          <Text style={{fontSize: 14, color: '#347ED3'}}>Change Profile Photo</Text>
        </View>

        <View>
          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>First Name</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>Last Name</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>Date of Birth</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            </Body>
          </ListItem>
        </View>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  avatar: {
    width: "25%",
    resizeMode: "contain",
    alignSelf: "center",
    paddingTop: 10,
    borderRadius: 40,
    overflow: "hidden",
  },
  greyText: {
    marginLeft: 10,
    marginTop:10,
    fontSize: 16,
    color: "#878B90",
  },
  blackText: {
    marginLeft: 10,
    marginTop:10,
    paddingBottom:4,
    fontSize: 15,
    height: 30,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  }
});