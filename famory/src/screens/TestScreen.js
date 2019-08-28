import React, {Component} from "react";
import { View , Alert} from "react-native";
import { Avatar } from "react-native-elements";
import ImageButton from "../components/ImageButton";
import cxk from "../assets/images/logo.png"

export default class TestScreen extends Component{
  static navigationOptions = {
    header: null
  };

  _handler = () =>{
    Alert.alert("Now it connected");
  }

  render(){
    return(
      <View style={{justifyContent:"center"}}>
        <Avatar icon={{name:"home", type:"font-awesome"}} rounded size={"medium"}/>
      </View>
    );
  }
};