import React from "react";
import {StyleSheet, TouchableHighlight, Alert, Image} from "react-native";
import { Avatar } from "react-native-elements";
import colors from "../config/colors";

export default class ImageButton extends React.Component{

  _handleButtonPressed = () =>{
    Alert.alert("No Action Defined");
  }

  render(){
    const { imageSource, onPressHandler, name, showEditButton, boarderColor, ...otherProps} = this.props;
    //alert(boarderColor);
    return(
      <Avatar
        size="medium"
        rounded
        title={name?name:" "}
        onPress={onPressHandler?onPressHandler:this._handleButtonPressed}
        activeOpacity={0.7}
        source={imageSource}
        overlayContainerStyle={{padding:2, backgroundColor: boarderColor?boarderColor:colors.TORCH_RED}}
        showEditButton={showEditButton==null?true:false}
        {... otherProps}
      />
    );
  }
}