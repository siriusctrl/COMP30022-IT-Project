import React, { Component } from 'react';
import {StyleSheet, Image, Alert, View, Text, TextInput, Button} from 'react-native';
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch, Separator } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DatePicker from 'react-native-datepicker';

import strings from "../config/strings";
import CheckButton from "../components/CheckButton"
import Homeicon from "./AccountHold";

const userProfile = {
  firstName: 'Tom',
  lastName: 'Ford',
  dob: '1997/1/1',
};

export default class EditProfile extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
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
          onPress={navigation.getParam('increaseCount')}
          title="Info"
          color="#FFFFFF"
          style={{marginRight: 11}}
        ></CheckButton>
      ),
    };

  };

  state = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    dob: userProfile.dob,
    image: null,
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    alert(this.state.dob + "," + this.state.lastName + "," + this.state.firstName);
  };


  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: "center", }}>
          <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />
          <Text style={{fontSize: 14, color: '#347ED3'}} onPress={this._pickImage}>Change Profile Photo
        </Text>
        </View>

        <View>
          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>First Name</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({firstName: text})}
              placeholder={userProfile.firstName}
              placeholderTextColor={"#D3D3D3"}
              maxLength={20}
              value={this.state.text}
            />
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>Last Name</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({lastName: text})}
              placeholder={userProfile.lastName}
              placeholderTextColor={"#D3D3D3"}
              maxLength={20}
              value={this.state.text}
            />
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>Date of Birth</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({dob: text})}
              placeholder={userProfile.dob}
              placeholderTextColor={"#D3D3D3"}
              maxLength={20}
              value={this.state.text}
            />
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            </Body>
          </ListItem>
        </View>

      </View>
    );

  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
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