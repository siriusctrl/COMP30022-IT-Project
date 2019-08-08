import React, {Component} from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

class BoxTextInput extends Component {
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
          // spread all the other props
          {...otherProps}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    textInput: {
        width:"100%",
        borderRadius: 4,//输入框边界圆角度数
        margin:10,
        paddingLeft: 4,
        borderColor: 'transparent',
        backgroundColor : colors.WHITE,
        padding:0,
        borderWidth: 1,
        alignSelf:'center'//自身居中
    }
  });
  
  export default BoxTextInput;