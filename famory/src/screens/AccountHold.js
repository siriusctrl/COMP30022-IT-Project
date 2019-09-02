import React, { Component } from 'react';
import {StyleSheet, Image, Alert, View, Text, TouchableOpacity} from 'react-native';
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch, Separator } from 'native-base';
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton, SlideAnimation } from 'react-native-popup-dialog';

import strings from "../config/strings";
import Button from "../components/Button";

import Homeicon from "../assets/icons/homeicon";
import Calendar from "../assets/icons/calendar";
import Achievement from "../assets/icons/achievement";
import Setting from "../assets/icons/setting";
import Accountmail from "../assets/icons/accountmail";


export default class AccountHold extends Component {

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#4E91C4',
    },

    headerTitleStyle: {
      fontWeight: 'bold',
      marginLeft:85,
      flex: 1,
    },
    headerTintColor: '#FFFFFF',

  }

  handleLogOutPress = () => {
    this.props.navigation.navigate('Welcome');
  }

  state = {
    visible: false,
  }

  handleAchievementPress = () => {
    this.props.navigation.navigate('Achievement');
  }

  render() {

    return (
      <Container>
        <View>
          <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />

        </View>

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
              <Text>Nizaari</Text>
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
              <Text>07/08/2019</Text>
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

          <ListItem icon noBorder>
            <Left>
              <Setting title = "setting" >
              </Setting>
            </Left>
            <Body>
            <Text style={{fontSize: 16, marginLeft: 3}}>Account & Security</Text>
            </Body>
          </ListItem>

          <ListItem icon noBorder onPress={() => {this.setState({ visible: true });}}>

            <Left>
              <Accountmail title = "mail" ></Accountmail>
            </Left>

            <Body>
              <Text style={{fontSize: 16}}>Contact Support</Text>
            </Body>

            <Dialog
              visible={this.state.visible}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
              dialogTitle={<DialogTitle title="Contact Details" />}
              footer={
                <DialogFooter>
                  <DialogButton style={{color: 'red'}}
                    text="DISMISS"
                    onPress={() => {this.setState({ visible: false });}}
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
    width: "30%",
    resizeMode: "contain",
    alignSelf: "center",
    paddingTop: 10,
    borderRadius: 40,
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
  }

});