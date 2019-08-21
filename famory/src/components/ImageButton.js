import React from "react";
import {StyleSheet, Text, TouchableHighlight, Alert, Image} from "react-native";

export default class ImageButton extends React.Component{
  render(){
    return(
      <TouchableHighlight style={styles.imageContainer}>
        <Image/>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer={
    borderWidth:1,
    backgroundColor:"transparent",
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    borderRadius:50
  }
});