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
      <View style={{justifyContent:"center", alignItems:"center", paddingTop:"50%"}}>
        <Avatar icon={{name:"more-horiz", type:"material"}} rounded size={"medium"}/>
      </View>
    );
  }
};