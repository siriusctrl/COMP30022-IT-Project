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

  avatar = [
    {name: " "},
    {name:"Shouyin"},
    {name:"Morry"},
    {name:"M"},
    {name:"Shouyin1"},
    {name:"Shouyin2"},
    {name:"Shouyin3"},
    {name:"Shouyin4"},
    {name:" vending1"},
    {name:" vending2"},
  ];

  //Item separator
  FlatListItemSeparator = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  _renderItem = ({item}) => (
    <Text style={{height:76, fontSize:30, textAlign:"center", backgroundColor:"transparent"}}>
      {item.name}
    </Text>
  );
  
  handleCommunityPress = () => {
    Alert.alert("You pressed the community button");
  }

  handleAccountPress = () => {
    Alert.alert("You pressed the account button");
  }

  handleEditPress = () => {
    Alert.alert("You pressed the edit text");
  }

  render() {
    return (
      <View>
        <FlatList 
          data={this.avatar}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={(item) => item.name}
        />

        <View style={{width: "100%", height: 76*2, position:'absolute', bottom:0}}>

          <View style={{flex:1, backgroundColor:colors.LIGHTBLUE, flexDirection:"row"}}>
            <Text style={{fontSize:25, backgroundColor:"transparent", top:17}}>
              Family tag
            </Text>
            <Text style={{fontSize:15, top:25, left:230}} onPress={this.handleEditPress}>
              Edit
            </Text>
          </View>

          <View style={{flex:1, backgroundColor:colors.HOMESCREENLIGHTBLUE, flexDirection:"row", padding:10, justifyContent:"space-between"}}>
            <Empty/>
            <IconButtonWithText 
              onPress={this.handleAccountPress}
              label={strings.HOME_ACCOUNT} 
              extraStyles={styles.extraStyles} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="user"/>
            <Empty/>
            <IconButtonWithText 
              onPress={this.handleCommunityPress}
              label={strings.HOME_COMMUNITY} 
              extraStyles={styles.extraStyles} 
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
    width:"40%", 
    height:46, 
    borderRadius:23,
  },
  extraTextStyles:{
    fontSize:17, 
    height:23,
  }
});