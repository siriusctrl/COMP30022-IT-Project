import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View, KeyboardAvoidingView, FlatList} from "react-native";
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import Carousel from "react-native-snap-carousel";
import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback } from "react-native-gesture-handler";


export default class ArtGuide extends Component{

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    this.state.currentPurpose = 
      this.props.navigation.getParam("currentPurpose", "addArtefact");
  }

  state = {
    member: {
      memberColor: colors.HOMESCREENLIGHTBLUE,
      memberName: "John",
      memberFamily: "Nizaari",
      memberFamilyId: "",
      memberRole: "Son",
      memberId: 2
    },
    family: {
      member: [
        {
          memberId: 2,
          memberColor: colors.HOMESCREENLIGHTBLUE,
          memberName: "John",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "Son"
        },
        {
          memberId: 3,
          memberColor: colors.HOMESCREENLIGHTBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        },
        {
          memberId: 4,
          memberColor: colors.WELCOMEBLUE,
          memberName: "Lina",
          memberFamily: "Nizaari",
          memberFamilyId: "",
          memberRole: "A girl"
        }
      ]
    },
    memberArtefactItem: [],
    currentStage: "addArtefactInitial",
    currentPurpose: "addArtefact",
    memberName: "",
    gender: "",
    role: "",
    chosenArtefact: {},
  }

  _renderRow = ({item, index}) => {
    let total = this.state.memberArtefactItem.length;
    return (
      <TouchableNativeFeedback 
        style={{... styles.artCard, zIndex: total - index}} 
        background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} 
        onPress={() => {
          this.state.chosenArtefact = item;
          alert(this.state.chosenArtefact.title);
          this._changeStage(false);
        }}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
  }

  // params passed in
  par = {
    "memberAddFamily": "Nizaari"
  }

  // initial guide stage
  initialStage = {
    addArtefact: "addArtefactInitial"
  }

  ripple = 
    TouchableNativeFeedback.Ripple(colors.MISCHKA, true)

  // render member list
  _renderArtefactListItem = ({ item }) => (
    <ListItem
      title={item.memberName + " " + item.memberFamily}
      subtitle={item.memberRole}
      leftAvatar={{source: require("../assets/images/" + "dark.png")}}
      onPress = {() => this._changeStage(false)}
    />
  )

  // stages of guide
  // name: {title: title on screen, view: VIEW, next: {purpose: name}}
  stages = {
    
    "addArtefactInitial": {
      "title": "Adding artefact",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{flex: 1, fontSize: 18, width: "87%"}}>
            Adding artefact for
           </Text>
           <View style={{flex: 8, width: "100%"}}>
            <View style={styles.mBubbl}>
              <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: 64, width: 64, backgroundColor: colors.WHITE, borderRadius: 32}}></View>
              </View>
              <View style={{flex: 6, flexDirection: "column", paddingLeft: 23, justifyContent: "center"}}>
                <Text style={{fontSize: 23, color: colors.WHITE}}>
                  {this.state.member.memberName + " " + this.state.member.memberFamily}
                </Text>
                <Text style={{fontSize: 18, color: colors.WHITE}}>
                  {this.state.member.memberFamily} family
                </Text>
              </View>
            </View>
           </View>
          </View>
          <View style={{... guideStyle.bottomButtonCn, justifyContent: "flex-end"}}>
            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addArtefact": "addArtefactMemberIn",
      },
    },
    "addArtefactMemberIn": {
      "title": "Choose the member",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 36}}>
          <View style={{paddingHorizontal: 29, flex: 6, justifyContent: "flex-start"}}>
           <Text style={{flex: 1, fontSize: 18, width: "87%"}}>
            If this is from other family member, choose the member below
           </Text>
           <View style={{flex: 6, elevation: 2}}>
            <FlatList
              data={this.state.family.member}
              renderItem={this._renderArtefactListItem}
              keyExtractor={(item, index) => index.toString()}
            />
           </View>
          </View>
          <View style={guideStyle.bottomButtonCn}>

            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>NEXT</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addArtefact": "addArtefactMemberChoose",
      },
      "back": {
        "addArtefact": "addArtefactInitial",
      },
    },
    "addArtefactMemberChoose": {
      "title": "Artefact itself",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 23}}>
          <View style={{flex: 6, justifyContent: "flex-start"}}>
           <Text style={{paddingHorizontal: 29, flex: 1, fontSize: 18, width: "87%"}}>
            Choose the artefact
           </Text>
           <View style={{flex: 11, width: "100%", alignItems: "center", overflow: "hidden"}}>
            <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.memberArtefactItem}
                  renderItem={this._renderRow}
                  sliderHeight={450}
                  itemHeight={350}
                  vertical={true}
                  layout={"stack"}
                  
                  layoutCardOffset={`26`}
                  firstItem={this.state.memberArtefactItem.length - 1}
                  inactiveSlideScale={0.85}
                  containerCustomStyle={{overflow: "visible", width: "100%"}}
                  contentContainerCustomStyle={{alignItems: "center", flexDirection: "column"}}
                  slideStyle={{width: "93%", elevation: 16, borderRadius: 6}}
                />
           </View>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addArtefact": "addArtefactMemberChosen",
      },
      "back": {
        "addArtefact": "addArtefactMemberIn",
      },
    },
    "addArtefactMemberChosen": {
      "title": "Add this?",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 29}}>
          <View style={{paddingHorizontal: 29,flex: 6, justifyContent: "flex-start"}}>
           <Text style={{flex: 1, fontSize: 18, width: "87%"}}>Click YES to add this</Text>
            <ArtCard item={this.state.chosenArtefact} style={styles.artCardDisplay}/>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>NO</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback 
            background={this.ripple} 
            onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButton}>YES</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      ],
      "next": {
        "addArtefact": FINISH,
      },
      "back": {
        "addArtefact": "addArtefactMemberChoose",
      },
    }
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

  // finished guide
  _finish = (purpose) => {
    alert("finished" + purpose);
  }

  // change text, can change the text for all inputs
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

        <View style={guideStyle.guideNavigationBox}>
          <Icon name='clear' />
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={guideStyle.titleContainer}>
            <Text style={guideStyle.bigTitle}>
              {this.stages[this.state.currentStage]["title"]}
            </Text>
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
    },
    bigTitle: 
      {flex: 1, width: "85%", textAlignVertical: "bottom", fontSize: 32, color: colors.HOMESCREENLIGHTBLUE},
    titleContainer: 
      {paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16},
    guideNavigationBox: 
      {paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}

    
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
  },
  mBubbl: {
    height: 72, 
    width: "76%", 
    backgroundColor: this.state.member.memberColor, 
    borderRadius: 36, 
    elevation: 3, 
    flexDirection: "row", 
    paddingLeft: 21, 
    overflow: "hidden"
  }
  
});