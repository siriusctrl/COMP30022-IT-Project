import React, { Component } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView, ImageBackground, ToastAndroid } from "react-native";
import firebaseConfig from "../controller/firebaseConfig";
import firebase from "firebase";
import {validate} from "email-validator";
import { StackActions, NavigationActions } from 'react-navigation';
import AlertPro from "react-native-alert-pro";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import Spinner from 'react-native-loading-spinner-overlay';

import darkimg from "../assets/images/dark.png"

import colors from "../config/colors";
import Glass from "../assets/icons/glass";
import Mail from "../assets/icons/mail";


export default class ForgetPasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    email: "",
    wrongEmail: null,
    verifying: false,
    errorMessage:"",
  }

  componentDidMount() {
    firebaseConfig.getInstance().justStart();
  }

  handleEmailChanges = (email) => {
    this.setState({ email: email });
  }

  _goBack = () => {
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  _resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  _sendingReseatEmail = (ins) => {
    ins.setState({ verifying: true });
    firebase.auth().sendPasswordResetEmail(ins.state.email, null)
    .then(() => {
      ins.setState({ verifying: false });

      ToastAndroid.showWithGravity(
        'Email has been sent',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

      ins._resetStack();
    })
    .catch((error) => {
      ins.setState({ verifying: false , errorMessage: error.message });
      ins.AlertPro.open();
    });
  }

  handleSendPress = () => {
    this.setState({ wrongEmail : null });

    if (this.state.email.length === 0){
      // NOTE : this only for testing purpose, it actually does not need alert here
      this.setState({ wrongEmail: "Email Cannot be Empty!", errorMessage: "Email Cannot be Empty!"});
      this.AlertPro.open();
    } else if (!validate(this.state.email)) {
      this.setState({ wrongEmail: "Invalid Email", email: "", errorMessage: "Invalid Email" });
      this.AlertPro.open();
    } else {
      this._sendingReseatEmail(this);
    }
  }

  render() {
    const glass = Glass(styles.logo);
    const mail = Mail(styles.mail);

    return (
      <ImageBackground source={darkimg} style={styles.background}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          
          <View style={styles.logo}>{glass}</View>
          <View style={styles.form}>
            <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 5 }}>
              {"\n"}Create New Account{"\n"}
            </Text>

            <View style={{ width: "98%", paddingLeft: 16, paddingRight: 16, overflow: "visible" }}>
              <View style={{ flexDirection: 'row' }}>
                <Mail style={styles.mail}>{mail}</Mail>
                <FormTextInput
                  value={this.state.email}
                  onChangeText={this.handleEmailChanges}
                  placeholder={this.state.wrongEmail ? this.state.wrongEmail:"Email"}
                  placeholderTextColor={this.state.wrongEmail ? colors.TORCH_RED : null}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={{ flex: 1, paddingHorizontal: 10 }}
                />
              </View>

              <Button
                label="Send"
                onPress={this.handleSendPress}
                extraStyles={{ width: "100%", marginTop: 10 }}
              />

            </View>
          </View>

        </KeyboardAvoidingView>
        <Spinner
          visible={this.state.verifying}
          textContent={'Verifying...'}
          textStyle={{ color: "#FFF" }}
        />

        <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          onCancel={() => this.AlertPro.close()}
          showConfirm={false}
          title="Email Error"
          textCancel="Ok"
          message={this.state.errorMessage}
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
