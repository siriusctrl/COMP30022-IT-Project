import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
import Button from "../components/Button";

export default class TestScreen extends Component {

  state = {
    isAchievementVisible: false,
    timer:null,
  }

  _handleSendPress = () => {
    if(this.state.timer == null){
      alert("Email has been sent");
      this.setState({timer:60});
      this.countDown = setInterval(() => {
        this.setState({timer: this.state.timer-1});
        if(this.state.timer === 0){
          this.setState({timer:null});
          clearInterval(this.countDown);
        }
      }, 2000);
    } else {
      alert("please retry in " + this.state.timer + " second(s)");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          label={this.state.timer==null?"Send":"Send ("+this.state.timer+")"}
          onPress={this._handleSendPress}
          extraStyles={{ width: "80%"}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    marginTop: 120
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginBottom: 115
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  modalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
});