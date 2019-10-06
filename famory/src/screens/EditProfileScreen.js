import { Body, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
import CheckMark from "../assets/icons/checkedMark";
import CheckButton from "../components/CheckButton";
import { _pickImage, _uploadItem } from "../controller/fileUtilitiesSync";
import { MemberModelManage } from "../controller/MemberModel";

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
      )
    };

  };

  /*
    use state to record profile information, including first name, last name
    date of birth and profile image
   */
  state = {
    firstName: "",
    lastName: "",
    dob: "",
    image: null,
    imageuploaded: false,
    result: null,
    modalVisible: false,
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
    setTimeout(this.toggleButton, 500);
    setTimeout(this.toggleButton, 2500);
    // upload to firebase storage
    let model = this.props.navigation.state.params.memberModel;
    model.firstName = this.state.firstName;
    model.lastName = this.state.lastName;
    model.dob = this.state.dob;
    if (this.state.imageuploaded) {
      _uploadItem(this.state.result, (firebaseUri) => {
        model.profileImage = firebaseUri;
        MemberModelManage.getInstance().setProfile(() => {
          model.updateSelf((newModel) => {
            this.props.navigation.getParam("profileScreen", null).setModel(newModel)
          });
          //this.props.navigation.goBack();
        }, model);
      });
    } else {
      MemberModelManage.getInstance().setProfile(() => {
        model.updateSelf((newModel) => {
          this.props.navigation.getParam("profileScreen", null).setModel(newModel)
        });
        //this.props.navigation.goBack();
      }, model);
    }

  };

  // toggle modal
  toggleButton = () => {
    this.state.modalVisible = !this.state.modalVisible;
    this.forceUpdate();
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

        <Modal
          style={styles.uploadingModalStyle}
          isVisible={this.state.modalVisible}
          animationIn="fadeInDown"
          animationInTiming={600}
          animationOutTiming={600}
          animationOut="fadeOutUp"
          >
          <View style={styles.modalContainer}>
            <CheckMark />
            <Text style={{fontSize: 20, fontWeight: "normal", textAlign: 'center', textAlignVertical: 'center', marginLeft: 10,}}>
              Successfully Saved
            </Text>
          </View>
        </Modal>

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
  },
  uploadingModalStyle: {
    marginTop: 100,
    marginHorizontal: 30,
    color: "#ffffff",
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: "center",
    marginBottom: 510,
  },
  modalContainer: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    color: "#fff",
    flexDirection: 'row',
  },
});