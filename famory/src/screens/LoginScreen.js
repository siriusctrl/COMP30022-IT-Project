import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
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
      <ImageBackground source={imageLogo} style={styles.background}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <Image source={imageLogo} style={styles.logo}/>
        <View style={styles.form}>
          <Text>
            Log into your account
          </Text>

          <FormTextInput
            value={this.state.Email}
            onChangeText={this.handleEmailChanges}
            placeholder={strings.EMAIL_PLACEHOLDER}
            keyboardType={"email-address"}
            returnKeyType="next"
            autoCorrect={false}
          />

          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChanges}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType= "done"
          />
          
          <Button
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
          />
      </View>
      <View style={{margin:30}}>
        <Text>
          This is a bottom warning!
        </Text>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  background:{
    flex:1,
    resizeMode: "center",
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
    alignItems: "center",
    width: "80%",
    backgroundColor: colors.WHITE,
    borderRadius: 15
  }
});

export default LoginScreen;
