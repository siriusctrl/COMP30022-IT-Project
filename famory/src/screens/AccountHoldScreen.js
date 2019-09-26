import React, { Component } from 'react';
import {TouchableHighlight, StyleSheet, Image, Alert, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch, Separator } from 'native-base';
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton, SlideAnimation } from 'react-native-popup-dialog';

import strings from "../config/strings";
import Button from "../components/Button";

import Homeicon from "../assets/icons/homeicon";
import Calendar from "../assets/icons/calendar";
import Achievement from "../assets/icons/achievement";
import Setting from "../assets/icons/setting";
import Accountmail from "../assets/icons/accountmail";

import { AccountModelManage } from "../controller/AccountModel";
import colors from "../config/colors";
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation';


export default class AccountHoldScreen extends Component {

  // navigation header here
  static navigationOptions = {
    title: 'Account',
    headerStyle: {
      backgroundColor: '#4E91C4',
    },

    headerTitleStyle: {
      fontWeight: 'bold',
      marginLeft:90,
      flex: 1,
    },
    headerTintColor: '#FFFFFF',

  };

  // state to control pop up menu
  state = {
    familyName: "",
    dateCreated: "",
    contactVisible: false,
    securityVisible: false,
    accountAvatar: null,
    spinner: true,
  };

  // update the locking state of badges
  toggleModal = () => {
    this.state.modalVisible = !this.state.modalVisible;
    this.forceUpdate();
  };

  // get account family name and date of Creation
  getAccount = async () => {
    await AccountModelManage.getInstance().getAccount((familyName, dateCreated, avatar) => {
      this.setState({
        familyName: familyName,
        dateCreated: dateCreated,
        accountAvatar: avatar,
      })
    });
  };

  // update page when mount
  async componentDidMount() {
    await this.getAccount();
    await setTimeout(() => {
      this.state.spinner = !this.state.spinner;
      this.forceUpdate();
    }, 1000);
  }

  // navigations to achievement page
  handleAchievementPress = () => {
    this.props.navigation.navigate('Achievement');
  };

  // function for log out, jumps to Welcome page
  handleLogOutPress = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {

    if (this.state.spinner === true) return (
      <Container>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Container>
    );

    return (

      <Container>
        {(this.state.accountAvatar == null) ? null : (
          <Image source={{uri: this.state.accountAvatar}}  style={styles.avatar} />
        )}

        <View>

          <ListItem icon noBorder>
            <Left>
              <Homeicon title="homeicon">
              </Homeicon>
            </Left>
            <Body>
            <Text style={{fontSize: 16}}>Family Name</Text>
            </Body>
            <Right>
              <Text>{this.state.familyName}</Text>
            </Right>
          </ListItem>

          <ListItem icon noBorder>
            <Left>
              <Calendar title = "calender" style={{marginLeft: 3}}>
              </Calendar>
            </Left>
            <Body>
            <Text style={{fontSize: 16, marginLeft: 3}}>Date of Creation</Text>
            </Body>
            <Right>
              <Text>{this.state.dateCreated}</Text>
            </Right>
          </ListItem>

          <ListItem icon noBorder onPress={this.handleAchievementPress}>
            <Left>
              <Achievement title = "achievement" style={{marginLeft: 3}}>
              </Achievement>
            </Left>
            <Body>
            <Text style={{fontSize: 16, marginLeft: 4}}>Achievement</Text>
            </Body>
          </ListItem>

          <View style={styles.separators}></View>

          <ListItem icon noBorder onPress={() => {this.setState({ securityVisible: true });}}>
            <Left>
              <Setting title = "setting" >
              </Setting>
            </Left>
            <Body>
            <Text style={{fontSize: 16}}>Account Security</Text>
            </Body>

            <Dialog
              visible={this.state.securityVisible}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
              dialogTitle={<DialogTitle title="Reset Passwords" />}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="Dismiss"
                    onPress={() => {this.setState({ securityVisible: false });}}
                  />
                  <DialogButton
                    text="Confirm"
                    onPress={() => {this.setState({ securityVisible: false });}}
                  />
                </DialogFooter>
              }
            >
              <DialogContent>
                <Text style={styles.securityText}>New Password</Text>
                <TextInput
                  style={styles.blackText}
                  placeholderTextColor={"#D3D3D3"}
                  maxLength={20}
                  secureTextEntry={true}
                />
                <Text style={styles.securityText}>Confirm Password</Text>
                <TextInput
                  style={styles.blackText}
                  placeholderTextColor={"#D3D3D3"}
                  maxLength={20}
                  secureTextEntry={true}
                />
              </DialogContent>

            </Dialog>

          </ListItem>

          <ListItem icon noBorder onPress={() => {this.setState({ contactVisible: true });}}>

            <Left>
              <Accountmail title = "mail" ></Accountmail>
            </Left>

            <Body>
            <Text style={{fontSize: 16}}>Contact Support</Text>
            </Body>

            <Dialog
              visible={this.state.contactVisible}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
              dialogTitle={<DialogTitle title="Contact Details" />}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="DISMISS"
                    onPress={() => {this.setState({ contactVisible: false });}}
                  />
                </DialogFooter>
              }
            >
              <DialogContent>
                <Text style={styles.contactText}>Name: <Text style={{color: '#347ED3'}}>Miley Zhang</Text></Text>
                <Text style={styles.contactText}>E-mail: <Text style={{color: '#347ED3'}}>mileyzha@gmail.com</Text></Text>
              </DialogContent>
            </Dialog>
          </ListItem>

        </View>
        <View>
          <Button
            title="Log Out"
            label={strings.LOGOUT}
            onPress={this.handleLogOutPress}
            extraStyles={{width: "80%", marginTop: 60, alignSelf: 'center'}}>
          </Button>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 100,
    overflow: "hidden",
  },
  separators: {
    flex:1,
    flexDirection: 'row',
    borderWidth: 7,
    borderColor: "#fff",
  },
  contactText: {
    fontSize: 17,
    marginTop: 15,
    marginLeft: 10,
  },
  modalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 190,
    marginHorizontal: 35,
    backgroundColor: colors.WHITE,
  },
  //jjh
  modalHeader: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height:60,
    marginLeft:-3,
    width:290,
    backgroundColor:"#E5F5FF",
    fontWeight: 'bold',
  },
  modalHeaderText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 14,
    fontSize: 20,
  },
  blackText: {
    marginLeft: 3,
    marginTop:5,
    paddingBottom:4,
    fontSize: 14,
    height: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  },
  securityText: {
    fontSize: 15,
    marginTop: 12,
    marginLeft: 3,
    marginRight: 80,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },

});