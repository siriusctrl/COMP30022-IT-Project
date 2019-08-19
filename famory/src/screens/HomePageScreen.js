import React, {Component} from "react";
import { Text, View, FlatList} from "react-native";

import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";

export default class HomePageScreen extends Component{
  static navigationOptions = {
    header: null
  }

  avator = [
    {name: " "},
    {name:"Shouyin"},
    {name:"Morry"},
    {name:"M"},
    {name:"Shouyin1"},
    {name:"Shouyin2"},
    {name:"Shouyin3"},
    {name:"Shouyin4"},
    {name:"Shouyin5"},
    {name:"Shouyin6"},
    {name:"Shouyin7"},
    {name:"Shouyin8"},
    {name:"Shouyin9"},
    {name:"Shouyin10"},
    {name:"Shouyin11"},
    {name:"Shouyin12"},
    {name:"Shouyin13"},
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

  render() {
    return (
      <View>
        <FlatList 
          data={this.avator}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={(item) => item.name}
        />

        <View style={{width: "100%", height: 76*2, position:'absolute', bottom:0}}>
          <View style={{flex:1, backgroundColor:colors.LIGHTBLUE}}>
          </View>

          <View style={{flex:1, backgroundColor:colors.HOMESCREENLIGHTBLUE, flexDirection:"row", padding:10}}>
            <Button label={strings.HOME_ACCOUNT} extraStyles={{flex:1, marginRight:20, height:46, borderRadius:23}}/>
            <Button label={strings.HOME_COMMUNITY} extraStyles={{flex:1, height:46, marginLeft: 20,borderRadius:23}}/>
          </View>
        </View>
    </View>
    );
  }
}