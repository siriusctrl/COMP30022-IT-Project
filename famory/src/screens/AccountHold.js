import React, { Component } from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import { Container, View} from 'native-base';
import strings from "../config/strings";
import Button from "../components/Button";


export default class AccountHold extends Component {

    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#4E91C4',

        },

        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft:85,
            flex: 1,
        },
        headerTintColor: '#FFFFFF',

    }

    handleLogOutPress = () => {
        Alert.alert("LogOut Pressed with 0.5 opacity");
    }

    render() {

        return (
            <Container>
                <View>
                    <Image source={require('../assets/images/trump.jpg')}  style={styles.avatar} />

                </View>
                <View>

                    <Button
                        title="Log Out"
                        label={strings.LOGOUT}
                        onPress={this.handleLogOutPress}
                        extraStyles={{width: "80%", marginTop: 6, alignSelf: 'center'}}/>
                </View>
            </Container>
        );


    }

}


const styles = StyleSheet.create({

    avatar: {
        width: "25%",
        resizeMode: "contain",
        alignSelf: "center",
        paddingTop:10,
        borderRadius: 40,

    },
});