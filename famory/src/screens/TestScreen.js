import firebaseConfig from "../controller/firebaseConfig";
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import firebase from "firebase";

export default class TestScreen extends Component {
  state = {
    verify: "not now",
  }

  async componentDidMount() {
    firebaseConfig.getInstance().justStart();
    //await this.verifyEmail("testing@gmail.com", "123456", this);
  }
  
  verifyEmail = (email, pwd, ins) => {
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

  _sendingReseatEmail = (ins) => {
    ins.setState({ verify:"processing" });
    firebase.auth.sendPasswordResetEmail("xinyaon@student.unimelb.edu.au", null)
      .then(() => {
        ins.setState({ verify: "yes" });
        alert("email has been sent");
      })
      .catch((error) => {
        ins.setState({ verify: error.code });
        alert(error.message);
      });
  }

  run(){
    this._sendingReseatEmail(this);
  }
  
  render(){
    return(
      <TouchableOpacity style={{backgroundColor:"red", alignItems:"center",  width:"50%", height:30}} activeOpacity={0.7} onPress={this._run}>
        <Text style={{textAlign:"center"}}>
          {this.state.verify}
        </Text>
      </TouchableOpacity>
    );
  }
}