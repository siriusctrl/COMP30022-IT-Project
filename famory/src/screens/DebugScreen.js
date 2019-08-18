import React, {Component} from "react";
import { Text, View , FlatList, Alert} from "react-native";
import Button from "../components/Button";
import colors from "../config/colors";

class MyListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class DebugScreen extends Component{
  static navigationOptions = {
    header: null
  }

  screens = [
    {name: "Welcome"},
    {name:"Login"},
    {name:"SignIn"},
  ];

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  _renderItem = ({item}) => {
    <Text style={{height:20, fontSize:10}}>
      {item.name}
    </Text>
  }

  render() {
    return (
      <View>
        <Text>
          Fuck you!
        </Text>

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