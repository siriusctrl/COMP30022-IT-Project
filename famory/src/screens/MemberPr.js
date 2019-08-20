import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";

import imageLogo from "../assets/images/glass.png";
import backgroundimg from "../assets/images/Back.png"
import iconMail from "../assets/images/icon-mail.png";

export default class MemberPr extends Component{
  static navigationOptions = {
    header: null
  }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.DODGER_BLUE}}>
            <Text>the profile page</Text>
        </View>
        <View style={{width: 250, height: 250, position: "absolute", backgroundColor: colors.LIGHTBLUE}}></View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
