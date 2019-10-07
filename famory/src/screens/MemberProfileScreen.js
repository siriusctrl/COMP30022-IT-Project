import React, {Component} from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import FamilyAccountModelManage from "../controller/FamilyAccountModel";
import { Icon } from 'react-native-elements';
import ArtCard from "../components/ArtCard";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import Modal from "react-native-modal";

import ItemModelManage from "../controller/ItemModel";
import AchievementModelManage from "../controller/AchievementModel";
import LottieView from "lottie-react-native";


export default class MemberProfile extends Component{

  // navigation
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "rgba(106, 84, 166, 0)", 
      height: 38, 
      elevation: 0, 
      zIndex: 2
    },
    headerTitleStyle: {color:colors.LIGHTERBLUE, fontWeight: "100"},
    headerTintColor: colors.HOMESCREENLIGHTBLUE
  }

  
  state = {
    profileMemberArtefactItem: [],
    itemAll: -1,
    itemHas: 0,
    isAchievementVisible: false,
  }


  // The screen need a model
  // need a MemberModel to build up the screen
  setModel = (model) => {

    this.setState(
      {
        memberModel: model,
        isMemberReady: true,
        itemAll: Object.keys(model.item).length
      }
    )

    model.getItems((items) => {
      this.setState(
        {
          profileMemberArtefactItem: Object.values(items),
          itemHas: Object.keys(items).length
        })
    })

  }


  componentDidMount() {
    // listener to add item achievement update
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const prevScreen = this.props.navigation.getParam('prevScreen', 'nothing');
      if (prevScreen === 'ArtefactGuide') {
        for (let i of [1, 20, 100]) {
          ItemModelManage.getInstance().getItemCount((result) => {
            if (result) {
              // update achievement here
              let id = 0;
              if (i === 1) id = 7;
              if (i === 20) id = 8;
              if (i === 100) id = 9;
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

    // check if now has a model passed in
    let model = this.props.navigation.getParam("model", null);
    if (model){

      // if has then use that model and get all its items
      this.setModel(model)
    }else{

      // use the default member_1 to get members
      FamilyAccountModelManage.getInstance().getFamilyAccount(
        (m) => {
          m.getMembers((o) => {
            this.setModel(o["member_1"])
          })
        }
      )
    }
  }


  componentWillUnmount () {
    this.focusListener.remove();
  }

  // navigations to achievement page
  handleAchievementPress = () => {
    this.focusListener.remove();
    this.state.isAchievementVisible = false;
    this.forceUpdate();
    this.props.navigation.navigate('Achievement');
  };

  nativeRipple = TouchableNativeFeedback.Ripple(colors.MISCHKA, true)


  // render a artefact card in screen
  _renderRow = ({item, index}) => {
    return (
      <TouchableNativeFeedback 
          style={{borderRadius: 6}} 
          background={TouchableNativeFeedback.Ripple(colors.WHITE,false)} 
          onPress={() => this.toItem(item)}>
        <ArtCard item={item} style={styles.artCard}/>
      </TouchableNativeFeedback>
    )
  }


  // to artefact detail page's function
  toItem(item){
    this.props.navigation.navigate("ArtefactItem", 
      {item: item, "profileScreen": this, member: this.state.memberModel})
  }


  // press Avatar and navigate to the EditProfile page
  _onPressAvatar = () => {
    this.props.navigation.navigate("EditProfile", 
      {memberModel: this.state.memberModel, profileScreen: this});
  };


  render() {
    // drop down menu
    const optionDropdown = {
      flexDirection: 'row', 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      marginLeft: 32,
      paddingTop: 32,
      paddingBottom: 32, 
    }

    let dropDownTextStyle = {fontSize: 18, fontWeight: '400', lineHeight: 32}
    let dropDownItemStyle = {flexDirection: 'column', flex: 1}

    let options = [
      'Cancel', 
      <View style={optionDropdown}>
        <View style={dropDownItemStyle}>
          <Text style={dropDownTextStyle}>
            Add new artefact
          </Text>
        </View>
      </View>, 
      <View style={optionDropdown}>
        <View style={dropDownItemStyle}>
          <Text style={dropDownTextStyle}>
            Add artefact from other member
          </Text>
        </View>
      </View>,
    ]


    return (
      <View style={{flex:1}}>
        <View style={styles.tContainer}>
          <View style={{flex: 1, width: "100%", flexDirection: "row"}}>
            <View style={{height: "100%", flex: 8, padding:12, elevation: 6}}>
                {
                  this.state.isMemberReady? 
                  <View style={styles.profileTopTitle}>
                    <View style={styles.ava}>
                      <TouchableNativeFeedback onPress={this._onPressAvatar} background={this.nativeRipple}>
                        <Image source={{uri: this.state.memberModel.profileImage}}
                               style={{width: 68, height: 68, borderRadius: 34}} />
                      </TouchableNativeFeedback>
                    </View>
                    <View style={styles.nameAndBdgContainer}>
                      <Text style={styles.name}>
                        {this.state.memberModel.firstName + " " + this.state.memberModel.lastName}
                      </Text>
                      <View style={styles.bdgWrapper}>
                        <View style={{backgroundColor: this.state.memberModel.ringColor, ... styles.bdg}}>
                          <Text style={styles.dbgText}>
                            {this.state.memberModel.role}
                          </Text>
                        </View>
                        <View style={{backgroundColor: colors.LIGHTBLUE, ... styles.bdg}}>
                          <Text style={styles.dbgText}>
                            {this.state.memberModel.gender}
                          </Text>
                        </View>
                        <View style={{backgroundColor: colors.DTPURPLE, ... styles.bdg}}>
                          {
                            (Object.keys(this.state.memberModel.item).length > 1) ? 
                            (<Text style={styles.dbgText}>
                                {Object.keys(this.state.memberModel.item).length + " " + "Artefacts"}
                              </Text>
                            ):(
                              <Text style={styles.dbgText}>
                                {Object.keys(this.state.memberModel.item).length + " " + "Artefact"}
                              </Text>
                            )
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                  :
                  <View style={styles.profileTopTitle}>
                    <View style={styles.ava}>
                      <Image style={{width: 68, height: 68, borderRadius: 34}}></Image>
                    </View>
                    <View style={styles.nameAndBdgContainer}>
                      <Text style={styles.name}>...</Text>
                      <View style={styles.bdgWrapper}>
                      </View>
                    </View>
                  </View>
                }
            </View>
            <View style={{height: "100%", flex: 1}}>
            </View>
          </View>
        </View>
        

        <View style={{justifyContent: "center", alignItems: "center", zIndex: 1}}>
          <View style={styles.artefactWrapper}>
          {
            this.state.itemAll == 0? 
            <Text style={{marginTop: 118, fontSize: 18, color: colors.SILVER}}>
              No artefacts, click + to add a new one!
            </Text>:[]
          }
          {
            this.state.itemAll == this.state.itemHas? 
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={(() => {return this.state.profileMemberArtefactItem;})()}
              renderItem={this._renderRow}
              sliderHeight={450}
              itemHeight={350}
              vertical={true}
              layout={"stack"}

              slideInterpolatedStyle={(index, animatedValue, carouselProps) => {
                const sizeRef = carouselProps.vertical ? 
                  carouselProps.itemHeight : carouselProps.itemWidth;
                const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
                return (
                  {
                    // zIndex: carouselProps.data.length - index,
                    opacity: animatedValue.interpolate({
                        inputRange: [-3, -2, -1, 0, 1, 2],
                        outputRange: [0, 0.5, 0.8, 1, 0.3, 0]
                    }),
                    transform: [
                      {rotate: animatedValue.interpolate({
                        inputRange: [-2, -1, 0, 1],
                        outputRange: ["2deg","-3deg", "0deg", "-5deg"],
                        extrapolate: 'clamp'
                      })},
                      {[translateProp]: animatedValue.interpolate({
                            inputRange: [-3, -2, -1, 0, 1],
                            outputRange: [
                                sizeRef * 3,
                                sizeRef * 1.9,
                                sizeRef * 0.9,
                                0,
                                -sizeRef*0.000003,
                            ],
                            extrapolate: 'clamp'
                        })},
                      {["translateX"]: animatedValue.interpolate({
                            inputRange: [-2, -1, 0, 1],
                            outputRange: [0,7,0, -sizeRef * 0.01],
                            extrapolate: 'clamp'
                        })}],
                    elevation: animatedValue.interpolate({
                            inputRange: [-3, -2, -1, 0, 1],
                            outputRange: [1,3,6,12,9],
                            extrapolate: 'clamp'
                        }),})
              }}
              
              firstItem={this.state.profileMemberArtefactItem.length - 1}
              inactiveSlideScale={0.85}
              containerCustomStyle={{overflow: "visible", width: "100%"}}
              contentContainerCustomStyle={{alignItems: "center", flexDirection: "column"}}
              slideStyle={{width: "87%", elevation: 5, borderRadius: 6, overflow: "visible"}}
            />: <View></View>
          }
          </View>
        </View>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          styles={{backgroundColor: "#F8F8FF", borderRadius: 6}}
          destructiveButtonIndex={4}
          onPress={(index) => { 
            switch (index) {
              case 1:
                this.props.navigation.navigate("ArtefactGuide", 
                  {member: this.state.memberModel, profileScreen: this});
                break;
              case 2:
                // share on facebook or twitter
                this.props.navigation.navigate("AddArtefactFromMember", 
                  {member: this.state.memberModel, profileScreen: this})
                break;
              default:
                // nothing
            }
          }}
        />

        <View style={styles.floatButton}>
          <TouchableNativeFeedback style={styles.addButton} 
            background={TouchableNativeFeedback.Ripple(colors.WHITE, true)} 
            onPress={() => {this.ActionSheet.show()}}>
            <Icon name="add" size={32} color={colors.WHITE} />
          </TouchableNativeFeedback>
        </View>

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
            <Text style={{textAlign: 'center', fontSize: 22, color: '#fff', marginTop: 200,}}>
              You have unlocked an
            </Text>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#FFD700'}}>
              Achievement!
            </Text>
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
    justifyContent: "center",
  },
  tContainer: {
    backgroundColor: "rgba(106, 84, 166, 0)",
    width: "100%",
    height: 96,
    zIndex: 2,
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  artCard: {
    height: 350,
    borderRadius: 6
  },
  artContainer: {
    transform: [
      { rotateZ: '45deg' }
    ]
  },
  bdg: {
    height: 22, 
    borderRadius: 11, 
    paddingLeft: 8, 
    paddingRight: 8, 
    marginRight: 6
  },
  dbgText: {
    fontSize: 13, 
    color: colors.WHITE, 
    marginTop: 2
  },
  floatButton: {
    height: 72, 
    width: 72, 
    borderRadius: 36, 
    position: "absolute", 
    bottom: 32, 
    right: 23, 
    zIndex:5, 
    backgroundColor: colors.HOMESCREENLIGHTBLUE, 
    elevation: 7, 
    justifyContent: "center", 
    alignItems:"center"
  },
  achievementModalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
  profileTopTitle: {height: "100%", flex: 1, flexDirection: "row"},
  ava: {flex: 2, overflow: "visible", justifyContent: "center", alignItems: "center"},
  nameAndBdgContainer: {flex: 6, paddingLeft: 12, flexDirection: "column", marginTop: 6},
  name: {marginTop: 6, fontSize: 26, color: colors.HOMESCREENLIGHTBLUE, marginLeft: 2},
  bdgWrapper: {flexDirection: "row", alignItems: "flex-start", marginTop: 3},
  artefactWrapper: {justifyContent: "center", alignItems: "center", width: "100%", overflow: "visible", minHeight: 480, paddingTop: 38},
  addButton: {height: 72, width: 72, borderRadius: 36, justifyContent: "center", alignItems:"center"}
});
