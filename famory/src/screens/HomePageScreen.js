import React, {Component} from "react";
import { Text, View, FlatList, StyleSheet, Alert} from "react-native";
import Modal from "react-native-modal";

import colors from "../config/colors";
import strings from "../config/strings";
import IconButtonWithText from "../components/IconButtonWithText";
import Empty from "../components/Empty";
import ImageButton from "../components/ImageButton";
import cxk from "../assets/images/cxk-circle.png";
import { Avatar } from "react-native-elements";
import Button from "../components/Button";



export default class HomePageScreen extends Component{
  state = {
    visibleModal: false,
    mode: "view",
  };

  static navigationOptions = {
    header: null
  }
  
  //laod avatar info from server
  async componentDidMount() {
    if (this.avatar.length > 5){
      this.avatar.push({empyt:"yes", gen:" "})
      this.avatar.push({empyt:"yes", gen:" "})
    }
  }

  avatar = [
    {empyt:"yes", gen:" "},
    {name:["Pending1"], img:[cxk, cxk, cxk, cxk, cxk], boarderColor:[colors.DODGER_BLUE, colors.ORANGE, colors.SILVER, colors.WHITE, colors.BLACK], gen:"GEN 1"},
    {name:["Pending2"], img:[cxk], boarderColor:[], gen:"GEN 2"},
    {name:["Pending3"], img:[cxk], boarderColor:[], gen:"GEN 3"},
    // {name:["Pending4"], img:[cxk], gen:"GEN 4"},
    // {name:["Pending5"], img:[cxk], gen:"GEN 5"},
    // {name:["Pending6"], img:[cxk], gen:"GEN 6"},
    // {name:["Pending7"], img:[cxk], gen:"GEN 7"},
    // {name:["Pending8"], img:[cxk], gen:"GEN 8"},
  ];

  //Item separator
  FlatListItemSeparator = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
      />
    );
  }

  avatarConstructor = (item) => {
    let jsx = [];
    let temp = [];
    let res = [];
    for (index in item.img) {

      temp.push(
        <View style={{marginRight: 11}}>
          <ImageButton
            name={" "}
            imageSource={item.img[index]}
            onPressHandler={this._handleAvatarPressed}
            boarderColor={item.boarderColor[index]}
          />
        </View>
      );

      if(temp.length % 4 == 0){
        jsx.push(temp);
        temp = [];
      }

      // if(index >= 2){
      //   jsx.push(
      //     <View>
      //       <Avatar
      //         icon={{name:"more-horiz", type:"material"}}
      //         rounded
      //         size={"medium"}
      //         onPress={this._toggleModal}
      //         activeOpacity={0.7}
      //       />
      //     </View>
      //   )
      //   return jsx;
      // }
    }

    jsx.push(temp);


    for (i of jsx) {
      res.push(
        <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start"}}>
          {i}
        </View>
      );
    }

    if (this.state.mode === "edit"){
      jsx.push(
        <View>
          <Avatar
            icon={{name:"plus", type:"font-awesome"}}
            rounded
            size={"medium"}
            onPress={() => {alert(item.gen)}}
            activeOpacity={0.7}
          />
        </View>
      )
    }

    return res;
  }

  //TODO: refine the renderItem function based on the current state which should fit the view and edit mode

  _renderItem = ({item}) => {
    if (item["name"]){
      return (
        <View style={{height:76*Math.ceil(item['img'].length/4), backgroundColor: "transparent", flexDirection:"row", alignItems:'center', paddingLeft: 12}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize:15, backgroundColor:"transparent"}}>
              {item.gen}
            </Text>
          </View>

          <View style={{flex: 4, flexDirection: "column", justifyContent: "flex-start"}}>
            
            <View style={{flex: 1, justifyContent: "flex-start"}}>
              <Text>
                shit1
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: "flex-start"}}>
              <Text>
                shit2
              </Text>
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <Text style={{height:76, fontSize:30, textAlign:"center", backgroundColor:"transparent"}}>
          {" "}
        </Text>
      )
    }
  }

  _renderEditText = () => {
    if (this.state.mode === "view"){
      return(
        <Text style={{fontSize:15, flex: 1, color: colors.WHITE}} onPress={this._handleEditPress}>
          EDIT
        </Text>
      );
    } else {
      return(
        <Text style={{fontSize:15, flex: 1, color: colors.WHITE}} onPress={this._handleEditPress}>
          DONE
        </Text>
      );
    }
  }
  
  _toggleModal = () => {
    this.setState({ visibleModal: !this.state.visibleModal });
  }

  _handleCommunityPress = () => {
    this.props.navigation.navigate("CommunityMain");
  }

  _handleAccountPress = () => {
    this.props.navigation.navigate("AccountHold");
  }

  _handleEditPress = () => {
    if(this.state.mode === "view"){
      alert("Edit Mode");
      this.setState({mode: "edit"});
    } else {
      alert("View Mode");
      this.setState({mode: "view"});
    }
  }

  _handleAvatarPressed = () => {
    alert("Action Defined and not defined!");
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <FlatList 
            data={this.avatar}
            extraData={this.state}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item) => item.gen}
          />
        </View>
        
        <View style={{width: "100%", height: 76*2, position:'absolute', bottom:0}}>
          <View style={{flex:1, backgroundColor:colors.LIGHTBLUE, flexDirection:"row", paddingLeft: 12, alignItems: "center"}}>
            <Text style={{fontSize:25, backgroundColor:"transparent", flex: 7, color: colors.WHITE}}>
              Family tag
            </Text>

            {this._renderEditText()}

          </View>

          <View style={styles.buttonContainer}>
            <Empty/>
            <IconButtonWithText
              onPress={this._handleAccountPress}
              label={strings.HOME_ACCOUNT} 
              extraStyles={{...styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="user"
            />
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <IconButtonWithText 
              onPress={this._handleCommunityPress}
              label={strings.HOME_COMMUNITY} 
              extraStyles={{backgroundColor: colors.ORANGE, ... styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="glasses"/>
            <Empty/>
          </View>
        </View>

        <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>
          <Modal 
            isVisible={this.state.visibleModal} 
            style={styles.modal}
            onBackdropPress={this._toggleModal}
            onBackButtonPress={this._toggleModal}
            animationInTiming={500}
            animationOutTiming={300}
            animationIn={'zoomInUp'}
            animationOut={'fadeOut'}
          >

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
                <Button label="Hide modal" onPress={this._toggleModal} extraStyles={{backgroundColor:colors.TORCH_RED, marginVertical:10}}/>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  extraStyles:{
    height:42, 
    borderRadius:21,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 18,
    flex: 1
  },
  extraTextStyles:{
    fontSize:14, 
    marginRight: 12
  },
  buttonContainer:{
    flex:1, 
    backgroundColor:colors.HOMESCREENLIGHTBLUE, 
    flexDirection:"row", 
    padding:10, 
    justifyContent:"space-between", 
    alignItems: "center"
  }, modal:{
    marginVertical:170, 
    backgroundColor:colors.WHITE, 
    borderRadius:15, 
    justifyContent:"center"
  },
});