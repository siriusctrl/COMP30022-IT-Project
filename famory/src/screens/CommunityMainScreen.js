import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text, Icon, Button } from 'native-base';
import { AppLoading } from 'expo';
import colors from "../config/colors";

import AddNew from "../assets/icons/addNew";
import ChatIcon from "../assets/icons/chat";
import CrossIcon from "../assets/icons/cross";
import Heart from "../assets/icons/heart";
import SmallHeart from "../assets/icons/smallHeart";
import Unlike from "../assets/icons/unlike";

let cards = [
  {
    id: 0,
    text: 'Beloved Grandfather: Rest in peace. Last meal we had was truly amazing.',
    name: 'Last Breakfast',
    geo: 'Melbourne',
    image: require('../assets/images/breakfast.png'),
    likes: 120,
  },
  {
    id: 1,
    text: 'Finished building JavaScript bundle in 319 ms. Running application on HMA-AL00.',
    name: 'Beautiful Tree.',
    geo: 'Sydney',
    image: require('../assets/images/bgtree.jpg'),
    likes: 1,
  },
  {
    id: 2,
    text: 'ji ni tai mei',
    name: 'ikun',
    geo: 'Shanghai',
    image: require('../assets/images/logo.png'),
    likes: 1145,
  },
  {
    id: 3,
    text: 'Lottie is a mobile library for Android and iOS that parses Adobe After Effects animations.',
    name: 'Crystalised World',
    geo: 'Beijing',
    image: require('../assets/images/Back.png'),
    likes: 747,
  }
];

export default class CommunityMainScreen extends Component {

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
    headerRight: (
      <AddNew
        onPress={() => alert('Add new artefact!')}
        title="Info"
        color="#FFFFFF"
        style={{marginRight: 12}}
      ></AddNew>
    ),
  }

  state = {
    currentid: 0,
    liked: [0, 0, 0, 0],
  }

  handleSwipe = () => {
    let old = this.state.currentid;
    this.setState({
      currentid: (old + 1) % 4
    });
  }

  handleCross = () => {
    this.handleSwipe();
    this._deckSwiper._root.swipeLeft();
  }

  handleLike = () => {
    cards[this.state.currentid].likes += 1;
    this.state.liked[this.state.currentid] = 1;
    this.forceUpdate();
  }

  handleUnlike = () => {
    cards[this.state.currentid].likes -= 1;
    this.state.liked[this.state.currentid] = 0;
    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentid !== this.state.currentid) {
      alert("From state " + prevState.currentid + " to state " + this.state.currentid);
    }
  }

  render() {

    return (
      <Container>
        <View style={styles.container}>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            onSwipeLeft={this.handleSwipe}
            onSwipeRight={this.handleSwipe}
            renderItem={item =>
              <Card style={{ elevation: 7, borderRadius: 12 }}>
                <CardItem cardBody>
                  <Image style={styles.image} source={item.image} />
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.name}</Text>
                  <View style={styles.location}>
                    <Text style={{fontSize: 13, color: colors.WHITE, 
                    flex: 1, alignItems: 'center', justifyContent: 'center',
                    marginHorizontal: 7, marginTop: 3}}>{item.geo}</Text>
                  </View>
                </CardItem>
                <CardItem style={styles.cardBottom}>
                  <View style={{ flex: 4, marginTop: -25 }}>
                    <Text style={{ fontSize: 14, letterSpacing: 0.5}}>{item.text}</Text>
                  </View>
                  <View
                    style={{ flex: 1, marginTop: 30}}>
                      <SmallHeart style={{marginLeft: 35}}></SmallHeart>
                  </View>
                  <View
                    style={{ flex: 1, marginTop: 28}}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 20}}>{item.likes}</Text>
                  </View>
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 20, left: 20, justifyContent: 'space-between', padding: 15}}>
          <CrossIcon onPress={this.handleCross}></CrossIcon>
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 40, left: 135, justifyContent: 'space-between', padding: 15}}>
          {(this.state.liked[this.state.currentid] === 0) ? (
          <Heart onPress={this.handleLike}></Heart>) : (
          <Unlike onPress={this.handleUnlike}></Unlike>
          )}
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 20, left: 255, justifyContent: 'space-between', padding: 15}}>
          <ChatIcon onPress={() => this._deckSwiper._root.swipeLeft()}></ChatIcon>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "95%",
    marginLeft: 9,
    marginTop: 10,
  },
  image: {
    height: 300,
    flex: 1,
    borderColor: "#C9C7C7",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  cardBottom: {
    borderBottomLeftRadius: 12, 
    borderBottomRightRadius: 12, 
    borderColor: "#C9C7C7",
  },
  location: {
    backgroundColor: "#F99E54",
    borderRadius: 5,
    marginLeft: 15,
    height: "90%"
  }
});