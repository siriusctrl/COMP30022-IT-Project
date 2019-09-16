import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, FlatList} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import { Container, Header, Content, Item, Input} from 'native-base';
import Carousel from "react-native-snap-carousel";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


export default class AddMemberGuide extends Component{

  static navigationOptions = {
    header: null
  }


    

  state = {
    
    currentStage: "addMemberInitial",
    currentPurpose: "addMember",
    memberName: "",
    gender: "",
    role: "",
    gen: "",
    familyAccount: null,
  }

  componentDidMount(){

    this.state.gen = this.props.navigation.getParam("gen", "0");
    this.state.familyAccount = this.props.navigation.getParam("familyAccount", null);
  }


  _renderRow = ({item, index}) => {

    let total = this.state.memberArtefactItem.length;

    return (
      <TouchableNativeFeedback style={{... styles.artCard, zIndex: total - index}} background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} onPress={() => {
          this.state.chosenArtefact = item;
          alert(this.state.chosenArtefact.title);
          this._changeStage(false);
        }}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
  }

  par = {
    "memberAddFamily": "Nizaari"
  }

  initialStage = {
    addMember: "addMemberInitial",
  }

  stages = {
    "addMemberInitial": {
      "title": "Add a member to your family",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 75}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18}}>You're adding a member for</Text>
            <Text style={{fontSize: 18, color: colors.ORANGE}}>{this.par.memberAddFamily}'s family</Text>
          </View>
          <View style={{... guideStyle.bottomButtonCn, justifyContent: "flex-end"}}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => {
              alert("cao");
              this._changeStage(false);
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
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18, width: "87%"}}>Write the name without the family name</Text>
            <TextInput placeholder={"Name"} underlineColorAndroid={colors.SILVER} onChangeText={
              (member) => {this._changeText({memberName: member})}
            }
             style={{width: "87%", height: 32, fontSize: 18, marginTop: 23, lineHeight: 26}} />
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>We support any gender you like</Text>
             <TextInput placeholder={"Gender"} underlineColorAndroid={colors.SILVER} onChangeText={
              (gr) => {this._changeText({gender: gr})}
            }
             style={{width: "87%", height: 32, fontSize: 18,  marginTop: 23, lineHeight: 26}} />
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
        "addMember": "addMemberRole",
      },
      "back": {
        "addMember": "addMemberInitial",
      }

    },
    "addMemberRole": {
      "title": "What's the Role?",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{fontSize: 18, width: "87%"}}>The role</Text>
            <TextInput placeholder={"Role"} underlineColorAndroid={colors.SILVER} onChangeText={
              (rl) => {this._changeText({role: rl})}
            }
             style={{width: "87%", height: 32, fontSize: 18, marginTop: 21, lineHeight: 26}} />
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
        "addMember": "addMemberAvatar",
      },
      "back": {
        "addMember": "addMemberNameAndGender",
      }
    },
    "addMemberAvatar": {
      "title": "How does the member look like?",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{fontSize: 18, width: "87%"}}>The role</Text>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>FINISH</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addMember": FINISH,
      },
      "back": {
        "addMember": "addMemberRole",
      }
    },
  }

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


  _finish = (purpose) => {
    alert("finished" + purpose);
  }

  
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