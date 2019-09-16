import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, FlatList} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import { Container, Header, Content, Item, Input} from 'native-base';
import Carousel from "react-native-snap-carousel";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


export default class ArtefactGuide extends Component{

  static navigationOptions = {
    header: null
  }

  state = {
    
    currentStage: "addArtefactFromNewInitial",
    currentPurpose: "addNewArtefact",
  }

  initialStage = {
    addNewArtefact: "addArtefactFromNewInitial"
  }

  stages = {
    
    "addArtefactFromNewInitial": {
      "title": "Adding new artefact",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18, width: "87%"}}>You are adding a new artefact to "family Member here"</Text>
            
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addNewArtefact": "",
      },
      "back": {
        "addNewArtefact": "",
      }

    },
    
  }

  // for change the state,
  // back == true then back
  _changeStage(back){
    let now = "next";
    if (back) {
      now = "back";
    }

    ge = this.stages[this.state.currentStage][now][this.state.currentPurpose]

    if(ge && ge != FINISH){
        this.setState(
          {
            ... this.state,
            currentStage: ge,
          }
        );
    }else if(ge == FINISH){
      this._finish(this.state.currentPurpose);
    }else{
      alert("WHAT STAGE NEXT?");
    }
  }


  // after finish, just fill this.FINISH to the "next" stage
  _finish = (purpose) => {
    alert("finished" + purpose);
  }

  // change text, give a object and the update specific text
  _changeText = (te) => {
    this.setState(
      {
        ... this.state,
        ... te
      }
    );

  }


  render(){
    return(
      <View style={{flexDirection: "column", flex: 1}}>

        <View style={{paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <Icon name='clear' />
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={{paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16}}>
            <Text style={{flex: 1, width: "85%", textAlignVertical: "bottom", fontSize: 32, color: colors.HOMESCREENLIGHTBLUE}}>{this.stages[this.state.currentStage]["title"]}</Text>
          </View>
          {this.stages[this.state.currentStage]["view"]}
        </View>
      </View>
    )
  }
}

const FINISH = "finish";

const guideStyle = StyleSheet.create(
  {
    bottomButton: {
      height: 58, 
      width: 82, 
      textAlign: "center", 
      textAlignVertical: "center", 
      color: colors.DODGER_BLUE, 
      fontSize: 16
    },
    bottomButtonCn: {
      paddingHorizontal: 12, 
      paddingBottom: 26, 
      flex: 1, 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center"
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tContainer: {
    backgroundColor: colors.HOMESCREENLIGHTBLUE,
    width: "100%",
    height: 158,
    elevation: 8,
    zIndex: 2,
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  artCard: {
    width: "100%",
    height: 350,
    borderRadius: 6
  },
  artCardDisplay: {
    borderRadius: 6,
    elevation: 16,
    flex: 6
  }
});