import React, {Component} from "react";
import { Text, View , FlatList, ImageBackground, StatusBar} from "react-native";
import cxk from "../assets/images/logo.png"
import colors from "../config/colors";

export default class DebugScreen extends Component{
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  screens = [
    {name: "Welcome"},
    {name:"Login"},
    {name:"SignIn"},
    {name:"HomePage"},
    {name:"CommunityMain"},
    {name: "Test"},
    {name: "MemberPr"},
    {name: "AccountHold"},
    {name: "CommunityComment"},
    {name: "EditProfile"},
    {name: "ArtGuide"},
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
    <Text style={{height:50, fontSize:30, textAlign:"center", color:colors.TORCH_RED}} onPress={() => this.props.navigation.navigate(item.name)}>
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