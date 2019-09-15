import React, {Component} from "react";
import { View , Alert, Text} from "react-native";
import Modal from "react-native-modal";
import { Avatar } from "react-native-elements";
import ImageButton from "../components/ImageButton";
import cxk from "../assets/images/logo.png"
import colors from "../config/colors";
import Button from "../components/Button";

clock = {uri:"https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/post-5.jpg?alt=media&token=025a8387-8f63-4196-bce1-a44fee70047b"};


export default class TestScreen extends Component{
  static navigationOptions = {
    header: null
  };

  state = {
    isModalVisible: false
  };

  render() {
    return (
      <View>
        <ImageButton
            name={" "}
            imageSource={clock}
            boarderColor={colors.TORCH_RED}
        />

        <Avatar
          size="medium"
          rounded
          title={" "}
          source={clock}
          overlayContainerStyle={{padding:2}}
          placeholderStyle={{backgroundColor:colors.BLACK}}
        />
      </View>
    );
  }
};