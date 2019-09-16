import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import { Icon } from 'react-native-elements'
import colors from "../config/colors";

import { TouchableNativeFeedback } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel";

const getAssetImagePath = (imagePh) => {
  return ("../assets/images/" + imagePh)
};

export default class ArtCard extends Component{

  static navigationOptions = {
    header: null
  }

  _renderContent(type, content){



    if (type == "image"){
      return (<Image source={{uri: content}} style={{flex: 1}}/>)
    }else{
      return
    }
  }

  height = 350;

  render(){
    backgroundColorArtefact = {
      "text": ["#FFE2C2", "#AC8E6D", "#6F5E4C", "#FFECD8", "mailunread"],
      "image": ["#FFE2C2", "#AC8E6D", "#6F5E4C", "#FFECD8", "photo"],
      "video": ["#FDD2D2", "#926161", "#663C3C", "#FFDCDC", "videocam"],
    }

    let {item} = this.props;
    this.height = this.props.cardHeight ? this.props.cardHeight: 350;
    let numberOfLines = this.props.numberOfLines ? this.props.numberOfLines : 9;

    return (
      <View style={{backgroundColor: backgroundColorArtefact[item["type"]][0], flexDirection: "column", overflow: "hidden", minHeight: 350, ... this.props.style, borderRadius: 0, borderWidth: 17, borderBottomWidth: 0, borderColor: colors.WHITE}}>
        <View style={{flex: 4}}>
          
          {this._renderContent(item["type"], item["content"])}
        </View>
        <View style={{width: "100%", backgroundColor: colors.WHITE, flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: backgroundColorArtefact[item["type"]][1], fontSize: 23}}>{item["name"]}</Text>
          <Text style={{color: backgroundColorArtefact[item["type"]][1]}}>{item["description"]}</Text>
        </View>
      </View>
    )
  }
}