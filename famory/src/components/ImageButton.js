import React from "react";
import {StyleSheet, TouchableHighlight, Alert, Image} from "react-native";
import { Avatar } from "react-native-elements";
import cxk from "../assets/images/logo.png"

export default class ImageButton extends React.Component{

  _handleButtonPressed = () =>{
    Alert.alert("No Action Defined");
  }

  render(){
    const { imageSource, onPressHandler, name, ...otherProps} = this.props;
    return(
      <Avatar
        size="medium"
        rounded
        title={name?name:"CXK"}
        onPress={onPressHandler?onPressHandler:this._handleButtonPressed}
        activeOpacity={0.7}
        source={imageSource}
      />
    );
  }
}