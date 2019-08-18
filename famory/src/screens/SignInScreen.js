import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback} from "react-native";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";

import imageLogo from "../assets/images/glass.png";
import backgroundimg from "../assets/images/Back.png"
import iconMail from "../assets/images/icon-mail.png";

import colors from "../config/colors";
import strings from "../config/strings";

class SignInScreen extends Component{
  static navigationOptions = {
    header: null
  }
  
  state = {
    email:"",
    password:"",
    familyName:"",
  }

  handleEmailChanges = (email) => {
    this.setState({email : email});
  }

  handlePasswordChanges = (password) => {
    this.setState({password : password});
  }

  handleFamilyNameChanges = (familyName) => {
      this.setState({familyName: familyName});
  }

  handleTermsPress = () => {
    Alert.alert("No Terms Now");
  }

  handlePolicyPress = () => {
    Alert.alert("No Policy Now");
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
          <Text  style={{fontSize:20, marginTop:20, marginBottom:5}}>
            Create New Account
          </Text>

          <FormTextInput
            value={this.state.familyName}
            onChangeText={this.handleFamilyNameChanges}
            placeholder={strings.FAMILYNAME_PLACEHOLDER}
            returnKeyType= "next"
          />

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

      <View style={{margin:30, alignItems:"center"}}>
        <Text style={{color:colors.WHITE}}>
          By creating an account, you accept Famory's
        </Text>

        <Text style={{color:colors.WHITE}}>
            <TouchableWithoutFeedback onPress={this.handleTermsPress}>
                <Text style={{textDecorationLine: 'underline'}}>
                    Terms of Service
                </Text>
            </TouchableWithoutFeedback>

            {" "} and {" "}

            <TouchableWithoutFeedback onPress={this.handlePolicyPress}>
                <Text style={{textDecorationLine: 'underline'}}>
                    Privacy Policy
                </Text>
            </TouchableWithoutFeedback>
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
    paddingVertical:"5%",
  },
  icon: {
    padding: 10,
    marginTop:15,
    marginRight:10,
    marginLeft:5,
    height: 15,
    width: 15,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});

export default SignInScreen;
