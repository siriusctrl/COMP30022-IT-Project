import React, {Component} from "react";
import { Text, View , FlatList, Alert} from "react-native";
import Button from "../components/Button";
import colors from "../config/colors";

export default class DebugScreen extends Component{
  static navigationOptions = {
    header: null
  }

  screens = [
    {name: "Welcome"},
    {name:"Login"},
    {name:"SignIn"},
    {name:"HomePage"},
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
      <View>
        <FlatList 
          data={this.screens}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}