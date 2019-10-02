import React, { Component, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image } from "react-native";
import colors from "../config/colors";
import { Button, Icon, ListItem, Body } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import { Video } from 'expo-av';
import { _handleItemPicked, _pickVideo, _uploadToFirebase, _pickImage, _uploadItem } from "../controller/fileUtilitiesSync"

import ItemModelManage from "../controller/ItemModel";

export default class ArtefactGuide extends Component{

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    if(this.props.navigation.getParam("member", null)){
      this.setState({
        memberModel: this.props.navigation.getParam("member", null)
      })
    }
    alert(this.props.navigation.getParam("member", null))
  }

  state = {
    selected: 0,
    name: "",
    description: "",
    preview: null,
    content: null,
    imageuploaded: false,
    videoUploaded: false,
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
            <Button iconLeft light style={{opacity: 0}}>
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
        "addNewArtefact": "uploadVideo",
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
              onChangeText={(text) => this.setState({content: text})}
              placeholder="Cherish the memories..."
              placeholderTextColor={"#808080"}
              multiline={true}
              numberOfLines={8}
              maxLength={400}
              value={this.state.content}
            />
          </ImageBackground>

          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)}>
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>Back</Text>
            </Button>
            <Button iconRight success onPress={() => this._changeStage(false)}>
              <Text style={guideStyle.finishButton}>DONE</Text>
            </Button>
            
          </View>
        </View>
      ,
      "next": {
        "addNewArtefact": FINISH,
      },
      "back": {
        "addNewArtefact": "addArtefactMetadata",
      }
    },

    "uploadImage": {
      "title": "Image Upload",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 10}}>
          {(this.state.preview != null && !this.state.preview.cancelled) ? (
            <Image source={{uri: this.state.preview.uri}} 
              style={{
                flexDirection: 'column', 
                flex: 3, 
                height: 260, 
                width: 300,
                resizeMode: 'stretch',
                marginLeft: 28,
                marginTop: -50,
                borderRadius: 12,
              }} />
          ) : (
            <TouchableOpacity style={guideStyle.uploadBox} onPress={async () => {
              let result = await _pickImage();
              if (!result.cancelled) {
                this.setState(
                  {
                    preview: result
                  }
                )
              };
            }} >
              <Ionicons name="md-images" size={44} color="orange" />
              <Text style={guideStyle.uploadText}>Browse</Text>
            </TouchableOpacity>
          )}

          {(this.state.preview != null && !this.state.preview.cancelled) ? (
            <Button warning onPress={
              async () => {
              let result = await _pickImage();
              if (!result.cancelled) {
                this.setState(
                  {
                    preview: result
                  }
                )
              };
            }
            } style={{marginTop: 15, width: 140, height: 48, borderRadius: 12, marginLeft: 105,}}>
              <Text style={{textAlign: "center", textAlignVertical: "center", fontSize: 16, color: '#fff', marginLeft: 20,}}>Change Image</Text>
            </Button>
          ) : null }

          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)} >
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>BACK</Text>
            </Button>
            {(this.state.preview != null && !this.state.preview.cancelled) ? (
              <Button iconRight success onPress={() => this._changeStage(false)} >
                <Text style={guideStyle.finishButton}>DONE</Text>
              </Button>
            ) : (
              <Button iconRight light onPress={() => {}} style={{opacity: 0}}>
                <Text style={guideStyle.bottomButtonRight}>NEXT</Text>
                <Icon name='arrow-forward' style={{marginRight: 15}} />
              </Button>
            )}
          </View>
        </View>
      ,
      "next": {
        "addNewArtefact": FINISH,
      },
      "back": {
        "addNewArtefact": "addArtefactMetadata",
      }
    },

    "uploadVideo": {
      "title": "Videoclip Upload",
      "view": () =>
        <View style={{flex: 4, flexDirection: "column", paddingTop: 10}}>
          {(this.state.preview != null && !this.state.preview.cancelled) ? (
            <Video
              source={{ uri: this.state.preview.uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="Video.RESIZE_MODE_CONTAIN"
              useNativeControls={true}
              isLooping={true}
              style={{ width: 300, height: 260, marginTop: -50, marginLeft: 28, flex: 3 }}
            />
          ) : (
            <TouchableOpacity style={guideStyle.uploadBox} onPress={
              async () => {
                let result = await _pickVideo();
                if (!result.cancelled) {
                  this.setState(
                    {
                      preview: result
                    }
                  )
                };
              }
            } >
              <FontAwesome name="file-video-o" size={44} color="blue" />
              <Text style={guideStyle.uploadText}>Browse</Text>
            </TouchableOpacity>
          )}

          {(this.state.preview != null && !this.state.preview.cancelled) ? (
            <Button warning onPress={
              async () => {
                let result = await _pickVideo();
                if (!result.cancelled) {
                  this.setState(
                    {
                      preview: result
                    }
                  )
                };
              }
            } style={{marginTop: 15, width: 140, height: 48, borderRadius: 12, marginLeft: 105,}}>
              <Text style={{textAlign: "center", textAlignVertical: "center", fontSize: 16, color: '#fff', marginLeft: 20,}}>Change Video</Text>
            </Button>
          ) : null }

          <View style={guideStyle.bottomButtonCn}>
            <Button iconLeft light onPress={() => this._changeStage(true)} >
              <Icon name='arrow-back' />
              <Text style={guideStyle.bottomButtonLeft}>BACK</Text>
            </Button>
            {(this.state.preview != null && !this.state.preview.cancelled) ? (
              <Button iconRight success onPress={() => this._changeStage(false)} >
                <Text style={guideStyle.finishButton}>DONE</Text>
              </Button>
            ) : (
              <Button iconRight light onPress={() => {}} style={{opacity: 0}}>
                <Text style={guideStyle.bottomButtonRight}>NEXT</Text>
                <Icon name='arrow-forward' style={{marginRight: 15}} />
              </Button>
            )}
          </View>
        </View>
      ,
      "next": {
        "addNewArtefact": FINISH,
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
      this.setState(
        {
          preview: null,
          content: null,
        }
      )
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

    let getStringDate = (date) => {
      return date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + (date.getDate()).toString()
    }

    let member = this.state.memberModel

    let t = {
      0: "text", 1: "image", 2: "video"
    }[this.state.selected]

    let details = {
      content: this.state.content,
      dateAdded: getStringDate(new Date()),
      description: this.state.description,
      name: this.state.name
    }

    if (this.state.selected != 0){
      _uploadItem(this.state.preview, (uri) => {
        alert(uri)
        ItemModelManage.getInstance().setItem((item) => {
          member.updateSelf(
            (updatedMember) => {
              this.props.navigation.getParam("profileScreen", null).setModel(updatedMember)
              this.props.navigation.goBack()
            }
          )
        }, 
        { ... details, content: uri}, member, t);
      });
    }else{
      ItemModelManage.getInstance().setItem(() => {
        member.updateSelf(
          (updatedMember) => {
            this.props.navigation.getParam("profileScreen", null).setModel(updatedMember)
            this.props.navigation.goBack()
          }
        )
      }, details, member, t);
    }

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
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
            <Icon name='close' />
          </TouchableNativeFeedback>
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
    borderRadius: 10,
  },
  bottomButtonRight: {
    height: 58, 
    width: 68, 
    textAlign: "center", 
    textAlignVertical: "center", 
    color: colors.DODGER_BLUE, 
    fontSize: 16,
  },
  finishButton: {
    height: 58, 
    width: 123, 
    textAlign: "center", 
    textAlignVertical: "center", 
    color: 'white', 
    fontSize: 16,
  },
  bottomButtonCn: {
    paddingHorizontal: 20, 
    paddingBottom: 16, 
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
    flex: 3,
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