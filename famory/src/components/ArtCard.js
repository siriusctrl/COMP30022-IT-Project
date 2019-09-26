import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import { Icon } from 'react-native-elements'
import colors from "../config/colors";

import { TouchableNativeFeedback } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel";
import * as VideoThumbnails from 'expo-video-thumbnails';

const getAssetImagePath = (imagePh) => {
  return ("../assets/images/" + imagePh)
};

export default class ArtCard extends Component{

  _vidDefault = "https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/vid.png?alt=media&token=63f6561c-1eec-43a8-9ec6-f8c0bc8fb8f8"

  static navigationOptions = {
    header: null,
  }

  state = {
    vidCover: "",
  }

  gettingCover = false;

  async getCover(vidUri){
    if(!this.gettingCover){
      let vidCover = await VideoThumbnails.getThumbnailAsync(
        vidUri, {time: 0}
      )
      this.gettingCover = true;
      this.setState({vidCover: vidCover.uri});
    }
  }

  _renderContent(type, content){

    if (type == "image"){
      return (<Image source={{uri: content}} style={{flex: 1}}/>)
    }else if(type == "video"){
      if(!this.gettingCover){
        this.getCover(content)
      }
      if (this.state.vidCover != ""){
        return (<Image source={{uri: this.state.vidCover}} style={{flex: 1}}/>)
      }else{
        return (<Image source={{uri: this._vidDefault}} style={{flex: 1}}/>)
      }
    }else{
      return
    }
  }

  height = 350;

  render(){
    backgroundColorArtefact = {
      "text": ["#FFE2C2", "#AC8E6D", "#6F5E4C", "#FFECD8", "mailunread"],
      "image": ["#faf1e8", "#AC8E6D", "#6F5E4C", "#FFECD8", "photo"],
      "video": ["#fae8e8", "#926161", "#663C3C", "#FFDCDC", "videocam"],
    }

    let {item} = this.props;
    let mainColor = backgroundColorArtefact[item["type"]][0];
    let fontColor = backgroundColorArtefact[item["type"]][1];
    this.height = this.props.cardHeight ? this.props.cardHeight: 350;
    let numberOfLines = this.props.numberOfLines ? this.props.numberOfLines : 9;

    return (
      <View style={{backgroundColor: mainColor, ... cardStyle.cardContainer, ... this.props.style, borderColor: mainColor}}>
        <View style={{flex: 4}}>
          {this._renderContent(item["type"], item["content"])}
          {item["type"] == "video"? 
            <View style={{position: "absolute", bottom: 0, zIndex: 6}}>
              <Icon name="videocam" color={colors.SILVER} size={56} style={{position: "absolute"}}></Icon>
            </View>:[]
          }
        </View>
        <View style={{width: "100%", backgroundColor: mainColor, flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: fontColor, fontSize: 23}}>{item["name"]}</Text>
          <Text style={{color: fontColor}}>{item["description"]}</Text>
        </View>
      </View>
    )
  }
}

const cardStyle = StyleSheet.create(
  {
    cardContainer: {flexDirection: "column", overflow: "hidden", minHeight: 350, borderRadius: 0, borderWidth: 17, borderBottomWidth: 0}
  }
)