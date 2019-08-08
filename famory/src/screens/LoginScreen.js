import React, {Component} from "react";
import { Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import BoxTextInput from "../components/BoxTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../config/colors";
import strings from "../config/strings";

class LoginScreen extends Component{
  state = {
    email:"",
    password:"",
  }

  handleEmailChanges = (email) => {
    this.setState({email : email});
  }

  handlePasswordChanges = (password) => {
    this.setState({password : password});
  }

  handleLoginPress = () => {
    Alert.alert("Login Pressed with 0.5 opacity");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo}/>
        <KeyboardAvoidingView behavior={"padding"} style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.form}>
            <BoxTextInput
              value={this.state.Email}
              onChangeText={this.handleEmailChanges}
              placeholder={strings.EMAIL_PLACEHOLDER}
              keyboardType = {"email-address"}
            />

            <BoxTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChanges}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              secureTextEntry={true}
              returnKeyType="send"
            />
            
            <Button
              label={strings.LOGIN}
              onPress={this.handleLoginPress}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    flex: 1,
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  }
});

export default LoginScreen;
