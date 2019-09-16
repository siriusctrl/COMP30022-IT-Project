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

const getAssetImagePath = (imagePh) => {
  return ("../assets/images/" + imagePh);
};

export default class MemberPr extends Component{
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.HOMESCREENLIGHTBLUE, height: 52, elevation: 0},
    headerTitle: "Member Profile",
    headerTitleStyle: {color: colors.WHITE, fontWeight: "100"},
    headerTintColor: colors.WHITE
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
      MemberModelManage.getInstance().getMember((memberModela) => {
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
      }, "member_1");
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
            <View style={{height: "100%", flex: 8, padding:12}}>
                {
                  this.state.isMemberReady? 
                  <View style={{height: "100%", flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 2, overflow: "hidden", justifyContent: "center", alignItems: "center"}}>
                      <Image source={require("../assets/images/" + "dark.png")} style={{width: 68, height: 68, borderRadius: 34}}></Image>
                    </View>
                    <View style={{flex: 7, paddingLeft: 12, flexDirection: "column", marginTop: 6}}>
                      <Text style={{marginTop: 6, fontSize: 26, color: colors.WHITE, marginLeft: 2}}>{this.state.memberModel.firstName + " " + this.state.memberModel.lastName}</Text>
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
          <View style={{justifyContent: "center", alignItems: "center", width: "100%", overflow: "visible", minHeight: 480, paddingTop: 65}}>
            {this.state.itemAll == this.state.itemHas? 
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={(() => {return this.state.profileMemberArtefactItem;})()}
                renderItem={this._renderRow}
                sliderHeight={450}
                itemHeight={350}
                vertical={true}
                layout={"stack"}
                
                layoutCardOffset={`52`}
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
          <TouchableNativeFeedback style={{height: 72, width: 72, borderRadius: 36, justifyContent: "center", alignItems:"center"}} background={TouchableNativeFeedback.Ripple(colors.WHITE, true)}>
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
    backgroundColor: colors.HOMESCREENLIGHTBLUE,
    width: "100%",
    height: 104,
    zIndex: 2,
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  artCard: {
    height: 350,
    borderRadius: 6
  }
});
