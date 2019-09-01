import React, {Component} from "react";
import { View , Alert, Text} from "react-native";
import Modal from "react-native-modal";
import { Avatar } from "react-native-elements";
import ImageButton from "../components/ImageButton";
import cxk from "../assets/images/logo.png"
import colors from "../config/colors";
import Button from "../components/Button";

export default class TestScreen extends Component{
  static navigationOptions = {
    header: null
  };

  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  //sadfafasfas
  render() {
    return (
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>
        <Button label="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible} style={{marginVertical:170, backgroundColor:colors.WHITE, borderRadius:15, justifyContent:"center"}}>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <View style={{flex:4, flexDirection:"row", marginVertical:10}}>
              <View style={{marginHorizontal:10}}>
                <Avatar
                icon={{name:"more-horiz", type:"material"}} 
                rounded
                size={"medium"}/>
              </View>

              <Avatar
              icon={{name:"more-horiz", type:"material"}} 
              rounded
              size={"medium"}/>
            </View>

            <View style={{flex:1}}>
              <Button label="Hide modal" onPress={this.toggleModal} extraStyles={{backgroundColor:colors.TORCH_RED, marginVertical:10}}/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};