import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon } from 'react-native-elements'
import { Container, Header, Content, Item, Input } from 'native-base';

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
    currentStage: "addMemberNameAndGender",
    currentPurpose: "addMember",
    memberName: "",
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
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 18, width: "87%"}}>Write the name without the family name</Text>
            <TextInput placeholder={"Name"} underlineColorAndroid={colors.SILVER} onChangeText={
              (memberName) => {this._changeText(memberName)}
            }
             style={{width: "87%", height: 32, fontSize: 18, marginTop: 23, lineHeight: 26}} />
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>We support any gender you like</Text>
             <TextInput placeholder={"Gender"} underlineColorAndroid={colors.SILVER} onChangeText={
              (memberName) => {this._changeText(memberName)}
            }
             style={{width: "87%", height: 32, fontSize: 18,  marginTop: 23, lineHeight: 26}} />
          </View>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
            <TouchableNativeFeedback>
              <Text style={{height: 42, width: 82, textAlign: "center", textAlignVertical: "center", color: colors.DODGER_BLUE, fontSize: 16}}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ]

    }
  }

  _changeStage(stageName){
    this.setState(
      {
        ... this.state,
        currentStage: stageName,
      }
    );
  }

  _changeText = (memberName) => {
    this.setState(
      {
        ... this.state,
        memberName: memberName
      }
    );

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
