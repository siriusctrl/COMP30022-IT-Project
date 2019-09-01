import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon } from 'react-native-elements'

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


export default class ArtGuide extends Component{

  static navigationOptions = {
    header: null
  }

  par = {
    "memberAddFamily": "Nazaari"
  }

  purpose = {
    addMember: "addMember"
  }

  state = {
    currentStage: "addMemberInitial",
    currentPurpose: "addMember"
  }

  stages = {
    "addMemberInitial": {
      "title": "Add a member to your family",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 75}}>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 18}}>You're adding a member for</Text>
            <Text style={{fontSize: 18, color: colors.ORANGE}}>{this.par.memberAddFamily}'s family</Text>
          </View>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
            <TouchableNativeFeedback onPress={() => {
              alert("cao");
              this._changeStage("addMemberNameAndGender");
            }}>
              <Text style={{height: 42, width: 82, textAlign: "center", textAlignVertical: "center", color: colors.DODGER_BLUE, fontSize: 16}}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addMember": "addMemberNameAndGender"
      }
    },
    "addMemberNameAndGender": {
      "title": "What's the Name and Gender?",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 75}}>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 18}}>You're adding a member for</Text>
            <Text style={{fontSize: 18, color: colors.ORANGE}}>{this.par.memberAddFamily}'s family</Text>
          </View>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
            <TouchableNativeFeedback onPress={() => this._changeStage("addMemberNameAndGender")}>
              <Text style={{height: 42, width: 82, textAlign: "center", textAlignVertical: "center", color: colors.DODGER_BLUE, fontSize: 16}}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ]

    }
  }

  _changeStage(stageName){
    this.state = {
        currentStage: stageName,
        currentPurpose: this.state.currentPurpose
    };
    this.forceUpdate();
  }

  render(){
    return(
      <View style={{padding: 26, flexDirection: "column", flex: 1}}>

        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <Icon name='clear' />
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={{flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16}}>
            <Text style={{flex: 1, width: "85%", textAlignVertical: "bottom", fontSize: 32, color: colors.HOMESCREENLIGHTBLUE}}>{this.stages[this.state.currentStage]["title"]}</Text>
          </View>
          {this.stages[this.state.currentStage]["view"]}
        </View>
      </View>
    )
  }
}
