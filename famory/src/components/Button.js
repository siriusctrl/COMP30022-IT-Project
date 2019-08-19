import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import colors from "../config/colors";

class Button extends Component {
    render() {
      const { label, onPress, extraStyles, ...otherProps} = this.props;
      //Alert.alert(extraStyles);
      return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.container, extraStyles,]} onPress={onPress} {...otherProps}>
          <Text style={styles.text}> {label} </Text>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.LIGHTBLUE,
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 8,
        width: "80%",
    },
    text: {
        color: colors.WHITE,
        textAlign: "center",
        height: 20
    }
});

export default Button;