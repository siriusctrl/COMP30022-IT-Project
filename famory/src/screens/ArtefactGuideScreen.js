import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import { Button, Icon, ListItem, Body } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import firebase from "firebase";
import firebaseContainer from "../controller/firebaseConfig";
import * as ImagePicker from 'expo-image-picker';

export default class ArtefactGuide extends Component{

  static navigationOptions = {
    header: null
  }

  state = {
    selected: 0,
    name: "",
    description: "",
    item: "https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/post-3.jpg?alt=media&token=76e4cd81-d3ba-46ea-9346-890659cf7714",
    uploaded: false,
    textArtefact: "",
    currentStage: "addArtefactFromNewInitial",
    currentPurpose: "addNewArtefact",
  };

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
        "addNewArtefact": "addArtefactMetadata",
      },
      "back": {
        "addNewArtefact": "",
      }
    },

    "addArtefactMetadata": {
      "title": "Artefact metadata",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 49}}>
          <View>
            <ListItem noBorder>
              <Body>
                <Text style={guideStyle.greyText}>Item Title</Text>
                <TextInput
                  style={guideStyle.blackText}
                  onChangeText={(text) => this.setState({name: text})}
                  placeholder="Your artefact name"
                  placeholderTextColor={"#D3D3D3"}
                  maxLength={30}
                  value={this.state.text}
                />
                <Text style={{
                fontSize:12,
                color:'lightgrey',
                textAlign: 'right',
                marginTop: 5,
                marginLeft: -5
                }}> 
                  {this.state.name.length}{" "}/{" "}30 
                </Text>
              </Body>
            </ListItem>

            <ListItem noBorder>
              <Body>
              <Text style={guideStyle.greyText}>Item description</Text>
              <TextInput
                style={guideStyle.blackTextLong}
                onChangeText={(text) => this.setState({description: text})}
                placeholder="Type something here..."
                placeholderTextColor={"#D3D3D3"}
                multiline={true}
                numberOfLines={4}
                maxLength={120}
                value={this.state.text}
              />
              <Text style={{
                fontSize:12,
                color:'lightgrey',
                textAlign: 'right',
                marginTop: 5,
                marginLeft: -5
              }}> 
                {this.state.description.length}{" "}/{" "}120 
              </Text>
              </Body>
            </ListItem>
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
      "textnext": {
        "addNewArtefact": "uploadText",
      },
      "videonext": {
        "addNewArtefact": "addArtefactFromNewInitial",
      },
      "photonext": {
        "addNewArtefact": "uploadImage",
      },
      "back": {
        "addNewArtefact": "addArtefactFromNewInitial",
      }
    },

    "uploadText": {
      "title": "Memoir Upload",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 10}}>
          <ImageBackground 
            source={require("../assets/images/text-artefact-1.jpeg")} 
            style={{width: '100%', height: '94%', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 10, marginLeft: 10, marginTop: -40}}
          >
            <TextInput
              style={guideStyle.artefactText}
              onChangeText={(text) => this.setState({textArtefact: text})}
              placeholder="Cherish the memories..."
              placeholderTextColor={"#808080"}
              multiline={true}
              numberOfLines={8}
              maxLength={400}
              value={this.state.text}
            />
          </ImageBackground>

          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)}>
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>Back</Text>
            </Button>
            <Button iconRight light onPress={() => alert("Finished!")}>
              <Text style={guideStyle.finishButton}>DONE</Text>
              <Icon name='arrow-forward' style={{marginRight: 15}} />
            </Button>
            
          </View>
        </View>
      ,
      "next": {
        "addNewArtefact": "",
      },
      "back": {
        "addNewArtefact": "addArtefactMetadata",
      }
    },

    "uploadImage": {
      "title": "Image Upload",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 10}}>
          {(this.state.uploaded) ? (
            <TouchableOpacity style={guideStyle.uploadBox} onPress={this._upload} >
              <Image source={{uri: this.state.item}}></Image>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={guideStyle.uploadBox} onPress={this._upload} >
              <Ionicons name="md-images" size={44} color="orange" />
              <Text style={guideStyle.uploadText}>Browse</Text>
            </TouchableOpacity>
          )}

          <Image source={{uri: this.state.item}}></Image>

          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)} >
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>Back</Text>
            </Button>
            <Button iconRight light onPress={() => alert("Finished!")} style={{opacity: 0}}>
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
        "addNewArtefact": "addArtefactMetadata",
      }
    },
    
  }

  // for change the state,
  // back == true then back
  _changeStage(back){
    let now = "next";
    if (back) {
      now = "back";
    } else if (this.state.currentStage === "addArtefactMetadata") {
      // need to go to upload page in response to different selections
      if (this.state.selected == 0) {
        now = "textnext";
      } else if (this.state.selected == 1) {
        now = "photonext";
      } else {
        now = "videonext";
      }
    }

    nextStage = this.stages[this.state.currentStage][now][this.state.currentPurpose];

    if (nextStage && nextStage != FINISH){
        this.setState(
          {
            ... this.state,
            currentStage: nextStage,
          }
        );
    } else if(nextStage == FINISH){
      this._finish(this.state.currentPurpose);
    } else{
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

  // upload image or video from local system
  _upload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (!result.cancelled) {
      this.state.item = result.uri;
      this.state.uploaded = true;
      this.forceUpdate();
    };
    firebaseContainer.getInstance().justStart();
    alert(this.state.item);
    if (!result.cancelled) {
      // upload item to firebase
      uploadUrl = await _uploadToFirebase(result.uri);
      return uploadUrl;
    }
  }

  render() {
    return(
      <View style={{flexDirection: "column", flex: 1}}>
        <Image source={{uri: this.state.item}}></Image>
        <Image source={{uri: this.state.item}}></Image>
        <Image source={{uri: this.state.item}}></Image>
        <View style={{paddingTop: 26, paddingHorizontal: 26, flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
          <Icon name='close' />
        </View>
        <View style={{flex: 8, width: "100%", flexDirection: "column", paddingLeft: 2}}>
          <View style={{paddingHorizontal: 28, flex: 1, flexDirection:"column", justifyConytent: "flex-end", alignItems: "flex-start", paddingBottom: 16}}>
            <Text style={{flex: 1, width: "85%", opacity: 1, fontSize: 28, color: colors.HOMESCREENLIGHTBLUE, marginTop: 25}}>{this.stages[this.state.currentStage]["title"]}</Text>
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
  finishButton: {
    height: 58, 
    width: 68, 
    textAlign: "center", 
    textAlignVertical: "center", 
    color: 'green', 
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
  uploadText: {
    fontSize: 26, 
    alignItems: 'center', 
    justifyContent: 'center',
    color: colors.SILVER,
    marginTop: 5,
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
  },
  greyText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#878B90",
  },
  blackText: {
    marginLeft: 10,
    marginTop:10,
    paddingBottom:4,
    fontSize: 16,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    height: 40,
  },
  blackTextLong: {
    marginLeft: 10,
    marginTop:10,
    paddingBottom:4,
    fontSize: 16,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    height: 60,
  },
  artefactText: {
    marginLeft: 40,
    marginTop: -150,
    fontSize: 22,
    width: 240,
    height: 340,
    letterSpacing: 2,
    fontFamily: 'almond',
  }, 
  uploadBox: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 220,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  avatar: {
    resizeMode: "contain",
    alignSelf: "center",
  },
});

_uploadToFirebase = async uri => {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  // randomly generate a suffix for artefact using crypto
  var rdmString = "";
  for( ;rdmString.length < 11; rdmString  += Math.random().toString(36).substr(2));
  const ref = firebase
    .storage()
    .ref()
    .child('artefact_' + rdmString.substr(0, 11));
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}