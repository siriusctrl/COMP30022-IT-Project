import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, FlatList, Button, DatePickerAndroid} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import { Container, Header, Content, Item, Input} from 'native-base';
import FamilyAccountModelManage from "../controller/FamilyAccountModel"
import MemberModelManage from "../controller/MemberModel"
import DateTimePicker from '@react-native-community/datetimepicker';
import Carousel from "react-native-snap-carousel";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


// guide page for adding a member
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
    memberAddFamily: "Nizaari",
    showPicker: true,
    lastName: "",
    dateBirth: (new Date()),
    finishedAdd: false,

  }

  componentDidMount(){
    // get generation and family account
    this.state.gen = this.props.navigation.getParam("gen", "0");
    this.state.familyAccount = this.props.navigation.getParam("familyAccount", null);

    if (this.state.familyAccount == null){
      FamilyAccountModelManage.getInstance().getFamilyAccount(
        (familyModel) => {
          this.setState(
            {familyAccount: familyModel}
          )
        }
      )
    }
  }

  initialStage = {
    addMember: "addMemberInitial",
  }

  nativeRipple = TouchableNativeFeedback.Ripple(colors.MISCHKA, true)

  setDate = (event, date) => {
    this.setState({
      dateBirth: date
    });
  }

  getStringDate = (date) => {
    return date.toDateString().slice(4)
  }

  stages = {
    "addMemberInitial": {
      "title": "Add a member to your family",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 75}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18}}>
              You're adding a member for
            </Text>
            <Text style={{fontSize: 18, color: colors.ORANGE}}>
              {this.state.familyAccount.name}'s family
            </Text>
          </View>
          <View style={{... guideStyle.bottomButtonCn, justifyContent: "flex-end"}}>
            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => {this._changeStage(false);}}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberName"
      }
    },
    "addMemberName": {
      "title": "What's the Name?",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18, width: "87%"}}>
              First name and middle name
            </Text>
            <TextInput 
              placeholder={"Name"} 
              underlineColorAndroid={colors.SILVER} 
              onChangeText={
                (member) => {this._changeText({memberName: member})}
              }
             style={{width: "87%", height: 32, fontSize: 18, marginTop: 23, lineHeight: 26}} />
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>
              What's the Last Name?
             </Text>
             <TextInput 
             placeholder={this.state.memberAddFamily} 
             underlineColorAndroid={colors.SILVER} 
             onChangeText={
              (lastName) => {this._changeText({lastName: lastName})}
            }
             style={{width: "87%", height: 32, fontSize: 18,  marginTop: 23, lineHeight: 26}} />
          </View>
          <View style={guideStyle.bottomButtonCn}>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberGender",
      },
      "back": {
        "addMember": "addMemberInitial",
      }

    },
    "addMemberGender": {
      "title": "What's the Gender?",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>
              We support any gender you like
             </Text>
             <TextInput 
             placeholder={"Gender"} 
             underlineColorAndroid={colors.SILVER} 
             onChangeText={
              (gr) => {this._changeText({gender: gr})}
            }
             style={{width: "87%", height: 32, fontSize: 18,  marginTop: 23, lineHeight: 26}} />
          </View>
          <View style={guideStyle.bottomButtonCn}>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberBirthday",
      },
      "back": {
        "addMember": "addMemberName",
      }

    },
    "addMemberBirthday": {
      "title": "What's the Birthday?",
      "view": ()=>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>
              Member's Birthday
             </Text>
             <Button onPress={async () => {
               try {
                  const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: this.state.dateBirth,
                  });

                  if (action !== DatePickerAndroid.dismissedAction){
                    this.setState({
                      dateBirth: (new Date(year, month, date=day))
                    })
                  }
                 
                } catch ({code, message}) {
                  console.warn('Cannot open date picker', message);
                }
             }} title={this.getStringDate(this.state.dateBirth)}></Button>
          </View>
          <View style={guideStyle.bottomButtonCn}>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberRole",
      },
      "back": {
        "addMember": "addMemberGender",
      }

    },
    "addMemberRole": {
      "title": "What's the Role?",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{fontSize: 18, width: "87%"}}>The role</Text>
            <TextInput placeholder={"Role"} underlineColorAndroid={colors.SILVER} onChangeText={
              (rl) => {this._changeText({role: rl})}
            }
             style={{width: "87%", height: 32, fontSize: 18, marginTop: 21, lineHeight: 26}} />
          </View>
          <View style={guideStyle.bottomButtonCn}>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberAvatar",
      },
      "back": {
        "addMember": "addMemberBirthday",
      }
    },
    "addMemberAvatar": {
      "title": "How does the member look like?",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{fontSize: 18, width: "87%"}}>
            The role
           </Text>
          </View>
          {this.state.finishedAdd? 
          <View style={guideStyle.bottomButtonCn}>
            <Text style={{fontSize: 18, width: "87%", paddingHorizontal: 29, paddingLeft: 32, color: colors.HOMESCREENLIGHTBLUE}}>Adding member..</Text>

          </View>:
          <View style={guideStyle.bottomButtonCn}>
          

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.nativeRipple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>FINISH</Text>
            </TouchableNativeFeedback>
          </View>
          }
        </View>
      ,
      "next": {
        "addMember": FINISH,
      },
      "back": {
        "addMember": "addMemberRole",
      }
    },
  }


  // change stage use currentStage and the command to go back or next
  _changeStage(back){
    let now = "next";
    if (back) {
      now = "back";
    }

    // get next stage that needs to be shown up
    ge = this.stages[this.state.currentStage][now][this.state.currentPurpose]

    // if not finish then change stage
    if(ge && ge != FINISH){
        this.setState(
          {
            ... this.state,
            currentStage: ge,
          }
        );
    }else if(ge == FINISH){
      //else then do something after
      this._finish(this.state.currentPurpose);
    }else{
      alert("WHAT STAGE NEXT?");
    }
  }

  // after finishing guide
  _finish = (purpose) => {
    
    let memberDetails = {
      dob: this.getStringDate(this.state.dateBirth),
      firstName: this.state.memberName,
      gender: this.state.gender,
      generation: 0,
      item: {},
      lastName: this.state.lastName,
      profileImage: "https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/post-5.jpg?alt=media&token=025a8387-8f63-4196-bce1-a44fee70047b",
      ringColor: "#D0753D",
      role: this.state.role
    }

    MemberModelManage.getInstance().setMember((member) => {
      this.props.navigation.goBack()}, memberDetails, this.state.familyAccount)
    this.setState({
      finishedAdd: true
    })
  }

  // onChange for any text input in the guide
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
        {this.state.familyAccount? 
          <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
            <View style={{paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16}}>
              <Text style={{flex: 1, width: "85%", textAlignVertical: "bottom", fontSize: 32, color: colors.HOMESCREENLIGHTBLUE}}>
                {this.stages[this.state.currentStage]["title"]}
              </Text>
            </View>
            {this.stages[this.state.currentStage]["view"]()}
          </View>:<View style={{flex: 8}}></View>
        }
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