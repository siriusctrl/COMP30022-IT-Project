import React, {Component} from "react";
import { Text, View , FlatList, ImageBackground} from "react-native";
import cxk from "../assets/images/logo.png"

export default class DebugScreen extends Component{
  static navigationOptions = {
    header: null
  }

  screens = [
    {name: "Welcome"},
    {name:"Login"},
    {name:"SignIn"},
    {name:"HomePage"},
    {name:"CommunityMain"},
    {name: "MemberPr"}
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
    <Text style={{height:50, fontSize:30, textAlign:"center"}} onPress={() => this.props.navigation.navigate(item.name)}>
      {item.name}
    </Text>
  );

  render() {
    return (
      <ImageBackground source={cxk} style={{flex:1,resizeMode: "cover"}}>
        <View>
          <FlatList 
            data={this.screens}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item) => item.name}
          />
        </View>
      </ImageBackground>
    );
  }
}