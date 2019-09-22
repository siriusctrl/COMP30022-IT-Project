import React, {Component} from "react";
import { Text, StyleSheet, View , KeyboardAvoidingView, ImageBackground, Modal} from "react-native";
import {Overlay} from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import Empty from "../components/Empty";

import darkimg from "../assets/images/dark.png";
import Glass from "../assets/icons/glass";
import Mail from "../assets/icons/mail";
import PwdLock from "../assets/icons/pwdlock";

import {CheckBox} from 'native-base';
import firebase from "firebase";
import firebaseConfig from "../controller/firebaseConfig";


export default class LoginScreen extends Component{
  // hide navigation header
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
  };

  componentDidMount() {
    firebaseConfig.getInstance().justStart();
  }

  verifyEmail = async (email, pwd, ins) => {
    ins.setState({verifying: true});
    firebase.auth().signInWithEmailAndPassword(email, pwd)
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
    this.verifyEmail(this.state.email, this.state.password, this);
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
        <Text style={{color:colors.WHITE}}>
          {"\n"}
          Forgot Your Password?
        </Text>
      </View>

    </KeyboardAvoidingView>

    {/* <Overlay fullScreen={true} overlayStyle={{color:colors.BLACK, opacity:0.2}} isVisible={this.state.verifying}>
      <Text style={{alignSelf:"center", color:colors.TORCH_RED}}>
        loading!
      </Text>
    </Overlay> */}
      <Spinner
        visible={this.state.verifying}
        textContent={'Verifying...'}
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
