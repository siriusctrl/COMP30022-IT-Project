import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, ScrollView} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../config/colors";
import { Icon, ListItem } from 'react-native-elements'
import firebaseContainer from "../controller/firebaseConfig"
import { FamilyModelManage } from "../controller/FamilyModel"
import * as firebase from "firebase";

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";

export default class ArtefactItem extends Component{
  static navigationOptions = {
    header: null
  }

  state = {
    artefactItem: this.props.navigation.getParam("item", null)
  }

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={{paddingTop: 26, paddingHorizontal: 12, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <TouchableNativeFeedback style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={this.props.navigation.goBack}>
            <Icon name='clear' />
          </TouchableNativeFeedback>
        </View>
        <View style={{flex: 7, overflow: "visible"}}>
        <ScrollView style={{flex: 1, overflow: "visible"}}>
          <View style={{marginHorizontal: 29, marginVertical: 19, flexDirection: "column", minHeight: 870, overflow: "visible"}}>
            <ArtCard item={this.state.artefactItem} style={styles.artCard}/>
            <View style={{marginTop: 58}}>
              <Text>Owner</Text>
            </View>
          </View>
        </ScrollView>
        </View>
      </View>
    )
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
    width: "100%",
    borderRadius: 6,
    elevation: 16
  },
  artCardDisplay: {
    borderRadius: 6,
    elevation: 16,
    flex: 6
  }
});