import React, {Component} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import colors from "../config/colors";
import strings from "../config/strings";
import * as WebBrowser from "expo-web-browser";
import { Icon } from 'native-base';
import Modal from "react-native-modal";
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

const optionDropdown = {
  flexDirection: 'row', 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center',
  marginLeft: 15,
}

const options = [
  'Cancel', 
  <View style={optionDropdown}>
    <FontAwesome name='street-view' size={20}/> 
    <View style={{flexDirection: 'column', flex: 1, marginLeft: 30}}>
      <Text style={{fontSize: 16, fontWeight: '400'}}>AR View</Text>
      <Text style={{fontSize: 12, fontWeight: 'normal'}}>Experience Augmented Reality (In experiment)</Text>
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
    modalVisible: false,
  }

  // display action sheet
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  // update the modal for sharing
  toggleModal = () => {
    this.state.modalVisible = !this.state.modalVisible;
    this.forceUpdate();
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
        </ScrollView>
        </View>

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.toggleModal()}
          animationIn="slideInDown"
          animationOut="fadeOutUp"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
            <TouchableNativeFeedback onPress={() => this._shareToFacebook(2)}>
              <Entypo name="facebook" size={40} style={{color: colors.LIGHTBLUE}} />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this._shareToTwitter(2)}>
              <Entypo name="twitter" size={40} style={{color: colors.LIGHTBLUE}} />
            </TouchableNativeFeedback>
          </View>
        </Modal>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={(index) => { 
            switch (index) {
              case 1:
                alert("Feature still in development ^_^");
                break;
              case 2:
                // share on facebook or twitter
                this.toggleModal();
                break;
              case 3:
                // delete item
                alert("Are you sure to delete?");
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
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: colors.WHITE,
  },
});