import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import Mail from "../assets/icons/mail";

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../assets/images/Back.png'),
    },
    {
        text: 'Card Two',
        name: 'Two',
        image: require('../assets/images/bgtree.jpg'),
    },
    {
        text: 'Card Three',
        name: 'Three',
        image: require('../assets/images/glass.png'),
    }
];

export default class DeckSwiperAdvancedExample extends Component {

    static navigationOptions = {
        title: 'Playground',
        headerStyle: {
            backgroundColor: '#E0836B',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
        },
        headerTintColor: '#FFFFFF',

    }

}


render()
{

    return ()
}