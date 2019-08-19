import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import colors from "../config/colors";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Empty from "./Empty";

export default class IconButtonWithText extends Component {
    render() {
      const { label, onPress, extraStyles, extraTextStyles, nameOfIcon, ...otherProps} = this.props;
      //Alert.alert(extraStyles);
      return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.container, extraStyles,]} onPress={onPress}>
          <Empty/>
          <Text style={[styles.text, extraTextStyles]}> 
            {label} 
          </Text>
          <FontAwesome5 name={nameOfIcon} size={20} color={colors.WHITE} {...otherProps}/>
          <Empty/>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.LIGHTBLUE,
        marginTop: 12,
        borderRadius: 10,
        elevation: 8,
        width: "80%",
        flexDirection:"row",
    },
    text: {
        color: colors.WHITE,
        textAlign: "center",
        height: 20,
    }
});