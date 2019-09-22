import firebaseConfig from "../controller/firebaseConfig";
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import firebase from "firebase";

export default class TestScreen extends Component {
  state = {
    vary: "not now",
  }

  async componentDidMount() {
    firebaseConfig.getInstance().justStart();
    //await this.verifyEmail("testing@gmail.com", "123456", this);
  }
  
  verifyEmail = async (email, pwd, ins) => {
    firebase.auth().signInWithEmailAndPassword(email, pwd)
    .then(() => {
      ins.state.vary = "hell";
      ins.forceUpdate();
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    });
  }

  async run(){
    await this.verifyEmail("testing@gmail.com", "123456", this);
  }
  
  render(){
    return(
      <TouchableOpacity style={{backgroundColor:"red", alignItems:"center",  width:"50%", height:30}} activeOpacity={0.7} onPress={() => {this.run()}}>
        <Text style={{textAlign:"center"}}>
          {this.state.vary}
        </Text>
      </TouchableOpacity>
    );
  }
}