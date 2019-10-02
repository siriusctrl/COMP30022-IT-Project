import React, { Component } from 'react';
import {StyleSheet, Image, Alert, View, Text, TextInput, Button} from 'react-native';
import { ListItem, Body } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';

import CheckButton from "../components/CheckButton"
import { MemberModelManage } from "../controller/MemberModel";
import { _pickImage, _uploadItem } from "../controller/fileUtilitiesSync";

export default class EditProfileScreen extends Component {

  // navigation header here
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
          onPress={navigation.getParam('updateProfile')}
          title="Info"
          color="#FFFFFF"
          style={{marginRight: 11}}
        />
      ),
    };

  };

  /*
    use state to record profile information, including first name, last name
    date of birth and profile image.f
   */
  state = {
    firstName: "",
    lastName: "",
    dob: "",
    image: null,
    imageuploaded: false,
    result: null,
  };

  componentDidMount () {
    this.props.navigation.setParams({ updateProfile: this._handleSubmit });
    let model = this.props.navigation.state.params.memberModel;
    if (model) {
      this.setState({
        firstName: model.firstName,
        lastName: model.lastName,
        dob: model.dob,
        image: model.profileImage,
      });
      this.forceUpdate();
    }
  }

  // submit firstName, lastName, date of birth and profile image to the database
  _handleSubmit = async () => {
    // upload to firebase storage
    let model = this.props.navigation.state.params.memberModel;
    model.firstName = this.state.firstName;
    model.lastName = this.state.lastName;
    model.dob = this.state.dob;
    if (this.state.imageuploaded) {
      _uploadItem(this.state.result, (firebaseUri) => {
        model.profileImage = firebaseUri;
        alert(model.profileImage);
        MemberModelManage.getInstance().setProfile(() => {
          model.updateSelf((newModel) => {
            this.props.navigation.getParam("profileScreen", null).setModel(newModel)
          })
          this.props.navigation.goBack();
        }, model);

      });
    } else {
      MemberModelManage.getInstance().setProfile(() => {
        model.updateSelf((newModel) => {
          this.props.navigation.getParam("profileScreen", null).setModel(newModel)
        })
        this.props.navigation.goBack();
      }, model);
    }
  };

  // upload image from local system
  _uploadImage = async () => {

    // get image
    let result = await _pickImage();

    // update local state
    if (!result.cancelled) {
      this.state.imageuploaded = true;
      this.state.image = result.uri;
      this.state.result = result;
      this.forceUpdate();
    }
  };


  render () {

    if (this.state.ready === false) return null;

    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: "center"}}>

          {(this.state.image == null) ? null : (
            <Image source={{uri: this.state.image}}  style={styles.avatar} />
          )}

          <Text style={{fontSize: 15, color: '#347ED3'}} onPress={this._uploadImage}>
            Change Profile Photo
          </Text>
        </View>

        <View>
          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>First Name</Text>
            <TextInput
              style={styles.blackText}
              onChangeText={(text) => this.setState({firstName: text})}
              placeholder={this.props.navigation.state.params.memberModel.firstName}
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
              placeholder={this.props.navigation.state.params.memberModel.lastName}
              placeholderTextColor={"#D3D3D3"}
              maxLength={20}
              value={this.state.text}
            />
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
            <Text style={styles.greyText}>Date of Birth</Text>

            <DatePicker
              style={{width:200, marginTop: 15,}}
              date={this.state.dob}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1900-05-01"
              maxDate="2020-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: 10,
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({dob: date})}}
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
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 60,
    overflow: "hidden",
  },
  greyText: {
    marginLeft: 10,
    marginTop:10,
    fontSize: 18,
    color: "#878B90",
  },
  blackText: {
    marginLeft: 10,
    marginTop:10,
    paddingBottom:4,
    fontSize: 16,
    height: 30,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  }
});