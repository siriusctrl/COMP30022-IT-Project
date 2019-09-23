import React, { Component } from "react";
import { Text, Image, StyleSheet, View, Alert, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback, Linking } from "react-native";
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

import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

export default class ForgetPasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    email: "",
    password: "",
    familyName: "",
    passwordCheck: "",
    registering: false,
    resetCode: "",
    verifying: false,
  }

  componentDidMount() {
    firebaseConfig.getInstance().justStart();
  }

  handleEmailChanges = (email) => {
    this.setState({ email: email });
  }

  handleCheckChanges = (passwordCheck) => {
    this.setState({ passwordCheck: passwordCheck });
  }

  handlePasswordChanges = (password) => {
    this.setState({ password: password });
  }

  handleResetCodeChange = (resetCode) => {
    this.setState({ resetCode: resetCode });
  }

  handleTermsPress = () => {
    Linking.openURL('https://www.websitepolicies.com/policies/view/aa0q7EH6');
  }

  handlePolicyPress = () => {
    Linking.openURL('https://famory.flycricket.io/privacy.html');
  }

  _confirmPWDChange = async (ins) => {
    firebase.auth.confirmPasswordReset(ins.state.resetCode, ins.state.password)
    .then(()=>{
      ins.setState({ verifying : false });
      alert("reset successfully");
    })
    .catch((error) =>{
      ins.setState({ verifying: false });
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === "auth/expired-action-code"){
        alert("The code has expire, please resent a new email to get a new code");
      } else if (errorCode === "auth/invalid-action-code") {
        alert("invalid code");
      } else if (errorCode === "auth/user-not-found"){
        alert("Please try another email or sign up");
      } else if (errorCode === "auth/weak-password") {
        alert("Weak password is not allowed");
      }
    });
  }

  _sendingReseatEmail = async (ins) => {
    ins.setState({ verifying: true });
    firebase.auth.sendPasswordResetEmail(ins.state.email, null)
    .then(() => {
      ins.setState({ verifying: false });
      alert("email has been sent");
    })
    .catch((error) => {
      ins.setState({ verifying: false });
      alert(error.message);
    });
  }

  handleResetPress = () => {
    if (this.state.password !== this.state.passwordCheck){
      this.setState({password: "", passwordCheck: ""});
      alert("You must enter the same password in both block!");
    } else {
      ins.setState({ verifying : true });
      this._confirmPWDChange(this);
    }
  }

  handleSendPress = () => {
    if (this.state.email.length === 0){
      alert("Email should not be empty");
    } else {
      this._sendingReseatEmail(this);
    }
  }

  render() {
    const glass = Glass(styles.logo);
    const mail = Mail(styles.mail);
    const pwdlock = PwdLock(styles.logo);

    return (
      <ImageBackground source={darkimg} style={styles.background}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          
          <View style={styles.logo}>{glass}</View>
          <View style={styles.form}>
            <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 5 }}>
              {"\n"}Create New Account{"\n"}
            </Text>

            <View style={{ width: "98%", paddingLeft: 16, paddingRight: 16, overflow: "visible" }}>
              <View style={{ flexDirection: 'row' }}>
                <Mail style={styles.mail}>{mail}</Mail>
                <FormTextInput
                  value={this.state.email}
                  onChangeText={this.handleEmailChanges}
                  placeholder="Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={{ flex: 1, paddingHorizontal: 10 }}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Glass style={styles.glass}>{glass}</Glass>
                <FormTextInput
                  value={this.state.resetCode}
                  onChangeText={this.handleResetCodeChange}
                  placeholder="Reset Code"
                  returnKeyType="next"
                  style={{ flex: 1, paddingHorizontal: 10 }}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <PwdLock style={styles.lock}>{pwdlock}</PwdLock>
                <FormTextInput
                  value={this.state.password}
                  onChangeText={this.handlePasswordChanges}
                  placeholder="password"
                  returnKeyType="next"
                  secureTextEntry={true}
                  style={{ flex: 1, paddingHorizontal: 10 }}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <PwdLock style={styles.lock}>{pwdlock}</PwdLock>
                <FormTextInput
                  value={this.state.passwordCheck}
                  onChangeText={this.handleCheckChanges}
                  placeholder="enter password again"
                  secureTextEntry={true}
                  returnKeyType="done"
                  style={{ flex: 1, paddingHorizontal: 10 }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <BarPasswordStrengthDisplay
                  password={this.state.password}
                  width={220}
                  barColor={colors.BAR}
                  marginLeft={-30}
                  minLength={4}
                />
              </View>

              <Button
                label="Send"
                onPress={this.handleSendPress}
                extraStyles={{ width: "100%", marginTop: 40 }}
              />

              <Button
                label="Reset"
                onPress={this.handleResetPress}
                extraStyles={{ width: "100%", marginTop: 40 }}
              />
            </View>
          </View>

          <View style={{ margin: 30, alignItems: "center" }}>
            <Text style={{ color: colors.WHITE }}>
              By creating an account, you accept Famory's
        </Text>

            <Text style={{ color: colors.WHITE }}>
              <TouchableWithoutFeedback onPress={this.handleTermsPress}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Terms of Service
                </Text>
              </TouchableWithoutFeedback>

              {" "} and {" "}

              <TouchableWithoutFeedback onPress={this.handlePolicyPress}>
                <Text style={{ textDecorationLine: 'underline' }}>
                  Privacy Policy
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>

        </KeyboardAvoidingView>
        <Spinner
          visible={this.state.verifying}
          textContent={'Verifying...'}
          textStyle={{ color: "#FFF" }}
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
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    width: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 40
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
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  icon: {
    padding: 10,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 5,
    height: 15,
    width: 15,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
