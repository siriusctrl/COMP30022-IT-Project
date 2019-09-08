import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../config/colors";
import firebaseContainer from "../controller/firebaseConfig"
import { FamilyModelManage } from "../controller/FamilyModel"
import * as firebase from "firebase";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel";

const getAssetImagePath = (imagePh) => {
  return ("../assets/images/" + imagePh)
};

export default class MemberPr extends Component{
  static navigationOptions = {
    header: null
  }

  state = {
    profileMemberName: "John",
    lastName: "Nizaari",
    profileMemberSex: "Male",
    profileMemberRole: "Son",
    profileMemberArtefacts: 5,
    profileMemberArtefactItem: [
      {
        "type": "letter",
        "title": "Letter from Bakka",
        "description": "What are we watching last night? I can not remember.",
        "main": "Lorem ipsum dolor sit amet, \n\nmagnis leo morbi viverra, enim curabitur massa amet libero sit, eu eros vitae orci, nam a semper elementum, integer maecenas. Vestibulum lorem dui nisl sed, pellentesque pellentesque primis sit vel luctus vel. Praesent adipiscing posuere lectus, metus imperdiet purus convallis amet condimentum, diam lacus. Commodo sed, pellentesque velit in. Hendrerit turpis vivamus ligula orci massa id, ut elementum eu ultrices nam. Pellentesque sodales elit risus libero, malesuada aptent a lectus dictum sed, fusce conubia luctus pede aliquam. Curae enim vitae, accumsan esse a quis quis, ullamcorper in nisl neque interdum sociosqu aliquam, a volutpat ipsum ante velit ut, consequat nec in quis penatibus. Orci wisi tortor, eros elit quisque donec, at donec ac. Velit nunc elit in risus nunc donec, justo erat, eu lacinia nulla id, amet pede lorem nisl in. Magna ac lectus vivamus faucibus vestibulum venenatis, nibh leo nunc, enim consectetuer dui eu hac aliquip. Ac aliquet eleifend a pede massa, ante nulla etiam vel in, aliquam consectetur, sit neque aliquet. Erat neque quam, dolor et tristique, lectus sit augue tortor, elementum cras sapien metus hendrerit. In malesuada mollis, lobortis tortor dignissim, consectetuer libero vivamus feugiat, habitasse ut arcu velit nec. Aliquet condimentum augue suspendisse pellentesque turpis, nisl faucibus nec consequat in, vehicula ac a suspendisse ornare, non aenean. Pellentesque vestibulum.",
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      },
      {
        "type": "picture",
        "title": "80s kid born",
        "description": "remember your birthday",
        "main": "../assets/images/" + "dark.png"
      }

    ].reverse()
  }

  _renderRow = ({item, index}) => {

    let total = this.state.profileMemberArtefactItem.length;

    return (
      <TouchableNativeFeedback style={{... styles.artCard, zIndex: total - index}} background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} onPress={this.testFirebase}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
  }

  testFirebase(){
    let baseContainer = new firebaseContainer();
    FamilyModelManage.getInstance().setFamily("Cao");
  }

  //eovniesbl 

  render() {

    return (
      <View style={{flex:1}}>
        <View style={styles.tContainer}>
          <View style={{width: "100%", flex: 1, backgroundColor: colors.SILVER}}>
            <Text>Top</Text>
          </View>
          <View style={{flex: 2, width: "100%", flexDirection: "row"}}>
            <View style={{height: "100%", flex: 8, padding:12}}>
              <View style={{height: "100%", flex: 1, flexDirection: "row"}}>
                <View style={{flex: 2, overflow: "hidden", justifyContent: "center", alignItems: "center"}}>
                  <Image source={require("../assets/images/" + "dark.png")} style={{width: 68, height: 68, borderRadius: 34}}></Image>
                </View>
                <View style={{flex: 7, paddingLeft: 12, flexDirection: "column", marginTop: 6}}>
                  <Text style={{marginTop: 6, fontSize: 26, color: colors.WHITE, marginLeft: 2}}>{this.state.profileMemberName + " " + this.state.lastName}</Text>
                  <View style={{flexDirection: "row", alignItems: "flex-start", marginTop: 3}}>
                    <View style={{backgroundColor: colors.LIGHTBLUE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8, marginRight: 6}}>
                      <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{this.state.profileMemberSex}</Text>
                    </View>
                    <View style={{backgroundColor: colors.ORANGE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8, marginRight: 6}}>
                      <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{this.state.profileMemberRole}</Text>
                    </View>
                    <View style={{backgroundColor: colors.DTPURPLE, height: 22, borderRadius: 11, paddingLeft: 8, paddingRight: 8}}>
                      <Text style={{fontSize: 13, color: colors.WHITE, marginTop: 2}}>{this.state.profileMemberArtefacts + " " + "Artefacts"}</Text>
                    </View>
                  </View>
                </View>



              </View>
            </View>


            <View style={{height: "100%", flex: 1}}>
              <TouchableNativeFeedback></TouchableNativeFeedback>

            </View>

          </View>

        </View>
        

        <View style={{justifyContent: "center", alignItems: "center", zIndex: 1}}>
          <View style={{justifyContent: "center", alignItems: "center", width: "100%", overflow: "visible", minHeight: 480, paddingTop: 36}}>
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
                slideStyle={{width: "92%", elevation: 16, borderRadius: 6}}
                
                
              />
          </View>
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
    height: 158,
    elevation: 8,
    zIndex: 2,
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  artCard: {
    width: 380,
    height: 350,
    borderRadius: 6
  }
});
