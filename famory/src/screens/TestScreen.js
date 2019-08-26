import React, {Component} from "react";
import { View , Alert} from "react-native";
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
      <View>
        <ImageButton imageSource={cxk} onPressHandler={this._handler}/>
      </View>
    );
  }
};