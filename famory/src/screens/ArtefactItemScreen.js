import React, {Component} from "react";
import { Text, StyleSheet, View, ScrollView, Clipboard, TouchableOpacity, CameraRoll } from "react-native";
import colors from "../config/colors";
import strings from "../config/strings";
import * as WebBrowser from "expo-web-browser";
import { Icon } from 'native-base';
import Modal from "react-native-modal";

import { Entypo, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Wechat from "../assets/icons/wechat";
import Messenger from "../assets/icons/messenger";
import GMail from "../assets/icons/gmail";
import Instagram from "../assets/icons/instagram";

import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const optionDropdown = {
  flexDirection: 'row', 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center',
  marginLeft: 15,
}

let options = [
  'Cancel', 
  <View style={optionDropdown}>
    <MaterialIcons name='3d-rotation' size={20}/> 
    <View style={{flexDirection: 'column', flex: 1, marginLeft: 30}}>
      <Text style={{fontSize: 16, fontWeight: '400'}}>Visualisation</Text>
      <Text style={{fontSize: 12, fontWeight: 'normal'}}>Experience 3D Model (In experiment)</Text>
    </View>
  </View>, 
  <View style={optionDropdown}>
    <AntDesign name='sharealt' size={20} /> 
    <View style={{flexDirection: 'column', flex: 1, marginLeft: 27}}>
      <Text style={{fontSize: 16, fontWeight: '400'}}>Share Artefact</Text>
    </View>
  </View>,
  <View style={optionDropdown}>
    <AntDesign name='delete' size={20} style={{color: 'red'}}/> 
    <View style={{flexDirection: 'column', flex: 1, marginLeft: 27}}>
      <Text style={{fontSize: 16, fontWeight: '400', color: 'red'}}>Delete Item</Text>
    </View>
  </View>,
]


export default class ArtefactItem extends Component{
  static navigationOptions = {
    header: null
  }

  state = {
    artefactItem: this.props.navigation.getParam("item", null),
    videoFinishedLoading: false,
    width: 300,
    height: 350,
    arVisible: false,
  }

  // display action sheet
  showActionSheet = () => {
    this.ActionSheet.show();
  }

  // update the modal for sharing
  toggleModal = () => {
    this.state.modalVisible = !this.state.modalVisible;
    this.forceUpdate();
  };

  // update the modal for AR web view
  toggleAR = () => {
    this.state.arVisible = !this.state.arVisible;
    this.forceUpdate();
  };

  // function to share to social media
  // opens browser and copies text to clipboard
  _shareToSocialMedia = async (link) => {
    Clipboard.setString("Check out this wonderful Artefact from my ancestor!" +
      " Check out Famory, the best family artefact app in the world: " + strings.DOWNLOADLINK);
    await FileSystem.downloadAsync(
      this.state.artefactItem.content,
      FileSystem.documentDirectory + 'artefact.png'
    )
      .then(async ({ uri }) => {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
          CameraRoll.saveToCameraRoll(uri).then((uriGallery) => {
            // here you have the url of the gallery to be able to use it
            console.log('Finished downloading to ', uriGallery);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    await WebBrowser.openBrowserAsync(link, {showTitle: true});
  };

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={{paddingTop: 26, paddingHorizontal: 12, flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
          <TouchableNativeFeedback style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={this.props.navigation.goBack}>
            <Icon name='close' />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback style={{width: 50, height: 50, justifyContent: "center", alignItems: "center"}} background={TouchableNativeFeedback.Ripple(colors.MISCHKA, true)} onPress={() => this.showActionSheet()}>
            <Entypo name="dots-three-horizontal" size={26} style={{marginLeft: -10, opacity: 0.8}} />
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
              </View>: this.state.artefactItem.type == "text"? 
              <View style={{marginHorizontal: 29, marginVertical: 19, flexDirection: "column", minHeight: 870, overflow: "visible"}}>
                <Text style={{lineHeight: 32, fontSize: 23, color: "#6c6c6c"}}>
                  {this.state.artefactItem.name}
                </Text>
                <Text style={{lineHeight: 32, fontSize: 18, color: "#6c6c6c", marginTop: 32}}>
                  {this.state.artefactItem.content}
                </Text>
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
              :
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

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.toggleModal()}
          animationIn="slideInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.FACEBOOK)}>
              <Entypo name="facebook" size={44} style={{color: "#3B5998"}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.TWITTER)} style={{marginLeft: 50,}}>
              <Entypo name="twitter" size={44} style={{color: "#1DA1F2"}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.WECHAT)} style={{marginLeft: 50,}}>
              <Wechat />
            </TouchableOpacity>
          </View>
          <View style={{flex:1, justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.GMAIL)}>
              <GMail />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.INSTAGRAM)} style={{marginLeft: 50,}}>
              <Instagram />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._shareToSocialMedia(strings.MESSENGER)} style={{marginLeft: 50,}}>
              <Messenger />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.arVisible}
          onBackdropPress={() => this.toggleAR()}
          animationIn="slideInUp"
          animationOut="fadeOutDown"
          style={styles.arStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
            <WebView source={{ uri: strings.ARLINK }} />
          </View>
        </Modal>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          styles={{backgroundColor: "#F8F8FF"}}
          destructiveButtonIndex={4}
          onPress={(index) => { 
            switch (index) {
              case 1:
                // AR
                this.toggleAR();
                break;
              case 2:
                // share on facebook or twitter
                this.toggleModal();
                break;
              case 3:
                // delete item
                this.props.navigation.getParam("profileScreen", null).state.memberModel.deleteItem(() => {
                  this.props.navigation.getParam("member", null).updateSelf(
                    (updatedMember) => {
                      this.props.navigation.getParam("profileScreen", null).setModel(updatedMember);
                      this.props.navigation.goBack();
                    }
                  )
                }, this.state.artefactItem)
                break;
              default:
                // nothing
            }
          }}
        />

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
  },
  modalStyle: {
    justifyContent: "center",
    position: 'absolute',
    bottom: -18,
    height: 120,
    width: 365,
    marginLeft: 0,
    backgroundColor: "#F8F8FF",
  },
  arStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 100,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
});