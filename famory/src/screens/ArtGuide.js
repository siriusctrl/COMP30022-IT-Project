import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../config/colors";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


export default class ArtGuide extends Component{

  static navigationOptions = {
    header: null
  }

  render(){
    return(
      <View>
        <TouchableNativeFeedback>
          <Text>click</Text>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
