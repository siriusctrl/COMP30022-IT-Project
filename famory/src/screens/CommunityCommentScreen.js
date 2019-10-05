import React, { Component } from 'react';
import {StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Empty from "../components/Empty";
import Modal from "react-native-modal";

import Meteor from "../assets/icons/meteor";
import BigMeteor from "../assets/icons/bigMeteor";
import Rocket from "../assets/icons/rocket";
import Ufo from "../assets/icons/ufo";
import Comet from "../assets/icons/comet";
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from "lottie-react-native";

import FamilyAccountModelManage from "../controller/FamilyAccountModel";
import AchievementModelManage from "../controller/AchievementModel";
import CommunityModelManage from '../controller/CommunityModel';

export default class CommunityCommentScreen extends Component {

  static navigationOptions = {
    title: 'Recent Comments',
    headerStyle: {
      backgroundColor: '#E0836B',
      height: 46,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center',
      marginLeft: 50,
      flex: 1,
    },
    headerTintColor: '#FFFFFF',
  };

  state = {
    modalVisible: false,
    ready: false,
    isAchievementVisible: false,
    comments: null,
    id: 0,
    myComment: "",
  };

  // handle submit
  handleSubmit = async () => {
    this.setState({
      modalVisible: true,
    });
    // make comment
    CommunityModelManage.getInstance().makeComment((myComment) => {
    }, this.state.id, this.state.myComment);

    setTimeout(() => {
      let joined = this.state.comments.concat(this.state.myComment);
      this.state.comments = joined;
      this.forceUpdate();
    }, 3000);

    await new Promise(resolve => { setTimeout(resolve, 4000); });

    // if comments count reaches a certain limit
    // to unlock achievement
    FamilyAccountModelManage.getInstance().increaseComment((result) => {
      if (result) {
        for (let i of [1, 20, 500]) {
          FamilyAccountModelManage.getInstance().checkCommentCount((result) => {
            if (result) {
              // update achievement here
              let id = 0;
              if (i === 1) id = 4;
              if (i === 20) id = 5;
              if (i === 500) id = 6;
              AchievementModelManage.getInstance().unlockAchievement((result) => {
                if (result) {
                  this.state.isAchievementVisible = true;
                  this.forceUpdate();
                }
              }, id);
            }
          }, i);
        }
      }
    });
  };

  handleTimeout = () => {
    this.setState({modalVisible:false});
  };

  componentDidMount() {
    // listener to update cards
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.state.ready = false;
      this.forceUpdate();
      this.state.id = this.props.navigation.getParam('id');
      CommunityModelManage.getInstance().getComments((posts) => {
        this.state.comments = posts;
        this.state.ready = true;
        this.forceUpdate();
      }, this.props.navigation.getParam('id'));
    });
  };

  // navigations to achievement page
  handleAchievementPress = () => {
    this.state.isAchievementVisible = false;
    this.forceUpdate();
    this.props.navigation.navigate('Achievement');
  };

  componentWillUnmount () {
    this.focusListener.remove();
  }

  render() {

    if (this.state.ready === false) return (
      <View>
        <Spinner
          visible={true}
          textStyle={styles.spinnerTextStyle}
          cancelable={false}
          overlayColor={"rgb(0, 0, 0, 0)"}
          color={'#4E91C4'}
          size={'large'}
        />
      </View>
    );

    return (
      <View style={styles.container}>
 
        <ScrollView style={styles.RectangleShapeView}>

          {(this.state.comments.length === 4) ? (
            <View style={styles.Comments}>
              <BigMeteor></BigMeteor>
              <View style={styles.CommentArea}>
                <Text style={styles.TextStyle}>{this.state.comments[3]}</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.Comments}>
            <Comet></Comet>
            <View style={styles.CommentArea}>
              <Text style={styles.TextStyle}>{this.state.comments[0]}</Text>
            </View>
          </View>

          <View style={styles.Comments}>
            <Ufo></Ufo>
            <View style={styles.CommentArea}>
              <Text style={styles.TextStyle}>{this.state.comments[1]}</Text>
            </View>
          </View>

          <View style={styles.Comments}>
            <Rocket></Rocket>
            <View style={styles.CommentArea}>
              <Text style={styles.TextStyle}>{this.state.comments[2]}</Text>
            </View>
          </View>

        </ScrollView>
        <Empty/>
        <Empty/>
        <Empty/>
        <Empty/>
        <View style={{ flex: 1, justifyContent: 'center', width: "100%", flexDirection: "row"}}>
          <Meteor style={{marginTop: 8}}></Meteor>
          {(this.state.comments.length === 4) ? (
            <LinearGradient 
            colors={['#C0C0C0', '#808080']} 
            style={styles.LinearGradientStyle}
            start={[0.1, 0.9]}
            end={[0.9,0.1]}
            >
    
              <View style={styles.ChildViewStyle}>

                <Text style={styles.AlreadyCommented}>You have already commented.</Text>

              </View>
                    
            </LinearGradient>
          ) : (
            <LinearGradient 
            colors={['#E2E2E2', '#F4F3F3']} 
            style={styles.LinearGradientStyle}
            start={[0.1, 0.9]}
            end={[0.9,0.1]}
            >
    
              <View style={styles.ChildViewStyle}>

                <TextInput
                  placeholder="Write a comment..."
                  underlineColorAndroid='transparent'
                  multiline
                  blurOnSubmit={true}
                  onChangeText={(text) => this.setState({myComment: text})}
                  style={styles.TextInputStyleClass}
                  onSubmitEditing={this.handleSubmit}
                />

              </View>
                    
            </LinearGradient>)
          }
        </View>

        <Modal
          style={styles.achievementModalStyle}
          isVisible={this.state.modalVisible}
          onShow={()=>{ 
            this.animation.play();
            setTimeout(this.handleTimeout, 3000);
            }}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              loop={false}
              source={require('../assets/animation/send.json')}
            />
        </Modal>

        <Modal
          isVisible={this.state.isAchievementVisible}
          onBackdropPress={() => {this.setState({isAchievementVisible: false})}}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.achievementModalStyle}
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
    justifyContent: "center",
    width: "95%",
    marginLeft: 9,
    marginTop: 10,
  },
  RectangleShapeView: {
    //justifyContent: "center",
    height: 380,
    borderColor: "#C9C7C7",
    borderRadius: 17,
    borderWidth: 2,
    paddingRight: 15,
  },
  LinearGradientStyle: {
    width: '80%',
    height: 45,
    borderRadius: 25,
    marginLeft: 15,
  },
  ChildViewStyle:{
    height: 50,
    borderRadius: 25,
    padding: 5,
  },
  TextInputStyleClass:{
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 0.6,
    borderRadius: 25,
  },
  SendMessage: {
    marginTop: 5,
    marginLeft: 10,
  },
  Comments: {
    flexDirection: "row",
    padding: 5,
    margin: 5,
  },
  CommentArea: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E2E2',
    borderRadius: 17,
    marginLeft: 5,
    width: "88%",
    padding: 10,
  },
  TextStyle: {
    letterSpacing: 0.6,
  },
  AlreadyCommented: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 0.6,
    borderRadius: 25,
    marginTop: 8,
  },
  animationContainer: {
    backgroundColor: '#FFCC00',
    flex: 1,
  },
  achievementModalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
});