import React, {Component} from "react";
import { Text, Image, StyleSheet, View, FlatList} from "react-native";
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import Carousel from "react-native-snap-carousel";
import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import FamilyAccountModelManage from "../controller/FamilyAccountModel"
import MemberModelManage from "../controller/MemberModel";
import { Button } from 'native-base';
import Empty from "../components/Empty";

export default class ArtGuide extends Component{

  static navigationOptions = {
    header: null
  }

  state = {
    familyAccount: null,
    currentStage: "addArtefactInitial",
    currentPurpose: "addArtefact",
    chosenArtefact: {},
    chosenMemberAllArtefactsAreHere: [],
  }

  componentDidMount(){
      // use the default member_1 to get members
      if (this.props.navigation.getParam("member", null)){
        this.setState({isMemberReady: true, memberModel: this.props.navigation.getParam("member", null)})
      }

      FamilyAccountModelManage.getInstance().getFamilyAccount(
        (m) => {
          this.setState(
            {
              familyAccount: m
            }
          )
          m.getMembers((o) => {
            this.setState({members: Object.values(o)})
            if (!this.props.navigation.getParam("member", null)){
              this.setState({isMemberReady: true, memberModel: o["member_8"]})
            }
          })
        }
      )
  }

  _renderRow = ({item, index}) => {
    let total = this.state.chosen.item.length;
    return (
      <TouchableNativeFeedback 
        style={{... styles.artCard}} 
        background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} 
        onPress={() => {
          this.state.chosenArtefact = item;
          this._changeStage(false);
        }}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
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
      title={item.firstName + " " + item.lastName}
      subtitle={item.role}
      leftAvatar={{source: {uri: item.profileImage}}}
      onPress = {() => {
        this.setState(
          {chosen: item}
        )
        item.getItems(
          (membersArtefacts) => {
            this.setState(
              {
                chosenMemberAllArtefactsAreHere: Object.values(membersArtefacts)
              }
            )
            alert(this.state.chosenMemberAllArtefactsAreHere)
          }
        )
        this._changeStage(false)
      }}
    />
  )

  // stages of guide
  // name: {title: title on screen, view: VIEW, next: {purpose: name}}
  stages = {
    
    "addArtefactInitial": {
      "title": "Adding artefact",
      "view": () =>
        <View style={{flex: 6, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
            <Text style={{flex: 1, fontSize: 18, width: "87%"}}>
              You are adding artefact for:
            </Text>
            <View style={{flex: 8, width: "100%", marginTop: 20,}}>
              <View style={{... styles.mBubbl, backgroundColor: this.state.memberModel.ringColor}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <View style={{height: 64, width: 64, backgroundColor: colors.WHITE, borderRadius: 32, overflow: "hidden"}}>
                    <Image source={{uri: this.state.memberModel.profileImage}} style={{width: "100%", height: "100%"}}></Image>
                  </View>
                </View>
                <View style={{flex: 6, flexDirection: "column", paddingLeft: 23, justifyContent: "center"}}>
                  <Text style={{fontSize: 23, color: colors.WHITE, maxWidth: 150}} numberOfLines={1} ellipsizeMode={"tail"}>
                    {this.state.memberModel.firstName + " " + this.state.memberModel.lastName}
                  </Text>
                  <Text style={{fontSize: 18, color: colors.WHITE}}>
                    {this.state.familyAccount.name} family
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <Button style={{opacity: 0}} iconLeft light>
              <Icon name='arrow-back' />
              <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>BACK</Text>
            </Button>
            <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
              <Button style={guideStyle.bottomButtonRight} iconRight light onPress={() => this._changeStage(false)}>
                <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>NEXT</Text>
                <Icon name='arrow-forward' style={{marginRight: 15}} />
              </Button>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addArtefact": "addArtefactMemberIn",
      },
    },
    "addArtefactMemberIn": {
      "title": "Choose the member",
      "view": () =>
        <View style={{flex: 5, flexDirection: "column", paddingTop: 36, marginTop: -15}}>
          <View style={{paddingHorizontal: 29, flex: 4, justifyContent: "flex-start"}}>
            <Text style={{flex: 1, fontSize: 18, width: "95%", marginTop: 10,}}>
              If this is from another family member, choose them below.
            </Text>
            <View style={{
              flex: 4, 
              elevation: 16,}}
            >
              <FlatList
                data={this.state.members}
                renderItem={this._renderArtefactListItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{paddingBottom:17}}
              />
            </View>
          </View>
          <Empty /><Empty /><Empty />
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
              <Button style={guideStyle.bottomButtonLeft} iconLeft light onPress={() => this._changeStage(true)}>
                <Icon name='arrow-back' />
                <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>BACK</Text>
              </Button>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
      "next": {
        "addArtefact": "addArtefactMemberChoose",
      },
      "back": {
        "addArtefact": "addArtefactInitial",
      },
    },
    "addArtefactMemberChoose": {
      "title": "Choose Artefact",
      "view": () =>
      {return this.state.chosenMemberAllArtefactsAreHere.length > 0? 
        <View style={{flex: 6, flexDirection: "column", paddingTop: 2}}>
          <View style={{flex: 7, justifyContent: "flex-start"}}>
          <View style={{flex: 11, width: "100%", alignItems: "center", overflow: "hidden"}}>
            <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.chosenMemberAllArtefactsAreHere}
                  renderItem={this._renderRow}
                  sliderHeight={450}
                  itemHeight={350}
                  vertical={true}
                  layout={"stack"}

                slideInterpolatedStyle={(index, animatedValue, carouselProps) => {
                  const sizeRef = carouselProps.vertical ? 
                    carouselProps.itemHeight : carouselProps.itemWidth;
                  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
                  return (
                    {
                      // zIndex: carouselProps.data.length - index,
                      opacity: animatedValue.interpolate({
                          inputRange: [-3, -2, -1, 0, 1, 2],
                          outputRange: [0, 0.5, 0.8, 1, 0.3, 0]
                      }),
                      transform: [
                        {rotate: animatedValue.interpolate({
                          inputRange: [-2, -1, 0, 1],
                          outputRange: ["2deg","-3deg", "0deg", "-5deg"],
                          extrapolate: 'clamp'
                        })},{
                          [translateProp]: animatedValue.interpolate({
                              inputRange: [-3, -2, -1, 0, 1],
                              outputRange: [
                                  sizeRef * 3,
                                  sizeRef * 1.9,
                                  sizeRef * 0.9,
                                  0,
                                  -sizeRef*0.000003,
                              ],
                              extrapolate: 'clamp'
                          }),
                          
                        },
                        {["translateX"]: animatedValue.interpolate({
                              inputRange: [-2, -1, 0, 1],
                              outputRange: [0,7,0, -sizeRef * 0.01],
                              extrapolate: 'clamp'
                          })
                        }
                      ]
                    }
                  )
                }}
                  
                  layoutCardOffset={26}
                  firstItem={this.state.chosenMemberAllArtefactsAreHere.length - 1}
                  inactiveSlideScale={0.85}
                  containerCustomStyle={{overflow: "visible", width: "100%"}}
                  contentContainerCustomStyle={{alignItems: "center", flexDirection: "column"}}
                  slideStyle={{width: "93%", elevation: 12, borderRadius: 6}}
                />
          </View>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
              <Button style={guideStyle.bottomButtonLeft} iconLeft light onPress={() => this._changeStage(true)}>
                <Icon name='arrow-back' />
                <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>BACK</Text>
              </Button>
            </TouchableNativeFeedback>
          </View>
        </View>: <View style={{flex: 4, flexDirection: "column", paddingTop: 23}}>
        </View>
      }
      ,
      "next": {
        "addArtefact": "addArtefactMemberChosen",
      },
      "back": {
        "addArtefact": "addArtefactMemberIn",
      },
    },
    "addArtefactMemberChosen": {
      "title": "Confirm Upload",
      "view": () =>
        <View style={{flex: 6, flexDirection: "column", paddingTop: 12}}>
          <View style={{paddingHorizontal: 29,flex: 3, justifyContent: "flex-start"}}>
            <ArtCard item={this.state.chosenArtefact} style={styles.artCardDisplay}/>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
              <Button style={guideStyle.bottomButtonLeft} iconLeft light onPress={() => this._changeStage(true)}>
                <Icon name='arrow-back' />
                <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>NO</Text>
              </Button>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={{borderRadius: 2, elevation: 1}}>
              <Button style={guideStyle.bottomButtonRight} iconRight light onPress={() => this._changeStage(false)}>
                <Text style={{color: colors.DODGER_BLUE, textAlign: "center", textAlignVertical: "center", fontSize: 16, marginHorizontal: 8}}>YES</Text>
                <Icon name='arrow-forward' style={{marginRight: 15}} />
              </Button>
            </TouchableNativeFeedback>
          </View>
        </View>
      ,
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
    MemberModelManage.getInstance().passItem(()=>{
      this.state.memberModel.updateSelf(
        (updatedMember) => {
          this.props.navigation.getParam("profileScreen", null).setModel(updatedMember)
        }
      )
    }, this.state.memberModel, this.state.chosenArtefact);
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
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
            <Icon name='clear' size={30} />
          </TouchableNativeFeedback>
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={guideStyle.titleContainer}>
            <Text style={guideStyle.bigTitle}>
              {this.stages[this.state.currentStage]["title"]}
            </Text>
          </View>
          {this.state.familyAccount != null && this.state.isMemberReady? this.stages[this.state.currentStage]["view"](): 
          <View style={{flex: 4, flexDirection: "column", paddingTop: 36}}></View>}
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
    bigTitle: {
      flex: 1, 
      width: "85%", 
      textAlignVertical: 
      "bottom", 
      fontSize: 28, 
      color: colors.HOMESCREENLIGHTBLUE
    },
    titleContainer: {
      paddingHorizontal: 28, 
      flex: 1, 
      flexDirection: "column", 
      justifyContent: "flex-end", 
      alignItems: "flex-start", 
      paddingBottom: 16
    },
    guideNavigationBox: {
      paddingTop: 26, 
      paddingHorizontal: 26,
      flex: 1, 
      justifyContent: "flex-start", 
      alignItems: "center", 
      flexDirection: "row"
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
    height: 350,
    borderRadius: 6
  },
  artCardDisplay: {
    height: 280,
    borderRadius: 6,
    elevation: 9,
  },
  mBubbl: {
    height: 72, 
    width: "88%", 
    borderRadius: 36, 
    elevation: 3, 
    flexDirection: "row", 
    paddingLeft: 21, 
    overflow: "hidden"
  }
});