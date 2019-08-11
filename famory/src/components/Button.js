import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../config/colors";

class Button extends Component {
    render() {
      const { label, onPress } = this.props;
      return (
        <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={onPress}>
          <Text style={styles.text}> {label} </Text>
        </TouchableOpacity>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.ORANGE,
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)",
        width: "80%",
    },
    text: {
        color: colors.WHITE,
        textAlign: "center",
        height: 20
    }
});

export default Button;