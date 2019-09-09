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
    artefactItem: {
      "type": "letter",
      "title": "A letter",
      "description": "test letter",
      "main": "Lorem ipsum dolor sit amet, mi sit wisi nesciunt interdum in. Id imperdiet rutrum, dolor aenean nunc, massa maecenas neque rutrum at eu, vel condimentum amet hymenaeos. Adipiscing tincidunt magna et hendrerit viverra ut, sollicitudin nulla suscipit ac, magna ac. Amet tincidunt purus luctus elit, nec auctor tincidunt dapibus, elit lobortis ornare nunc in etiam sodales, tristique vitae aliquam id parturient. Tortor volutpat, leo ligula maecenas officiis voluptas, risus nullam nulla.\n Hymenaeos imperdiet tristique lorem interdum pede, eget wisi dolor est suspendisse a consequat, purus incidunt felis. Dolor ut per sit aliquet integer, at mi. Facilisis conubia neque, dui sed pellentesque ut. Velit odio, in laoreet, gravida eget nibh odio."
    }
  }

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={{paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <Icon name='clear' />
        </View>
        <View style={{flex: 7, paddingHorizontal: 29}}>
        <ScrollView>
          <ArtCard item={this.state.artefactItem} style={styles.artCard} numberOfLines={-1}/>
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
    height: "100%",
    borderRadius: 6
  },
  artCardDisplay: {
    borderRadius: 6,
    elevation: 16,
    flex: 6
  }
});