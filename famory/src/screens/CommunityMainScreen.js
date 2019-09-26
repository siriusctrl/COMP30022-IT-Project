import React, { Component } from 'react';
import { Image, StyleSheet, View, Modal } from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text } from 'native-base';
import LottieView from "lottie-react-native";
import colors from "../config/colors";

import AddNew from "../assets/icons/addNew";
import ChatIcon from "../assets/icons/chat";
import CrossIcon from "../assets/icons/cross";
import Heart from "../assets/icons/heart";
import SmallHeart from "../assets/icons/smallHeart";
import Unlike from "../assets/icons/unlike";

import { CommunityModelManage } from "../controller/CommunityModel";

let cards = [];

export default class CommunityMainScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Playground',
      headerStyle: {
        backgroundColor: '#E0836B',
        height: 46,
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
          onPress={navigation.getParam('addArtefact')}
          title="Info"
          color="#FFFFFF"
          style={{marginRight: 12}}
        ></AddNew>
      ),
    }
  }

  state = {
    currentid: 0,
    liked: [],
    modalVisible: false,
    postCount: 0,
    ready: false,
  }

  handleSwipe = () => {
    let old = this.state.currentid;
    this.setState({
      currentid: (old + 1) % this.state.postCount,
    });
  }

  handleCross = () => {
    this.handleSwipe();
    this._deckSwiper._root.swipeLeft();
  }

  // handle like animation
  handleLike = () => {
    this.setModalVisible(true);
    cards[this.state.currentid].likes += 1;
    this.state.liked[this.state.currentid] = 1;
    this.forceUpdate();
    this.setModalVisible(true);
    CommunityModelManage.getInstance().increaseLike(() => {}, (this.state.currentid + 1).toString());
  }

  // handle unlike
  handleUnlike = () => {
    cards[this.state.currentid].likes -= 1;
    this.state.liked[this.state.currentid] = 0;
    this.forceUpdate();
    CommunityModelManage.getInstance().decreaseLike(() => {}, (this.state.currentid + 1).toString());
  }

  // jump to add artefact to community page
  _addArtefact = () => {
    this.props.navigation.navigate('CommunityAdd');
  }

  async componentDidMount () {
    // props
    this.props.navigation.setParams({ addArtefact: this._addArtefact });
    // make cards the posts from firebase
    this.getCommunity();
    // load data
    await new Promise(resolve => { setTimeout(resolve, 3600); });
    this.setState({postCount: cards.length});
    // update likes in state
    let likeArray = [];
    for (let i = 0; i < this.state.postCount; i++) {
      likeArray.push(0);
    }
    this.state.liked = likeArray;
    this.state.ready = true;
    this.forceUpdate();
  }

  // get community posts
  getCommunity = () => {
    CommunityModelManage.getInstance().getCommunity((posts) => {
      cards = posts;
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleCommentPress = () => {
    // pass comments to comment page
    this.props.navigation.navigate('CommunityComment', {replies: cards[this.state.currentid].replies});
  }

  render() {

    if (this.state.ready === false) return (
      <Container>
        <Modal style={styles.animationContainer} transparent={true} visible={true}
          onShow={()=>{ 
            this.animation.play();
            }}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              loop={true}
              source={require('../assets/animation/loading.json')}
            />
        </Modal>
      </Container>
    )

    return (
      <Container>
        <View style={styles.container}>
          <Modal style={styles.animationContainer} transparent={true} visible={this.state.modalVisible}
            onShow={()=>{ 
              this.animation.play();
              setTimeout(() => this.setState({modalVisible:false}), 750);
              }}>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                loop={false}
                source={require('../assets/animation/heart.json')}
                resizeMode='center'
                style={{ marginTop: 200 }}
              />
          </Modal>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            onSwipeLeft={this.handleSwipe}
            onSwipeRight={this.handleSwipe}
            renderItem={item =>
              <Card style={{ elevation: 7, borderRadius: 12 }}>
                <CardItem cardBody>
                  <Image style={styles.image} source={{uri: item.item}} />
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.title}</Text>
                  <View style={styles.location}>
                    <Text style={{fontSize: 13, color: colors.WHITE, 
                    flex: 1, alignItems: 'center', justifyContent: 'center',
                    marginHorizontal: 7, marginTop: 3}}>{item.location}</Text>
                  </View>
                </CardItem>
                <CardItem style={styles.cardBottom}>
                  <View style={{ flex: 4, marginTop: -20 }}>
                    <Text style={{ fontSize: 14, letterSpacing: 0.5}}>{item.description}</Text>
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
        <View style={{ flex: 1, position: "absolute", bottom: 10, left: 20, justifyContent: 'space-between', padding: 15}}>
          <CrossIcon onPress={this.handleCross}></CrossIcon>
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 30, left: 135, justifyContent: 'space-between', padding: 15}}>
          {(this.state.liked[this.state.currentid] === 0) ? (
          <Heart onPress={this.handleLike}></Heart>) : (
          <Unlike onPress={this.handleUnlike}></Unlike>
          )}
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 10, left: 255, justifyContent: 'space-between', padding: 15}}>
          <ChatIcon onPress={this.handleCommentPress}></ChatIcon>
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
  },
  animationContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
});