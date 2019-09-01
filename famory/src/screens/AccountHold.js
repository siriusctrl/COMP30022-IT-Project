import React, { Component } from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import { Container, Header, Content, ListItem, Text, Icon, Left, Body, Right, Switch, View, Separator } from 'native-base';

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
    Alert.alert("LogOut Pressed with 0.5 opacity");
  }

  render() {

    return (
      <Container>
        <View>
          <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />

        </View>

        <View>

          <ListItem icon>
            <Left>
              <Homeicon
                title="homeicon"
              >
              </Homeicon>
            </Left>
            <Body>
            <Text>Family Name</Text>
            </Body>
            <Right>
              <Text>Nizaari</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Calendar title = "calender" >
              </Calendar>
            </Left>
            <Body>
            <Text>Date of Creation</Text>
            </Body>
            <Right>
              <Text>07/08/2019</Text>
            </Right>
          </ListItem>
          <Separator>

          </Separator>
          <ListItem icon>
            <Left>
              <Achievement title = "achievement">
              </Achievement>
            </Left>
            <Body>
            <Text>Achievement</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>Settings</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Setting title = "setting" >
              </Setting>
            </Left>
            <Body>
            <Text>Account & Security</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Accountmail title = "mail" >
              </Accountmail>
            </Left>
            <Body>
            <Text>Contact Support</Text>
            </Body>
          </ListItem>

        </View>
        <View>
          <Button
            title="Log Out"
            label={strings.LOGOUT}
            onPress={this.handleLogOutPress}
            extraStyles={{width: "80%", marginTop: 50, alignSelf: 'center'}}>
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
});