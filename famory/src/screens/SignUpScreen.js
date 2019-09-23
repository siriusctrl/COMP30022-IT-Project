import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback, Linking} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../controller/firebaseConfig";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import Spinner from 'react-native-loading-spinner-overlay';

import darkimg from "../assets/images/dark.png"

import colors from "../config/colors";
import strings from "../config/strings";
import Glass from "../assets/icons/glass";
import Mail from "../assets/icons/mail";
import PwdLock from "../assets/icons/pwdlock";
import Person from "../assets/icons/person";

import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { validate } from "email-validator";

export default class SignUpScreen extends Component{
  static navigationOptions = {
    header: null,
  }

  state = {
    email:"",
    password:"",
    familyName:"",
    registering: false,
    wrongEmail: false,
  }

  componentDidMount(){
    firebaseConfig.getInstance().justStart();
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
    Linking.openURL('https://www.websitepolicies.com/policies/view/aa0q7EH6');
  }

  handlePolicyPress = () => {
    Linking.openURL('https://famory.flycricket.io/privacy.html');
  }
  
  // NOTE : does not handle the familyName
  _createUserWithEmail = (ins) => {
    ins.setState({registering: true});
    firebase.auth().createUserWithEmailAndPassword(ins.state.email, ins.state.password)
    .then(() => {
      ins.setState({registering: false});
      ins.props.navigation.navigate("Login");
    })
    .catch(function(error) {
      ins.setState({registering: false, email:"", password:""});
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else if (errorCode === "auth/invalid-email") {
        alert('Invalid Email');
      } else if (errorCode === "auth/email-already-in-use") {
        alert("This email has already in used, please login or try another one");
      } else {
        alert(errorMessage);
      }
    });
  }

  handleSignUpPress = () => {
    if (validate(this.state.email)){
      this._createUserWithEmail(this);
    } else {
      this.setState({email:"", wrongEmail:true});
    }
  }

  render() {
    const glass = Glass(styles.logo);
    const mail = Mail(styles.mail);
    const pwdlock = PwdLock(styles.logo);
    const person = Person(styles.logo);

    return (
      <ImageBackground source={darkimg} style={styles.background}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>

        <View style={styles.logo}>{glass}</View>
        <View style={styles.form}>
          <Text  style={{fontSize:20, marginTop:20, marginBottom:5}}>
          {"\n"}Create New Account{"\n"}
          </Text>

          <View style={{width: "98%", paddingLeft: 16, paddingRight: 16, overflow: "visible"}}>
            <View style={{flexDirection: 'row'}}>
              <Person style={styles.person}>{person}</Person>
              <FormTextInput
              value={this.state.familyName}
              onChangeText={this.handleFamilyNameChanges}
              placeholder={strings.FAMILYNAME_PLACEHOLDER}
              returnKeyType= "next"
              style={{flex:1, paddingHorizontal: 10}}
            />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Mail style={styles.mail}>{mail}</Mail>
              <FormTextInput
                value={this.state.Email}
                onChangeText={this.handleEmailChanges}
                placeholder={this.state.wrongEmail?"Invalid Email":"Email"}
                placeholderTextColor={this.state.wrongEmail?colors.TORCH_RED:null}
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

            <View style={{flex: 1}}>
              <BarPasswordStrengthDisplay
                password={this.state.password}
                width={220}
                barColor={colors.BAR}
                marginLeft={-30}
                minLength={4}
              />
            </View>
            
            <Button
              label={strings.SIGNUP}
              onPress={this.handleSignUpPress}
              extraStyles={{width: "100%", marginTop: 40}}
            />
          </View>
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
    <Spinner
        visible={this.state.registering}
        textContent={'Signing you in...'}
        textStyle={{color:"#FFF"}}
      />
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
  person: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
    marginRight: 11,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
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
