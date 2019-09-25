import React, {Component} from "react";
import { Video } from 'expo-av';
import { Text, StyleSheet, View , TouchableWithoutFeedback, ImageBackground, StatusBar, Dimensions} from "react-native";
import bgtree from "../assets/images/bgtree.jpg";
import background from "../assets/videos/background.mp4"
import Button from "../components/Button";
import colors from "../config/colors";
import strings from "../config/strings";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class WelcomeScreen extends Component{

  state = {
    fontLoaded: false,
  };

  static navigationOptions = {
    header: null
  };

  // hide status bar for all the screens and load the font assets
  async componentDidMount() {
    StatusBar.setHidden(true);
    await Font.loadAsync({
      "dayland": require('../assets/fonts/Dayland.ttf'),
      "almond": require('../assets/fonts/Almond.ttf'),
      "Roboto": require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      "Roboto_medium": require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ fontLoaded: true });
  }

  handleBeginPress = () => {
    this.props.navigation.navigate('Login');
  }

  handleNewJourneyPress = () => {
    this.props.navigation.navigate('SignIn');
  }
  
  render() {
    return (
      <View style={styles.background}>
        <Video
          source={background}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          useNativeControls={false}
          isLooping={true}
          shouldPlay={true}
          style={{position: "absolute", bottom: 0, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width}}></Video>
        <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            <Text style={styles.title}>
                Famory
            </Text>
          ) : (
            <Text style={styles.titleNoFont}>
                {"  "}
            </Text>
          )
        }
        </View>

        <View style={styles.container}>
          <Button label={strings.BEGIN} onPress={this.handleBeginPress} extraStyles={{width: "70%"}} />

          <Text style={{color:colors.WELCOMEBLUE, marginBottom:8, marginTop:15, fontStyle: 'italic'}}>
            Or
          </Text>

          <TouchableWithoutFeedback onPress={this.handleNewJourneyPress}>
            <View>
              <Text style={{color:colors.WELCOMEBLUE, textDecorationLine: 'underline'}}>
                Start your journey?
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    resizeMode: "cover",
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  title:{
    color: colors.WHITE,
    marginTop: "35%",
    marginBottom: "80%",
    fontSize: 48,
    fontFamily: 'dayland',
    letterSpacing: 4
  },
  titleNoFont:{
    color: colors.WHITE,
    marginTop: "35%",
    marginBottom: "80%",
    fontSize: 48,
  },
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'}
});