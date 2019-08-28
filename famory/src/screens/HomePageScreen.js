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
    {name:"Pending1", img:cxk, gen:"GEN 10"},
    {name:"Pending2", img:cxk, gen:"GEN 9"},
    {name:"Pending3", img:cxk, gen:"GEN 8"},
    {name:"Pending4", img:cxk, gen:"GEN 7"},
    {name:"Pending5", img:cxk, gen:"GEN 6"},
    {name:"Pending6", img:cxk, gen:"GEN 5"},
    {name:"Pending7", img:cxk, gen:"GEN 4"},
    {name:"Pending8", img:cxk, gen:"GEN 3"},
    {name:" vending1", img:cxk, gen:"GEN 2"},
    {name:" vending2", img:cxk, gen:"GEN 1"},
  ];

  //Item separator
  FlatListItemSeparator = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
      />
    );
  };

  _renderItem = ({item}) => (
    item.name?
      (
        <View style={{height:76, backgroundColor:"transparent", flexDirection:"row", alignItems:'center'}}>
          <Text style={{fontSize:15, backgroundColor:"transparent"}}>
            {item.gen}
          </Text>

          <Empty/>
          <Empty/>
          <Empty/>
          <ImageButton name={item.name} imageSource={item.img}/>
          <Empty/>
          <Empty/>
          <Empty/>
          <ImageButton name={item.name} imageSource={item.img}/>
        </View>
      )
        :
      (
        <Text style={{height:76, fontSize:30, textAlign:"center", backgroundColor:"transparent"}}>
          {" "}
        </Text>
      )
  );
  
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
      <View>
        {this.avatar.length > 7?
          (
            <FlatList 
              data={this.avatar}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item) => item.name}
            />
          )
            :
          (
            <View>

            </View>
          )
        }

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