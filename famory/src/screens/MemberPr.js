import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import colors from "../config/colors";
import firebaseContainer from "../controller/firebaseConfig";
import FamilyAccountModelManage from "../controller/FamilyAccountModel";
import { Icon } from 'react-native-elements';
import MemberModelManage from "../controller/MemberModel";
import ItemModelManage from "../controller/ItemModel";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel";

import getInputRangeFromIndexes from "react-native-snap-carousel";

const getAssetImagePath = (imagePh) => {
  return ("../assets/images/" + imagePh);
};

export default class MemberPr extends Component{
  static navigationOptions = {
    headerStyle: {backgroundColor: "rgba(106, 84, 166, 0)", height: 38, elevation: 0, zIndex: 2},
    headerTitleStyle: {color:colors.LIGHTERBLUE, fontWeight: "100"},
    headerTintColor: colors.HOMESCREENLIGHTBLUE
  }

  state = {
    profileMemberArtefactItem: [
    
    ].reverse(),
    itemAll: -1,
    itemHas: 0
  }

  componentDidMount(){
    let model = this.props.navigation.getParam("model", null);
    if (model){
      this.setState(
        {
          memberModel: model,
          isMemberReady: true,
          itemAll: Object.keys(model.item).length
        }
      )
      for (let itemDescri of Object.keys(model.item)) {
        ItemModelManage.getInstance().getItem((itemModelb) => {
          this.state.profileMemberArtefactItem.push(itemModelb)
          this.setState(
            {
              itemHas: this.state.itemHas + 1
            }
          )
        }, memberModela.item[itemDescri])
      }
    }else{
      FamilyAccountModelManage.getInstance().getFamilyAccount(
        (m) => {
          m.getMembers((o) => {
            this.setState({isMemberReady: true, memberModel: o["member_1"]})
            
            this.state.itemAll = Object.keys(o["member_1"].item).length
            o["member_1"].getItems((k) => {

                this.setState(
                  {
                    profileMemberArtefactItem: Object.values(k),
                    itemHas: Object.keys(k).length
                  }
                )
              })

          })
        }
      )
      /*MemberModelManage.getInstance().getMember((memberModela) => {
        this.setState(
          {
            memberModel: memberModela,
            isMemberReady: true,
            itemAll: Object.keys(memberModela.item).length
          }
        )
        for (let itemDescri of Object.keys(memberModela.item)) {
          ItemModelManage.getInstance().getItem((itemModelb) => {
            this.state.profileMemberArtefactItem.push(itemModelb)
            this.setState(
              {
                itemHas: this.state.itemHas + 1
              }
            )
          }, memberModela.item[itemDescri])
        }
      }, "member_1");*/


    }


  }

  _renderRow = ({item, index}) => {

    let total = this.state.profileMemberArtefactItem.length;

    return (
      <TouchableNativeFeedback style={{... styles.artCard, zIndex: total - index}} background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} onPress={() => this.toItem(item)}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
  }

  toItem(item){
    this.props.navigation.navigate("ArtefactItem", {item: item})
  }

  //eovniesbl 

  render() {

    return (
      <View style={{flex:1}}>
        <View style={styles.tContainer}>
          <View style={{flex: 1, width: "100%", flexDirection: "row"}}>
            <View style={{height: "100%", flex: 8, padding:12, elevation: 6}}>
                {
                  this.state.isMemberReady? 
                  <View style={{height: "100%", flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 2, overflow: "hidden", justifyContent: "center", alignItems: "center"}}>
                      <Image source={require("../assets/images/" + "dark.png")} style={{width: 68, height: 68, borderRadius: 34}}></Image>
                    </View>
                    <View style={{flex: 7, paddingLeft: 12, flexDirection: "column", marginTop: 6}}>
                      <Text style={{marginTop: 6, fontSize: 26, color: colors.HOMESCREENLIGHTBLUE, marginLeft: 2}}>{this.state.memberModel.firstName + " " + this.state.memberModel.lastName}</Text>
                      <View style={{flexDirection: "row", alignItems: "flex-start", marginTop: 3}}>
                        <View style={{backgroundColor: colors.LIGHTBLUE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8, marginRight: 6}}>
                          <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{this.state.memberModel.gender}</Text>
                        </View>
                        <View style={{backgroundColor: colors.ORANGE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8, marginRight: 6}}>
                          <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{this.state.memberModel.role}</Text>
                        </View>
                        <View style={{backgroundColor: colors.DTPURPLE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8}}>
                          <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{Object.keys(this.state.memberModel.item).length + " " + "Artefacts"}</Text>
                        </View>
                      </View>
                    </View>
                  </View>: 
                  <View style={{height: "100%", flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 2, overflow: "hidden", justifyContent: "center", alignItems: "center"}}>
                      <Image style={{width: 68, height: 68, borderRadius: 34}}></Image>
                    </View>
                    <View style={{flex: 7, paddingLeft: 12, flexDirection: "column", marginTop: 6}}>
                      <Text style={{marginTop: 6, fontSize: 26, color: colors.WHITE, marginLeft: 2}}>...</Text>
                      <View style={{flexDirection: "row", alignItems: "flex-start", marginTop: 3}}>
                      </View>
                    </View>
                  </View>
                }
            </View>


            <View style={{height: "100%", flex: 1}}>
              <TouchableNativeFeedback></TouchableNativeFeedback>
            </View>

          </View>
        </View>
        

        <View style={{justifyContent: "center", alignItems: "center", zIndex: 1}}>
          <View style={{justifyContent: "center", alignItems: "center", width: "100%", overflow: "visible", minHeight: 480, paddingTop: 38}}>
            {this.state.itemAll == this.state.itemHas? 
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={(() => {return this.state.profileMemberArtefactItem;})()}
                renderItem={this._renderRow}
                sliderHeight={450}
                itemHeight={350}
                vertical={true}
                layout={"stack"}

                

                slideInterpolatedStyle={(index, animatedValue, carouselProps) => {
                  const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
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
                              outputRange: [
                                  0,
                                  7,
                                  0,
                                  -sizeRef * 0.01,
                              ],
                              extrapolate: 'clamp'
                          })
                      }
                      ]
                    }
                  )
                }}
                
                
                
                firstItem={this.state.profileMemberArtefactItem.length - 1}
                inactiveSlideScale={0.85}
                containerCustomStyle={{overflow: "visible", width: "100%"}}
                contentContainerCustomStyle={{alignItems: "center", flexDirection: "column"}}
                slideStyle={{width: "87%", elevation: 5, borderRadius: 6}}
                
                
              />: <View></View>
            }
            {
              this.state.itemAll == 0? <Text>Nope</Text>:[]
            }
          </View>
        </View>

        <View style={{height: 72, width: 72, borderRadius: 36, position: "absolute", bottom: 32, right: 23, zIndex:5, backgroundColor: colors.HOMESCREENLIGHTBLUE, elevation: 7, justifyContent: "center", alignItems:"center"}}>
          <TouchableNativeFeedback style={{height: 72, width: 72, borderRadius: 36, justifyContent: "center", alignItems:"center"}} background={TouchableNativeFeedback.Ripple(colors.WHITE, true)} onPress={() => {alert(this.state.itemAll == this.state.itemHas)}}>
            <Icon name="add" size={32} color={colors.WHITE} />
          </TouchableNativeFeedback>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tContainer: {
    backgroundColor: "rgba(106, 84, 166, 0)",
    width: "100%",
    height: 96,
    zIndex: 2,
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  artCard: {
    height: 350,
    borderRadius: 6
  },
  artContainer: {
    transform: [
      { rotateZ: '45deg' }
    ]
  }

});
