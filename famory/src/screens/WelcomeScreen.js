import React, {Component} from "react";
import { Text, StyleSheet, View , TouchableWithoutFeedback, ImageBackground, StatusBar} from "react-native";
import bgtree from "../assets/images/bgtree.jpg";
import Button from "../components/Button";
import colors from "../config/colors";
import strings from "../config/strings";

export default class WelcomeScreen extends Component{
  static navigationOptions = {
      header: null
  };

  // hide status bar for all the screens
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  handleBeginPress = () => {
    this.props.navigation.navigate('Login');
  }

  handleNewJourneyPress = () => {
    this.props.navigation.navigate('SignIn');
  }
    
  render() {
      return (
        <ImageBackground source={bgtree} style={styles.background}>

            <View style={styles.container}>
                <Text style={styles.title}>
                    Famory
                </Text>
            </View>

            <View style={styles.container}>
                <Button label={strings.BEGIN} onPress={this.handleBeginPress} style={{width: "70%"}} />

                <Text style={{color:colors.WHITE, marginBottom:8, marginTop:15}}>
                    Or
                </Text>

                <TouchableWithoutFeedback onPress={this.handleNewJourneyPress}>
                    <View>
                        <Text style={{color:colors.WHITE, textDecorationLine: 'underline'}}>
                            Start your journey?
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </ImageBackground>
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
        fontSize: 30
    },
    bold: {fontWeight: 'bold'},
    italic: {fontStyle: 'italic'},
    underline: {textDecorationLine: 'underline'}
});