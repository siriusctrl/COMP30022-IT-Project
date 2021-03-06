import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Container, ListItem, Left, Body, Right } from 'native-base';
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton, SlideAnimation } from 'react-native-popup-dialog';

import Homeicon from "../assets/icons/homeicon";
import Calendar from "../assets/icons/calendar";
import Achievement from "../assets/icons/achievement";
import Setting from "../assets/icons/setting";
import Accountmail from "../assets/icons/accountmail";
import Leave from "../assets/icons/leave";

import { FamilyAccountModelManage } from "../controller/FamilyAccountModel";
import colors from "../config/colors";

import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation';
import { _pickImage, _uploadItem } from "../controller/fileUtilitiesSync";


export default class AccountHoldScreen extends Component {

  // navigation header here
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Account',
      headerStyle: {
        backgroundColor: colors.FAMORYBLUE,
        height: 46,
      },

      headerTintColor: colors.WHITE,

      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.WHITE,
        paddingLeft: 74,
        flex: 1,
      },
    };
  };

  // state to store the information of family name, date of creation and account avatar
  // state to control pop up menu and spinner
  state = {
    familyName: "",
    dateCreated: "",
    contactVisible: false,
    accountAvatar: null,
    spinner: true,
  };

  // get account family name, date of Creation and avatar
  getAccount = async () => {
    await FamilyAccountModelManage.getInstance().getFamilyAccount((familyAccount) => {

      this.setState({
        familyName: familyAccount.name,
        dateCreated: familyAccount.dateCreated,
        accountAvatar: familyAccount.avatar,
      })
    });
  };

  // update page
  // loading spinner before loading the information of page
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

  // function for log out
  // After click log out button, navigate to Welcome page and clear stacks
  handleLogOutPress = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  // upload image from local system and update firebase
  _uploadAccountAvatar = async () => {

    // get image
    let result = await _pickImage();

    // update local state
    if (!result.cancelled) {
      this.state.accountAvatar = result.uri;
      this.forceUpdate();
      _uploadItem(result, (uri) => {
        console.log(uri);
        FamilyAccountModelManage.getInstance().setPhoto(() => {}, uri);
      });
    }
  };

  render() {

    if (this.state.spinner === true) return (
      <Spinner
        visible={this.state.spinner}
        cancelable={false}
        overlayColor={"rgba(0, 0, 0, 0)"}
        color={colors.FAMORYBLUE}
        size={'large'}
      />
    );

    return (

      <Container style={{flexDirection: "column", alignItems: "center"}}>

        <View style={{alignItems: "center", paddingVertical: 6}}>
          <View style={styles.photoContainer}>
            <Spinner
              visible={this.state.spinner}
              cancelable={false}
              overlayColor={"rgba(0, 0, 0, 0)"}
              color={colors.FAMORYBLUE}
              size={'large'}
            />
            {(this.state.accountAvatar == null) ? null : (
              <Image source={{uri: this.state.accountAvatar}}  style={styles.avatar} />
            )}
          </View>
          <Text style={{fontSize: 15, color: colors.PHOTOBLUE, marginBottom: 20}} onPress={this._uploadAccountAvatar}>
            Change Account Photo
          </Text>

        </View>

        <View style={{paddingHorizontal: 8, width: "100%"}}>
            
          <Text style={{fontSize: 14, color: colors.SILVER, marginLeft: 16, marginBottom: 2}}>DETAIL</Text>

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

          <View style={styles.separators} />
          <Text style={{fontSize: 14, color: colors.SILVER, marginLeft: 16, marginBottom: 2}}>ACTION</Text>

          <ListItem icon noBorder onPress={() => {this.props.navigation.navigate("ForgetPassword")}}>
            <Left>
              <Setting title = "setting" style={{marginLeft: 3}} />
            </Left>
            <Body>
            <Text style={{fontSize: 16, marginLeft: 3}}>Reset Password</Text>
            </Body>

          </ListItem>

          <ListItem icon noBorder onPress={() => {this.setState({ contactVisible: true });}}>

            <Left>
              <Accountmail title = "mail" style={{marginLeft: 3}} />
            </Left>

            <Body>
            <Text style={{fontSize: 16, marginLeft: 3}}>Contact Support</Text>
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
                    style={{color: colors.LIGHTBLUE}}
                  />
                </DialogFooter>
              }
            >
              <DialogContent>
                <Text style={styles.contactText}>Name: <Text style={{color: colors.PHOTOBLUE}}>Miley Zhang</Text></Text>
                <Text style={styles.contactText}>E-mail: <Text style={{color: colors.PHOTOBLUE}}>mileyzha@gmail.com</Text></Text>
              </DialogContent>
            </Dialog>
          </ListItem>

        </View>
        <View style={{paddingHorizontal: 8, width: "100%"}}>
          <ListItem icon noBorder onPress={this.handleLogOutPress}>
            <Left>
              <Leave style={{marginLeft: 6}}/>
            </Left>
            <Body>
              <Text style={{fontSize: 16}}>Log Out</Text>
            </Body>

          </ListItem>
          
        </View>

      </Container>
    );
  }
}

// styles here
const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
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
    borderColor: colors.WHITE,
  },
  contactText: {
    fontSize: 17,
    marginTop: 15,
    marginLeft: 10,
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
  photoContainer: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
});