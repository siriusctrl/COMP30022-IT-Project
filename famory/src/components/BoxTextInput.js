import React, {Component} from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

class BoxTextInput extends Component {
    render() {
      const { style, ...otherProps } = this.props;

      return (
        <TextInput
          selectionColor={colors.DODGER_BLUE}
          // Add the externally specified style to our own
          // custom one
          style={[styles.textInput, style]}
          // spread all the other props
          {...otherProps}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    textInput: {
        width:"100%",
        borderRadius: 4,
        margin:10,
        paddingLeft: 4,
        //borderColor: 'transparent',
        borderColor: colors.BLACK,
        backgroundColor : colors.WHITE,
        padding:0,
        borderWidth: 1,
        alignSelf:'center',
        height: "18%"
    }
  });
  
  export default BoxTextInput;