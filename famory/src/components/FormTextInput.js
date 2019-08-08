import React, {Component} from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

class FormTextInput extends Component {
    render() {
      // We define our own custom style for the TextInput, but
      // we still want to allow the developer to supply its
      // own additional style if needed.
      // To do so, we extract the "style" prop from all the
      // other props to prevent it to override our own custom
      // style.
      const { style, ...otherProps } = this.props;
      return (
        <TextInput
          selectionColor={colors.DODGER_BLUE}
          // Add the externally specified style to our own
          // custom one
          style={[styles.textInput, style]}
          // ...and then spread all the other props
          {...otherProps}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    textInput: {
      height: 40,
      borderColor: colors.SILVER,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20
    }
  });
  
  export default FormTextInput;