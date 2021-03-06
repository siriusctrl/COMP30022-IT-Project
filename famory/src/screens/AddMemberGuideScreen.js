import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View, KeyboardAvoidingView, DatePickerAndroid, ScrollView } from "react-native";
import colors from "../config/colors";
import { Icon } from 'react-native-elements'
import { Button } from 'native-base';
import FamilyAccountModelManage from "../controller/FamilyAccountModel"
import MemberModelManage from "../controller/MemberModel"
import {_pickImage, _uploadToFirebase} from "../controller/fileUtilitiesSync"

import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Calendar from "../assets/icons/calendarDate";
import LottieView from "lottie-react-native";

// guide page for adding a member
export default class AddMemberGuide extends Component{

  static navigationOptions = {
    header: null
  }

  defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/defaultavatar.png?alt=media&token=931ffe40-d430-4755-8b4a-4c43162da079"

  state = {
    currentStage: "addMemberInitial",
    currentPurpose: "addMember",
    memberName: "Anynymous",
    gender: "N/A",
    role: "Member",
    gen: "",
    familyAccount: null,
    memberAddFamily: "Nizaari",
    showPicker: true,
    lastName: "",
    dateBirth: (new Date()),
    finishedAdd: false,
    picked: 0,
    ringColor: colors.HOMESCREENLIGHTBLUE,
    avatar:"",
  }

  componentDidMount(){
    // get generation and family account
    if (this.props.navigation.getParam("gen", null)){
      let gen = this.props.navigation.getParam("gen", "gen 0");
      this.setState(
        {
          gen: Number(gen[gen.length - 1])
        }
      )
    }

    if(this.props.navigation.getParam("familyAccount", null)){
      this.setState(
        {
          familyAccount: this.props.navigation.getParam("familyAccount", null)
        }
      )
    }else{
      FamilyAccountModelManage.getInstance().getFamilyAccount(
        (familyModel) => {this.setState({familyAccount: familyModel})}
      )
    }
  }

  initialStage = {
    addMember: "addMemberInitial",
  }

  nativeRipple = TouchableNativeFeedback.Ripple(colors.MISCHKA, true)

  setDate = (event, date) => {
    this.setState({dateBirth: date});
  }

  getStringDate = (date) => {
    return date.getFullYear().toString() + "-" + 
              (date.getMonth() + 1).toString() + "-" + 
                  (date.getDate()).toString()
  }


  // normal bottom buttons
  generalBottom = () => {
    return(<View style={guideStyle.bottomButtonCn}>
      <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
        <Button style={guideStyle.bottomButtonLeft} iconLeft light onPress={() => this._changeStage(true)}>
          <Icon name='arrow-back' />
          <Text style={guideStyle.bottomButtonAnother}>BACK</Text>
        </Button>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
        <Button style={guideStyle.bottomButtonRight} iconRight light onPress={() => this._changeStage(false)}>
          <Text style={guideStyle.bottomButtonAnother}>NEXT</Text>
          <Icon name='arrow-forward' style={{marginRight: 15}} />
        </Button>
      </TouchableNativeFeedback>
    </View>)
  }


  // color picker in the last page of addmemberGuide
  // return a view contains pickers
  ringColorPicker = (chosen) => {
    let rings = [
      colors.RINGBLUE,
      colors.RINGDOGER,
      colors.RINGLIGHTORANGE,
      colors.RINGORANGE,
      colors.RINGPINK,
      colors.RINGPURPLE
    ]

    let render = []
    for(let i = 0; i < rings.length; i ++){
      // style for other colors that are not chosen
      let style = { ... guideStyle.colorPi, backgroundColor: rings[i]}
      // style for the chosen color
      if (chosen == i){
        style = {
          ... guideStyle.colorPi, 
          ... guideStyle.colorPicked, 
          backgroundColor: rings[i]
        }
      }
      render.push(
        <View style={style}>
          <TouchableNativeFeedback onPress={() => this.setState({
                picked: i,
                ringColor: rings[i]})}>
            <Image style={{... guideStyle.imagePick, backgroundColor: rings[i]}}>
            </Image>
          </TouchableNativeFeedback>
        </View>
      )
    }
    return render
  }


  // guide stages
  // each has a title shown at the upper
  // and a view function to render the main content of the stage
  // also a bottom button render function
  stages = {
    "addMemberInitial": 
    {
      "title": "Add a member to your family",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 86}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18}}>
              You're adding a member for
            </Text>
            <Text style={{fontSize: 18, color: colors.ORANGE}}>
              {this.state.familyAccount.name}'s family
            </Text>
          </View>
        </View>
      ,
      "next": {
        "addMember": "addMemberName"
      },
      bottomButton: () => 
      <View style={{... guideStyle.bottomButtonCn, justifyContent: "flex-end"}}>
        <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
          <Button style={guideStyle.bottomButtonRight} iconRight light onPress={() => this._changeStage(false)}>
            <Text style={guideStyle.bottomButtonAnother}>NEXT</Text>
            <Icon name='arrow-forward' style={{marginRight: 15}} />
          </Button>
        </TouchableNativeFeedback>
      </View>
    },

    "addMemberName": 
    {
      "title": "What's the Name?",
      "view": () =>
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 4, flexDirection: "column", paddingTop: 48}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
            <Text style={{fontSize: 18, width: "87%"}}>
              First name and middle name
            </Text>
            <TextInput 
              placeholder={"Anonymous"} 
              onChangeText={
                (member) => {this._changeText({memberName: member})}
              }
             style={guideStyle.blackText} />
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>
              What's the Last Name?
             </Text>
             <TextInput 
              placeholder={this.state.memberAddFamily} 
              onChangeText={
              (lastName) => {this._changeText({lastName: lastName})}
              }
              style={guideStyle.blackText} />
          </View>

        </KeyboardAvoidingView>
      ,
      "next": {
        "addMember": "addMemberGender",
      },
      "back": {
        "addMember": "addMemberInitial",
      },
      bottomButton: this.generalBottom
    },

    "addMemberGender": 
    {
      "title": "What's the Gender?",
      "view": () =>
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
             <Text style={{fontSize: 18, marginTop: 38, width: "87%"}}>
              We support any gender you like
             </Text>
             <TextInput 
              placeholder={"N/A"} 
              onChangeText={
                (gr) => {this._changeText({gender: gr})}
              }
             style={guideStyle.blackText} />
          </View>
          
        </KeyboardAvoidingView>
      ,
      "next": {
        "addMember": "addMemberBirthday",
      },
      "back": {
        "addMember": "addMemberName",
      },
      bottomButton: this.generalBottom

    },
    "addMemberBirthday": {
      "title": "What's the Birthday?",
      "view": ()=>
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 26, flex: 6, paddingLeft: 27}}>
             <TouchableNativeFeedback onPress={async () => {
               try {
                  const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: this.state.dateBirth,
                    mode:"spinner",
                  });

                  if (action !== DatePickerAndroid.dismissedAction){
                    this.setState({
                      dateBirth: (new Date(year, month, date=day))
                    })
                  }
                 
                } catch ({code, message}) {
                  console.warn('Cannot open date picker', message);
                }
             }} style={{borderColor: colors.AGRAY, borderWidth: 0.5, borderRadius: 7}}>
              <View style={{width: "100%", borderRadius: 7, justifyContent: "space-between", alignItems: "center", padding: 18, flexDirection: "column"}}>
                <Calendar />
                <Text style={{fontSize: 20, marginTop: 10,}}>{this.getStringDate(this.state.dateBirth)}</Text>
              </View>
             </TouchableNativeFeedback>
          </View>
          
        </KeyboardAvoidingView>
      ,
      "next": {
        "addMember": "addMemberRole",
      },
      "back": {
        "addMember": "addMemberGender",
      },
      bottomButton: this.generalBottom

    },
    "addMemberRole": {
      "title": "What's the Role?",
      "view": () =>
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{fontSize: 18, width: "87%"}}>The role</Text>
            <TextInput placeholder={"Role"} onChangeText={
              (rl) => {this._changeText({role: rl})}
            }
             style={guideStyle.blackText} />
          </View>
          
        </KeyboardAvoidingView>
      ,
      "next": {
        "addMember": "addMemberAvatar",
      },
      "back": {
        "addMember": "addMemberBirthday",
      },
      bottomButton: this.generalBottom
    },
    "addMemberAvatar": {
      "title": "How does the member look like?",
      "view": () => (
        this.state.finishedAdd? 
        <KeyboardAvoidingView behavior="height" enabled 
          style={{flex: 4, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <LottieView
            autoPlay={true}
              ref={animation => {
                this.addingMemberAnimation = animation;
              }}
              loop={true}
              source={require('../assets/animation/addingMember.json')}
              style={{width: 86, height: 86}}
            />
          <Text style={{fontSize: 18, paddingHorizontal: 29, paddingLeft: 32, color: colors.BLACK}}>Adding member..</Text>
        </KeyboardAvoidingView>
        :
        <KeyboardAvoidingView behavior="height" enabled 
          style={{flex: 4, flexDirection: "column", paddingTop: 42}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32, marginTop: -40}}>
            <View 
              style={{width: 196, height: 196, borderRadius: 98, borderWidth: 12, overflow: "hidden", borderColor: this.state.ringColor}}>
              <TouchableNativeFeedback 
                onPress={
                async () => {
                  let image = await _pickImage();
                  if (!image.cancelled) {
                    this.setState({avatar: image.uri})
                  }}
                }>
                <Image 
                  source={{uri: this.state.avatar? this.state.avatar: this.defaultAvatar}} 
                  style={{width: "100%", height: "100%", backgroundColor: colors.WHITE}} />
              </TouchableNativeFeedback>
            </View>

            <Text style={{fontSize: 19, marginTop: 25, width: "97%", fontWeight: 'normal'}}>
              Choose their exclusive color!
            </Text>
           
           <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            padingEnabled={true} 
            style={{width: "100%", height: 56, marginTop: 25, flexDirection: "row", }}>
              {this.ringColorPicker(this.state.picked)}
            </ScrollView>
          </View>
          
        </KeyboardAvoidingView>
      )
      ,
      "next": {
        "addMember": FINISH,
      },
      "back": {
        "addMember": "addMemberRole",
      },
      bottomButton: () => (
        this.state.finishedAdd? 
        []
        :
        <View style={guideStyle.bottomButtonCn}>

        <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
          <Button style={guideStyle.bottomButtonLeft} iconLeft light onPress={() => this._changeStage(true)}>
            <Icon name='arrow-back' />
            <Text style={guideStyle.bottomButtonAnother}>BACK</Text>
          </Button>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
          <Button iconRight success onPress={() => this._changeStage(false)}>
            <Text style={guideStyle.finishButton}>FINISH</Text>
          </Button>
        </TouchableNativeFeedback>

      </View>
      )
    },
  }


  // change stage use currentStage and the command to go back or next
  _changeStage(back){
    let now = "next";
    if (back) {
      now = "back";
    }

    // get next stage that needs to be shown up
    nextStage = this.stages[this.state.currentStage][now][this.state.currentPurpose]

    // if not finish then change stage
    if(nextStage && nextStage != FINISH){
        this.setState(
          {
            ... this.state,
            currentStage: nextStage,
          }
        );
    }else if(nextStage == FINISH){
      //else then do something after
      this._finish(this.state.currentPurpose);
    }else{
      alert("WHAT STAGE NEXT?");
    }
  }


  // after finishing guide
  _finish = (purpose) => {
    
    // finishing
    this.setState({
      finishedAdd: true
    })

    let imageURI = this.defaultAvatar;

    if(this.state.avatar != ""){

      // upload profile image
      _uploadToFirebase(this.state.avatar, (imageURI) => {

        let memberDetails = {
          dob: this.getStringDate(this.state.dateBirth),
          firstName: this.state.memberName,
          gender: this.state.gender,
          generation: this.state.gen,
          item: {},
          lastName: this.state.lastName,
          profileImage: imageURI,
          ringColor: this.state.ringColor,
          role: this.state.role
        }

        // then build member
        MemberModelManage.getInstance().setMember((familyAccount) => {
          this.props.navigation.getParam("homePageScreen", null).setModel(familyAccount);
          this.props.navigation.navigate('HomePage', {prevScreen: 'AddMemberGuide'});
        }, memberDetails, this.state.familyAccount);
      })
    }else{

      // if no avatar chosen in the guide
      let memberDetails = {
        dob: this.getStringDate(this.state.dateBirth),
        firstName: this.state.memberName,
        gender: this.state.gender,
        generation: this.state.gen,
        item: {},
        lastName: this.state.lastName,
        profileImage: imageURI,
        ringColor: this.state.ringColor,
        role: this.state.role
      }

      MemberModelManage.getInstance().setMember((familyAccount) => {
        this.props.navigation.getParam("homePageScreen", null).setModel(familyAccount);
        this.props.navigation.navigate('HomePage', {prevScreen: 'AddMemberGuide'});
      }, memberDetails, this.state.familyAccount);
    }
  }


  // onChange for any text input in the guide
  _changeText = (text) => {
    this.setState(
      {
        ... this.state,
        ... text
      }
    );
  }

  
  render(){
    return(
      <KeyboardAvoidingView behavior="padding" enabled style={{flexDirection: "column", flex: 1}}>
        <View style={guideStyle.topNav}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
            <Icon name='clear' size={30} />
          </TouchableNativeFeedback>
        </View>
        {
          this.state.familyAccount? 
          <View style={{flex: 5, width: "100%", flexDirection: "column", paddingLeft: 2}}>
            <View style={{paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "center", alignItems: "flex-start", paddingBottom: 16}}>
              <Text style={{flex: 1, width: "85%", textAlignVertical: "center", fontSize: 28, color: colors.HOMESCREENLIGHTBLUE}}>
                {this.state.finishedAdd? "":this.stages[this.state.currentStage]["title"]}
              </Text>
            </View>
            {this.stages[this.state.currentStage]["view"]()}
            {this.stages[this.state.currentStage]["bottomButton"]()}
          </View>
          :
          <View style={{flex: 5}}></View>
        }
      </KeyboardAvoidingView>
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
    bottomButtonAnother: {color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8},
    bottomButtonCn: {
      paddingHorizontal: 26, 
      paddingBottom: 26, 
      flex: 0.5,
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center"
    },
    finishButton: {
      height: 58, 
      width: 114, 
      textAlign: "center", 
      textAlignVertical: "center", 
      color: 'white', 
      fontSize: 16,
    },
    bottomButtonLeft: {
      paddingHorizontal: 16,
    },
    bottomButtonRight: {
      paddingHorizontal: 16,
    },
    blackText: {
      marginTop:10,
      paddingBottom:4,
      fontSize: 18,
      borderBottomColor: "lightgrey",
      borderBottomWidth: 1,
      height: 40,
    },
    colorPicked: {borderWidth: 5, borderColor: colors.HOMESCREENLIGHTBLUE,},
    colorPi: {width: 56, height: 56, borderRadius: 28, backgroundColor: colors.HOMESCREENLIGHTBLUE, overflow: "hidden", marginRight: 19},
    imagePick: {width: "100%", height: "100%", backgroundColor: colors.HOMESCREENLIGHTBLUE},
    topNav: {paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}
  }
)