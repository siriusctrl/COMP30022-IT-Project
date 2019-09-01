import React, {Component} from "react";
import { Text, View, FlatList, StyleSheet, Alert} from "react-native";

import colors from "../config/colors";
import strings from "../config/strings";
import IconButtonWithText from "../components/IconButtonWithText";
import Empty from "../components/Empty";
import ImageButton from "../components/ImageButton";
import cxk from "../assets/images/logo.png"



export default class HomePageScreen extends Component{
  static navigationOptions = {
    header: null
  }
  // TODO: use for loop to generate avatar set before invoking renderItem

  avatar = [
    {empyt:"yes"},
    {name:["Pending1"], img:[cxk, cxk], gen:"GEN 10"},
    {name:["Pending2"], img:[cxk], gen:"GEN 9"},
    {name:["Pending3"], img:[cxk], gen:"GEN 8"},
    {name:["Pending4"], img:[cxk], gen:"GEN 7"},
    {name:["Pending5"], img:[cxk], gen:"GEN 6"},
    {name:["Pending6"], img:[cxk], gen:"GEN 5"},
    {name:["Pending7"], img:[cxk], gen:"GEN 4"},
    {name:["Pending8"], img:[cxk], gen:"GEN 3"},
    {name:[" vending1"], img:[cxk], gen:"GEN 2"},
    {name:[" vending2"], img:[cxk], gen:"GEN 1"},
  ];

  //Item separator
  FlatListItemSeparator = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
      />
    );
  };

  avatarConstructor = (item) => {
    let jsx = [];
    for (im in item.img) {
      jsx.push(
        <View style={{marginRight: 11}}>
          <ImageButton name={item.name[im]} imageSource={item.img[im]}/>
        </View>
      )
    }

    return jsx;
  }

  _renderItem = ({item}) => {
    if (item["name"]){
      return (
        <View style={{height:76, backgroundColor: "transparent", flexDirection:"row", alignItems:'center', paddingLeft: 12}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize:15, backgroundColor:"transparent"}}>
              {item.gen}
            </Text>
          </View>

          <View style={{flex: 4, flexDirection: "row", justifyContent: "flex-start"}}>
            {this.avatarConstructor(item)}
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
      
  handleCommunityPress = () => {
    Alert.alert("You pressed the community button");
  }

  handleAccountPress = () => {
    Alert.alert("You pressed the account button");
  }

  handleEditPress = () => {
    Alert.alert(this.avatar.length.toString());
  }

  render() {
    return (
      <View style={{height: "100%"}}>
        {this.avatar.length > 7?
          (
            <FlatList 
              data={this.avatar}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item) => item.name}
              style={{height: "100%", width: "100%"}}
            />
          )
            :
          (
            <View>

            </View>
          )
        }

        <View style={{width: "100%", height: 76*2, position:'absolute', bottom:0}}>
          <View style={{flex:1, backgroundColor:colors.LIGHTBLUE, flexDirection:"row", paddingLeft: 12, alignItems: "center"}}>
            <Text style={{fontSize:25, backgroundColor:"transparent", flex: 7, color: colors.WHITE}}>
              Family tag
            </Text>
            <Text style={{fontSize:15, flex: 1, color: colors.WHITE}} onPress={this.handleEditPress}>
              EDIT
            </Text>
          </View>

          <View style={{flex:1, backgroundColor:colors.HOMESCREENLIGHTBLUE, flexDirection:"row", padding:10, justifyContent:"space-between", alignItems: "center"}}>
            <Empty/>
            <IconButtonWithText 
              onPress={this.handleAccountPress}
              label={strings.HOME_ACCOUNT} 
              extraStyles={{...styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="user"/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <IconButtonWithText 
              onPress={this.handleCommunityPress}
              label={strings.HOME_COMMUNITY} 
              extraStyles={{backgroundColor: colors.ORANGE, ... styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="glasses"/>
            <Empty/>
          </View>
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
  }
});