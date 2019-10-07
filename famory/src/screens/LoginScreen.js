import React, {Component} from "react";
import { Text, StyleSheet, View , KeyboardAvoidingView, Dimensions} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import {validate} from "email-validator";
import AlertPro from "react-native-alert-pro";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import Empty from "../components/Empty";

import { Video } from 'expo-av';
import Glass from "../assets/icons/glass";
import Mail from "../assets/icons/mail";
import PwdLock from "../assets/icons/pwdlock";
import background from "../assets/videos/background.mp4"

import { CheckBox } from 'native-base';
import firebase from "firebase";
import firebaseConfig from "../controller/firebaseConfig";


export default class LoginScreen extends Component{

  static navigationOptions = {
    header: null
  }
  
  state = {
    email:"",
    password:"",
    wrongEmail:false,
    wrongPwd:false,
    checked: false,
    verifying: false,
    errorTitle:"",
    errorMessage:"",
  };

  componentDidMount() {
    firebaseConfig.getInstance().justStart();
  }

  _verifyEmail = async (ins) => {
    ins.setState({verifying: true});

    firebase.auth().signInWithEmailAndPassword(ins.state.email, ins.state.password)
    .then(() => {
      ins.setState({verifying:false});
      ins.props.navigation.navigate("HomePage");
    })
    .catch((error) => {
      ins.setState({verifying:false});
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        ins.setState({password:"", wrongPwd:true});
      } else if (errorCode === "auth/invalid-email"){
        alert('Invalid email');
        ins.setState({email:"", password:"", wrongEmail:true});
      } else {
        alert(errorMessage);
      }
    });
  }

  handleEmailChanges = (email) => {
    this.setState({email : email});
  }

  handlePasswordChanges = (password) => {
    this.setState({password : password});
  }
  
  handleLoginPress = () => {
    if (this.state.email.length === 0){
      this.setState({ errorTitle:"Email Error", errorMessage:"Email Should not be empty" });
      this.AlertPro.open();
    } else if (validate(this.state.email)){
      this._verifyEmail(this);
    } else {
      this.setState({email : "", wrongEmail:true});
    }
  }

  handleCheckBox = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
  }

  render() {
    const glass = Glass(styles.logo);
    const mail = Mail(styles.mail);
    const pwdlock = PwdLock(styles.lock);
    return (
      <View style={styles.background}>
        <Video
          source={background}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          useNativeControls={false}
          isLooping={true}
          shouldPlay={true}
          style={{position: "absolute", bottom: 0, left: 0, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width}}></Video>
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
                  placeholder={this.state.wrongEmail?"Invalid Email":strings.EMAIL_PLACEHOLDER}
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
                  placeholder={this.state.wrongPwd?"Wrong Password":strings.PASSWORD_PLACEHOLDER}
                  placeholderTextColor={this.state.wrongPwd?colors.TORCH_RED:null}
                  secureTextEntry={true}
                  returnKeyType= "done"
                  style={{flex:1, paddingHorizontal: 10}}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: 10, justifyContent:"space-between"}}>
                <CheckBox
                  onPress = { this.handleCheckBox }
                  checked={this.state.checked}
                  style={{marginLeft: -10}}
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
        <Text style={{ color: colors.WHITE, textDecorationLine: 'underline'}} onPress={() => {this.props.navigation.navigate("ForgetPassword")}}>
          {"\n"}
          Forgot Your Password?
        </Text>
      </View>

    </KeyboardAvoidingView>
      <Spinner
        visible={this.state.verifying}
        textContent={'Verifying...'}
        textStyle={{color:"#FFF"}}
      />

      <AlertPro
        ref={ref => {
          this.AlertPro = ref;
        }}
        onCancel={() => this.AlertPro.close()}
        showConfirm={false}
        title={this.state.errorTitle}
        textCancel="Ok"
        message={this.state.errorMessage}
      />
      </View>
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
    zIndex: 0
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
    borderRadius: 26,
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
