import React, {Component} from "react";
import { Text, TextInput, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, FlatList} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import { Container, Header, Content, Item, Input} from 'native-base';
import Carousel from "react-native-snap-carousel";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";


export default class ArtGuide extends Component{

  static navigationOptions = {
    header: null
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
    memberArtefactItem: [
      {
        "type": "letter",
        "name": "Letter from Bakka",
        "description": "What are we watching last night? I can not remember.",
        "content": "Lorem ipsum dolor sit amet, \n\nmagnis leo morbi viverra, enim curabitur massa amet libero sit, eu eros vitae orci, nam a semper elementum, integer maecenas. Vestibulum lorem dui nisl sed, pellentesque pellentesque primis sit vel luctus vel. Praesent adipiscing posuere lectus, metus imperdiet purus convallis amet condimentum, diam lacus. Commodo sed, pellentesque velit in. Hendrerit turpis vivamus ligula orci massa id, ut elementum eu ultrices nam. Pellentesque sodales elit risus libero, malesuada aptent a lectus dictum sed, fusce conubia luctus pede aliquam. Curae enim vitae, accumsan esse a quis quis, ullamcorper in nisl neque interdum sociosqu aliquam, a volutpat ipsum ante velit ut, consequat nec in quis penatibus. Orci wisi tortor, eros elit quisque donec, at donec ac. Velit nunc elit in risus nunc donec, justo erat, eu lacinia nulla id, amet pede lorem nisl in. Magna ac lectus vivamus faucibus vestibulum venenatis, nibh leo nunc, enim consectetuer dui eu hac aliquip. Ac aliquet eleifend a pede massa, ante nulla etiam vel in, aliquam consectetur, sit neque aliquet. Erat neque quam, dolor et tristique, lectus sit augue tortor, elementum cras sapien metus hendrerit. In malesuada mollis, lobortis tortor dignissim, consectetuer libero vivamus feugiat, habitasse ut arcu velit nec. Aliquet condimentum augue suspendisse pellentesque turpis, nisl faucibus nec consequat in, vehicula ac a suspendisse ornare, non aenean. Pellentesque vestibulum.",
      },
      {
        "type": "image",
        "name": "80s kid born",
        "description": "remember your birthday",
        "content": "../assets/images/" + "dark.png"
      },
      
      {
        "type": "image",
        "name": "80s kid born",
        "description": "remember your birthday",
        "content": "../assets/images/" + "dark.png"
      },
      

    ].reverse(),
    currentStage: "addArtefactMemberIn",
    currentPurpose: "addArtefact",
    memberName: "",
    gender: "",
    role: "",
    chosenArtefact: {
      "type": "letter",
      "title": "Letter from Bakka",
      "description": "What are we watching last night? I can not remember.",
      "main": "Lorem ipsum dolor sit amet, \n\nmagnis leo morbi viverra, enim curabitur massa amet libero sit, eu eros vitae orci, nam a semper elementum, integer maecenas. Vestibulum lorem dui nisl sed, pellentesque pellentesque primis sit vel luctus vel. Praesent adipiscing posuere lectus, metus imperdiet purus convallis amet condimentum, diam lacus. Commodo sed, pellentesque velit in. Hendrerit turpis vivamus ligula orci massa id, ut elementum eu ultrices nam. Pellentesque sodales elit risus libero, malesuada aptent a lectus dictum sed, fusce conubia luctus pede aliquam. Curae enim vitae, accumsan esse a quis quis, ullamcorper in nisl neque interdum sociosqu aliquam, a volutpat ipsum ante velit ut, consequat nec in quis penatibus. Orci wisi tortor, eros elit quisque donec, at donec ac. Velit nunc elit in risus nunc donec, justo erat, eu lacinia nulla id, amet pede lorem nisl in. Magna ac lectus vivamus faucibus vestibulum venenatis, nibh leo nunc, enim consectetuer dui eu hac aliquip. Ac aliquet eleifend a pede massa, ante nulla etiam vel in, aliquam consectetur, sit neque aliquet. Erat neque quam, dolor et tristique, lectus sit augue tortor, elementum cras sapien metus hendrerit. In malesuada mollis, lobortis tortor dignissim, consectetuer libero vivamus feugiat, habitasse ut arcu velit nec. Aliquet condimentum augue suspendisse pellentesque turpis, nisl faucibus nec consequat in, vehicula ac a suspendisse ornare, non aenean. Pellentesque vestibulum.",
    },
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

  purpose = {
    addMember: "addMember",
    addArtefact: "addArtefact"
  }

  initialStage = {
    addMember: "addMemberInitial",
    addArtefact: "addArtefactInitial"
  }

  _renderArtefactListItem = ({ item }) => (
    <ListItem
      title={item.memberName + " " + item.memberFamily}
      subtitle={item.memberRole}
      leftAvatar={{source: require("../assets/images/" + "dark.png")}}
      onPress = {() => this._changeStage(false)}
    />
  )

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
    "addArtefactInitial": {
      "title": "Adding artefact",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 69}}>
          <View style={{paddingHorizontal: 29, flex: 6, paddingLeft: 32}}>
           <Text style={{flex: 1, fontSize: 18, width: "87%"}}>Adding artefact for</Text>
           <View style={{flex: 8, width: "100%"}}>
            <View style={{height: 72, width: "76%", backgroundColor: this.state.member.memberColor, borderRadius: 36, elevation: 3, flexDirection: "row", paddingLeft: 21, overflow: "hidden"}}>
              <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: 64, width: 64, backgroundColor: colors.WHITE, borderRadius: 32}}></View>
              </View>
              <View style={{flex: 6, flexDirection: "column", paddingLeft: 23, justifyContent: "center"}}>
                <Text style={{fontSize: 23, color: colors.WHITE}}>{this.state.member.memberName + " " + this.state.member.memberFamily}</Text>
                <Text style={{fontSize: 18, color: colors.WHITE}}>{this.state.member.memberFamily} family</Text>

              </View>
            </View>
           </View>
          </View>
          <View style={{... guideStyle.bottomButtonCn, justifyContent: "flex-end"}}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(false)}>
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
      "title": "Is this from other member?",
      "view": [
        <View style={{flex: 4, flexDirection: "column", paddingTop: 36}}>
          <View style={{paddingHorizontal: 29, flex: 6, justifyContent: "flex-start"}}>
           <Text style={{flex: 1, fontSize: 18, width: "87%"}}>If this is from other family member, choose the member below</Text>
           <View style={{flex: 6, elevation: 2}}>
            <FlatList
              data={this.state.family.member}
              renderItem={this._renderArtefactListItem}
              keyExtractor={(item, index) => index.toString()}
            />
           </View>
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>BACK</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>NO, SKIP</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(false)}>
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
           <Text style={{paddingHorizontal: 29, flex: 1, fontSize: 18, width: "87%"}}>Choose the artefact</Text>
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
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
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
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(true)}>
              <Text style={guideStyle.bottomButton}>NO</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this._changeStage(false)}>
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

  _renderArtefactListItem = ({ item }) => (
    <Text>caoni</Text>
  )

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