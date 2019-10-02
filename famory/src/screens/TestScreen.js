import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import colors from "../config/colors";

export default class TestScreen extends Component {

  state = {
    isVisible: false,
    progress: 1,
  }

  // navigations to achievement page
  handleAchievementPress = () => {
    this.setState({
      isVisible: false,
    })
    this.props.navigation.navigate('Achievement');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {this.setState({isVisible: true})}}
            style={styles.button}
          >
            <Text style={styles.text}>CUSTOM</Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={() => {this.setState({isVisible: false})}}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
          onShow={()=>{ 
            this.animation.play();
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../assets/animation/trophy.json')}
            style={{marginTop: -50,}}
          />

          <TouchableOpacity onPress={this.handleAchievementPress}>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#fff', marginTop: 200,}}>You have unlocked an</Text>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#FFD700'}}>Achievement!</Text>
          </TouchableOpacity>
        </Modal>
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