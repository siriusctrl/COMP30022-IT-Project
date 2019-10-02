import React, {Component} from "react";
import { Text, Image, StyleSheet, View , Alert, KeyboardAvoidingView, ImageBackground, Button} from "react-native";
import firebaseContainer from "../controller/firebaseConfig"
import firebase from "firebase";

import FamilyAccountModelManage from "../controller/FamilyAccountModel"
import MemberModelManage from "../controller/MemberModel"
import RNTextDetector from "react-native-text-detector";
import {_pickImagea} from "../controller/fileUtilitiesSync"

import RNTesseractOcr from 'react-native-tesseract-ocr';


export default class TestFirebase extends Component{

  state = {
    familyAccount: null,
    familyAccountRdy: false,
  }

  componentDidMount(){
  }

  detectText = async () => {
    const tessOptions = {
      whitelist: null, 
      blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
    };
    const { uri } = await _pickImagea();
    alert(uri)
    let result = await RNTesseractOcr.recognize(uri, "LANG_ENGLISH", tessOptions)
    this.setState({ ocrResult: await result });
  }

  detectTexta = async () => {
    try {
      firebaseContainer.getInstance().justStart();
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const visionResp = await RNTextDetector.detectFromUri(uri);
      alert(visionResp)
      this.setState({visionResp: visionResp})
    } catch (e) {
      console.warn(e);
    }
  };

  static navigationOptions = {
    header: null
  };

  getFamilyAccount = () => {
    
    FamilyAccountModelManage.getInstance().getFamilyAccount((familyAccount) => {
      this.setState({familyAccount: familyAccount, familyAccountRdy: true});
      alert(familyAccount.name)
    });
  }

  getMembr = () => {
    MemberModelManage.getInstance().getMember((member) => {
      this.setState({memberModel: member, memberModelRdy: true});
      alert(member.generation)
    }, this.state.familyAccount.familyMember["0"]);
  }


  render() {

    return (
      <View style={{flex:1, paddingHorizontal: "12%"}}>
        <Button title="get family" onPress={() => {
          firebaseContainer.getInstance().justStart();
          this.getFamilyAccount();

        }}></Button>

        {this.state.familyAccountRdy? 
        <View>
          <Text>{this.state.familyAccount.email}</Text>
          <Text>{this.state.familyAccount.name}</Text>
          <Text>{this.state.familyAccount.achievement["1"]["dateCompleted"]}</Text>
        </View>
          : <Text></Text>
        }

        <Button title="get member" onPress={() => {
          firebaseContainer.getInstance().justStart();
          this.getMembr();

        }}></Button>

        {this.state.memberModelRdy? 
        <View style={{flexDirection:"row"}}>
          <Text>{this.state.memberModel.firstName}</Text>
          <Text>{" "}</Text>
          <Text>{this.state.memberModel.lastName}</Text>
        </View>
          : <Text></Text>
        }

        <Button title="chenge member name to Niubi" onPress={() => {
          firebaseContainer.getInstance().justStart();
          this.state.memberModel.updateFirstName("Niubi");
        }}></Button>

        <Button title="read them" onPress={this.detectText}></Button>

        {this.state.visionResp? <Text>{this.state.visionResp}</Text>: <Text></Text>}

      </View>
    );
  }
}