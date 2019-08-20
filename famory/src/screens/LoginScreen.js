import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, CheckBox} from "react-native";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import Empty from "../components/Empty";

import darkimg from "../assets/images/dark.png";
import Glass from "../assets/icons/glass";
import Mail from "../assets/icons/mail";
import PwdLock from "../assets/icons/pwdlock";


export default class LoginScreen extends Component{
  static navigationOptions = {
    header: null
  }
  
  state = {
    email:"",
    password:"",
    checked: false
  };


  handleEmailChanges = (email) => {
    this.setState({email : email});
  }

  handlePasswordChanges = (password) => {
    this.setState({password : password});
  }

  handleLoginPress = () => {
    Alert.alert("Login Pressed with 0.5 opacity");
  }

  handleCheckBox = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
  }

  render() {
    const glass = Glass(styles.logo);
    const mail = Mail(styles.mail);
    const pwdlock = PwdLock(styles.lock);
    return (
      <ImageBackground source={darkimg} style={styles.background}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>

        <View style={styles.logo}>{glass}</View>
        
        <View style={styles.form}>
          <Text  style={{fontSize:20, marginTop:20, marginBottom:5}}>
          {"\n"}Log into your account{"\n"}
          </Text>

          <View style={{width: "98%", paddingLeft: 16, paddingRight: 16, overflow: "visible"}}>

            <View style={{flexDirection: 'row'}}>
              <Mail style={styles.mail}>{mail}</Mail>
              <FormTextInput
                value={this.state.Email}
                onChangeText={this.handleEmailChanges}
                placeholder={strings.EMAIL_PLACEHOLDER}
                keyboardType={"email-address"}
                returnKeyType="next"
                autoCorrect={false}
                style={{flex:1, paddingHorizontal: 10}}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <PwdLock style={styles.lock}>{pwdlock}</PwdLock>
              <FormTextInput
                value={this.state.password}
                onChangeText={this.handlePasswordChanges}
                placeholder={strings.PASSWORD_PLACEHOLDER}
                secureTextEntry={true}
                returnKeyType= "done"
                style={{flex:1, paddingHorizontal: 10}}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, justifyContent:"space-between"}}>
              <CheckBox
                value = { this.state.checked }
                onChange = { this.handleCheckBox }
                style={{width: 12, height: 12, marginTop: 3}}
              />
              <Text>
                Keep me signed in
              </Text>
              <Empty/>
              <Empty/>
              <Empty/>
              <Empty/>
              <Text>
                {"\n"}{"\n"}
              </Text>
            </View>
            
            <Button
              label={strings.LOGIN}
              onPress={this.handleLoginPress}
              extraStyles={{width: "100%", marginTop: 6}}
            />
          </View>
      </View>

      <View style={{margin:30}}>
        <Text style={{color:colors.WHITE}}>
          {"\n"}
          Forgot Your Password?
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
    resizeMode: "cover",
  },
  logo: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom:40
  },
  mail: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
    marginRight: 11,
  },
  lock: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
    marginRight: 12,
    marginLeft: 2
    
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    opacity: 0.95,
    paddingHorizontal:"3%",
    paddingVertical:"5%",
  },
  icon: {
    padding: 10,
    marginTop:15,
    marginRight:10,
    marginLeft:5,
    height: 15,
    width: 15,
    alignItems: 'center',
  },
});
