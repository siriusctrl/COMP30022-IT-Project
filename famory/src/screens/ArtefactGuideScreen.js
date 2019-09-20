import React, {Component} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { Button, Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class ArtefactGuide extends Component{

  static navigationOptions = {
    header: null
  }

  state = {
    selected: 0,
    currentStage: "addArtefactFromNewInitial",
    currentPurpose: "addNewArtefact",
  }

  initialStage = {
    addNewArtefact: "addArtefactFromNewInitial"
  }

  switchSelection = (id) => {
    this.state.selected = id;
    this.forceUpdate();
  }

  stages = {
    
    "addArtefactFromNewInitial": {
      "title": "Select artefact type",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 49}}>
          <View style={guideStyle.selectionBox}>
            {(this.state.selected == 0) ? (
              <TouchableOpacity style={guideStyle.selectedBox} onPress={() => this.switchSelection(0)}>
                <FontAwesome name="pencil-square-o" size={44} color="green" style={{marginLeft: -10}} />
                <Text style={guideStyle.textBox}>Texts</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={guideStyle.box} onPress={() => this.switchSelection(0)}>
                <FontAwesome name="pencil-square-o" size={44} color="green" style={{marginLeft: -10, opacity: 0.3}} />
                <Text style={guideStyle.unselectedText}>Texts</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                borderBottomColor: colors.SILVER,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            {(this.state.selected == 1) ? (
              <TouchableOpacity style={guideStyle.selectedBox} onPress={() => this.switchSelection(1)}>
                <Ionicons name="md-images" size={44} color="orange" />
                <Text style={guideStyle.textBox}>Photos</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={guideStyle.box} onPress={() => this.switchSelection(1)}>
                <Ionicons name="md-images" size={44} color="orange" style={{opacity: 0.3}} />
                <Text style={guideStyle.unselectedText}>Photos</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                borderBottomColor: colors.SILVER,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            {(this.state.selected == 2) ? (
              <TouchableOpacity style={guideStyle.selectedBox} onPress={() => this.switchSelection(2)}>
                <FontAwesome name="file-video-o" size={44} color="blue" />
                <Text style={guideStyle.textBox}>Videos</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={guideStyle.box} onPress={() => this.switchSelection(2)}>
                <FontAwesome name="file-video-o" size={44} color="blue" style={{opacity: 0.3}} />
                <Text style={guideStyle.unselectedText}>Videos</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)}>
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>Back</Text>
            </Button>
            <Button iconRight light onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.bottomButtonRight}>Next</Text>
              <Icon name='arrow-forward' style={{marginRight: 15}} />
            </Button>
            
          </View>
        </View>
      ,
      "next": {
        "addNewArtefact": "",
      },
      "back": {
        "addNewArtefact": "",
      }

    },
    
  }

  // for change the state,
  // back == true then back
  _changeStage(back){
    let now = "next";
    if (back) {
      now = "back";
    }

    nextStage = this.stages[this.state.currentStage][now][this.state.currentPurpose]

    if(nextStage && nextStage != FINISH){
        this.setState(
          {
            ... this.state,
            currentStage: nextStage,
          }
        );
    }else if(nextStage == FINISH){
      this._finish(this.state.currentPurpose);
    }else{
      alert("WHAT STAGE NEXT?");
    }
  }

  // after finish, just fill this.FINISH to the "next" stage
  _finish = (purpose) => {
    alert("finished" + purpose);
  }

  // change text, give a object and the update specific text
  _changeText = (te) => {
    this.setState(
      {
        ... this.state,
        ... te
      }
    );

  }

  render() {
    return(
      <View style={{flexDirection: "column", flex: 1}}>

        <View style={{paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <Icon name='close' />
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={{paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16}}>
            <Text style={{flex: 1, width: "85%", opacity: 1, textAlignVertical: "bottom", fontSize: 28, color: colors.HOMESCREENLIGHTBLUE}}>{this.stages[this.state.currentStage]["title"]}</Text>
          </View>
          {this.stages[this.state.currentStage]["view"]()}
        </View>
      </View>
    )
  }
}

const FINISH = "finish";

const guideStyle = StyleSheet.create({
  bottomButtonLeft: {
    height: 58, 
    width: 76, 
    textAlign: "center", 
    textAlignVertical: "center", 
    color: colors.DODGER_BLUE, 
    fontSize: 16,
    marginLeft: 8
  },
  bottomButtonRight: {
    height: 58, 
    width: 68, 
    textAlign: "center", 
    textAlignVertical: "center", 
    color: colors.DODGER_BLUE, 
    fontSize: 16
  },
  bottomButtonCn: {
    paddingHorizontal: 20, 
    paddingBottom: 26, 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  selectionBox: {
    paddingHorizontal: 36, 
    flex: 3, 
    marginTop: -50,
  }, 
  box: {
    flex: 1,
    padding: 7,
    marginBottom: 5,
    height: 60,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
  }, 
  textBox: {
    fontSize: 26, 
    alignItems: 'center', 
    justifyContent: 'center',
    textShadowColor: colors.SILVER,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginLeft: 50,
  },
  unselectedText: {
    fontSize: 26, 
    alignItems: 'center', 
    justifyContent: 'center',
    textShadowColor: colors.SILVER,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginLeft: 50,
    opacity: 0.3,
  },
  selectedBox: {
    flex: 1,
    padding: 7,
    marginBottom: 5,
    marginTop: 5,
    height: 60,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#f5f5f5",
  }
});