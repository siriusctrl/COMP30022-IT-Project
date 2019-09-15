import React from "react";
import {StyleSheet, Alert, Image, ImageBackground, View} from "react-native";
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
        overlayContainerStyle={{padding:2, backgroundColor: boarderColor?boarderColor:colors.TORCH_RED}}
        // showEditButton={showEditButton==null?true:false}
        ImageComponent={() => { 
          return(
            <View style={{height:"100%", width:"100%"}}>
              <Image source={imageSource} style={{height:"80%", width:"100%", flex:1, borderRadius:40}}/>
            </View>
          );}
        }
        {... otherProps}
      />
    );
  }
}