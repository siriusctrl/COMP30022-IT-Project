import React from "react";
import {StyleSheet, TouchableHighlight, Alert, Image} from "react-native";
import { Avatar } from "react-native-elements";

export default class ImageButton extends React.Component{

  _handleButtonPressed = () =>{
    Alert.alert("No Action Defined");
  }

  render(){
    const { imageSource, onPressHandler,...otherProps} = this.props;
    return(
      <Avatar
        size="large"
        rounded
        title="LW"
        onPress={onPressHandler?onPressHandler:this._handleButtonPressed}
        activeOpacity={0.7}
        source={imageSource}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageContainer:{
    borderWidth:1,
    backgroundColor:"transparent",
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:25
  }
});