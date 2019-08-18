import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";

import backgroundimg from "../assets/images/Back.png";
//import SvgComponent from "../assets/icons/glass";


export default class LoginScreen extends Component{
  static navigationOptions = {
    header: null
  }
  
  state = {
    email:"",
    password:"",
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

  render() {
    const component = SvgComponent(styles.logo);
    return (
      <ImageBackground source={backgroundimg} style={styles.background}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>

        <View style={styles.logo}>{component}</View>
        
        <View style={styles.form}>
          <Text  style={{fontSize:20, marginTop:20, marginBottom:5}}>
            Log into your account
          </Text>

          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name={'envelope'} solid style={{paddingTop:15, padding:10, fontSize:20}}/>
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
