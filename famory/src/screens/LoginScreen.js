import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import BoxTextInput from "../components/BoxTextInput";

import imageLogo from "../assets/images/glass.png";
import backgroundimg from "../assets/images/Back.png"
import logo from "../assets/images/glass.svg";
import iconMail from "../assets/images/icon-mail.png";

import colors from "../config/colors";
import strings from "../config/strings";
import SvgUri from 'react-native-svg-uri';

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
      <ImageBackground source={backgroundimg} style={styles.background}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>

        <Image source={imageLogo} style={styles.logo}/>
        
        <View style={styles.form}>
          <Text  style={{fontSize:20, marginBottom:5}}>
            Log into your account
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Image source={iconMail} style={styles.icon}/>
            <FormTextInput
              value={this.state.Email}
              onChangeText={this.handleEmailChanges}
              placeholder={strings.EMAIL_PLACEHOLDER}
              keyboardType={"email-address"}
              returnKeyType="next"
              autoCorrect={false}
              style={{flex:1}}
            />
          </View>

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
        <Text style={{color:colors.WHITE}}>
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
    justifyContent: "center",
  },
  background:{
    flex:1,
    resizeMode: "center",
  },
  logo: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom:40
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    opacity: 0.95,
    paddingHorizontal:"5%",
    paddingTop:"25%",
  },
  icon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});

export default LoginScreen;
