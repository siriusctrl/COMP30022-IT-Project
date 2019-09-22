import React, {Component} from "react";
import { Text, Image, StyleSheet, View, ScrollView} from "react-native";
import colors from "../config/colors";
import { Icon } from 'react-native-elements'


import { Video } from 'expo-av';
import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";

export default class ArtefactItem extends Component{
  static navigationOptions = {
    header: null
  }

  state = {
    artefactItem: this.props.navigation.getParam("item", null),
    videoFinishedLoading: false,
    width: 350,
    height: 350

  }

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={{paddingTop: 26, paddingHorizontal: 12, flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
          <TouchableNativeFeedback style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={this.props.navigation.goBack}>
            <Icon name='clear' />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={this.props.navigation.goBack}>
            <Icon name='more-horiz' />
          </TouchableNativeFeedback>
        </View>
        <View style={{flex: 7, overflow: "visible"}}>
        <ScrollView style={{flex: 1, overflow: "visible"}}>
        {this.state.artefactItem.type == "video"? 
        <View style={{marginHorizontal: 29, marginVertical: 19, marginBottom: 68, flexDirection: "column", minHeight: 870, overflow: "visible"}}>
          <Video
              source={{ uri: this.state.artefactItem.content }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              useNativeControls={true}
              isLooping={false}

              onReadyForDisplay={(vid) => {
                this.setState({
                  height: this.state.width * vid.naturalSize.height / vid.naturalSize.width
                })
              }}
              

              style={{width: this.state.width, height: this.state.height}}

            />
            <Text style={{color: colors.AGRAY, marginTop: 36, fontStyle: "italic"}}>{this.state.artefactItem.description}</Text>
            <View style={{marginTop: 58}}>
              <Text style={{color: colors.AGRAY}}>DETAIL</Text>
              <View
              style={{
                borderBottomColor: colors.AGRAY,
                borderBottomWidth: 0.5,
              }}
            />
              <View style={{marginTop: 17}}>
                <Text style={{color: colors.AGRAY}}>CREATE DATE</Text>
                <Text style={{color: colors.AGRAY}}>{this.state.artefactItem.dateAdded}</Text>
              </View>
            </View>
          </View>:
          <View style={{marginHorizontal: 29, marginVertical: 19, flexDirection: "column", minHeight: 870, overflow: "visible"}}>
            <ArtCard item={this.state.artefactItem} style={styles.artCard}/>
            <Text style={{color: colors.AGRAY, marginTop: 36, fontStyle: "italic"}}>{this.state.artefactItem.description}</Text>
            <View style={{marginTop: 58}}>
              <Text style={{color: colors.AGRAY}}>DETAIL</Text>
              <View
              style={{
                borderBottomColor: colors.AGRAY,
                borderBottomWidth: 0.5,
              }}
            />
              <View style={{marginTop: 17}}>
                <Text style={{color: colors.AGRAY}}>CREATE DATE</Text>
                <Text style={{color: colors.AGRAY}}>{this.state.artefactItem.dateAdded}</Text>
              </View>
            </View>
          </View>
        
        }
          
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