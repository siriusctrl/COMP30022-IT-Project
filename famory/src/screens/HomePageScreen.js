import React, {Component} from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../config/colors";
import strings from "../config/strings";
import IconButtonWithText from "../components/IconButtonWithText";
import Empty from "../components/Empty";
import ImageButton from "../components/ImageButton";
import { Avatar } from "react-native-elements";
import Button from "../components/Button";
import TouchableScale from 'react-native-touchable-scale';

import FamilyAccountModelManage from "../controller/FamilyAccountModel";
import MemberModelManage from "../controller/MemberModel";
import AchievementModelManage from "../controller/AchievementModel";
import LottieView from "lottie-react-native";

export default class HomePageScreen extends Component{
  state = {
    visibleModal: false,
    mode: "view",
    familyAccount: null,
    avatars: [{id:1, empty:true, gen:" "},],
    memberModel: {},
    memberRdy : false,
    familyName: "Family Tag",
    isAchievementVisible: false,
  };
  
  static navigationOptions = {
    header: null
  }


  //load avatar info from server
  async componentDidMount() {

    // listener to add member achievement update
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const prevScreen = this.props.navigation.getParam('prevScreen', 'nothing');
      if (prevScreen === 'AddMemberGuide') {
        for (let i of [1, 5, 10]) {
          MemberModelManage.getInstance().checkMemberCount((result) => {
            if (result) {
              // update achievement here
              let id = 0;
              if (i === 1) id = 1;
              if (i === 5) id = 2;
              if (i === 10) id = 3;
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

    this.getMembers();
    this.props.navigation.setParams({
      state: this.state,
      edit:this._renderEditText(),
    });
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

  setModel = (familyAccount) => {
    this.setState({familyAccount: familyAccount});
      this.setState({familyName: familyAccount.name + "'s Family"});
      familyAccount.getMembers((members) => {
        this.setState({avatars: []})
        if(this.state.mode === "edit"){
          this.setState({mode: "view"});
        }
        for(let member of Object.values(members)){
            while (this.state.avatars.length <= member.generation){              
              this.state.avatars.push({});
            }

            temp = this.state.avatars[member.generation];
            temp.gen = "GEN " + member.generation;
            // add member objects to each columns
            temp.members == null ? temp.members = [member] : temp.members.push(member);
  
        }
        this.setState({memberRdy:true});
      });
  }


  getMembers = () => {
    FamilyAccountModelManage.getInstance().getFamilyAccount((familyAccount) => {
      this.setModel(familyAccount);
    });
  }

  // the function will be load here
  _loadMembers = () => {
    this.getMembers();
  }

  // Item separator
  FlatListItemSeparator = () => {
    return (
      <View style={{alignItems:"center", justifyContent:"center"}}>
        <View
          style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
        />
      </View>
    );
  }


  /* construct avatar for each column in flexList
   * will be called at _renderItem
   */
  avatarConstructor = (item) => {
    let jsx = [];
    for (m of item.members) {
      jsx.push(
        <View style={{marginRight: 11, marginBottom: 16}}>
          <ImageButton
            name={" "}
            imageSource={{uri:m.profileImage}}
            onPressHandler={((member) => () => {this._handleAvatarPressed(member)})(m)}
            boarderColor={m.ringColor}
            Component={TouchableScale}
            activeScale={0.95}
            fraction={3}
            // control how strong the the resilience is
            tension={100}
          />
        </View>
      );
    }

    if(this.state.mode==="edit"){
      jsx.push(
        <View style={{marginBottom:16}}>
          <Avatar
            icon={{name:"add", type:"ion-icon"}}
            rounded
            size={"medium"}
            onPress={() => {this._handleAddPressed(item)}}
            activeOpacity={0.7}
            Component={TouchableScale}
            activeScale={0.95}
          />
        </View>
      );
    }

    return jsx;
  }


  // a render function to render each column in FlatList based on the current state
  _renderItem = ({item}) => {
    if (item.members){
      return (
        <View style={styles.flatListContainer}>
          <View style={{flex: 1}}>
            <Text style={{fontSize:15, backgroundColor:"transparent"}}>
              {item.gen}
            </Text>
          </View>

          <View style={{flex: 4, flexDirection: "row", justifyContent: "flex-start", flexWrap:"wrap", alignContent:"space-around"}}>
           {this.avatarConstructor(item)}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.flatListContainer}>
          <View style={{flex: 1}}>
            <Text style={{fontSize:15, backgroundColor:"transparent"}}>
              <Empty/>
            </Text>
          </View>

          <View style={{flex: 4, flexDirection: "row", justifyContent: "flex-start", flexWrap:"wrap", alignContent:"space-around"}}>
            {/* the marginbotton to align the separator with the bottom of family tag */}
            <View style={{marginRight: 11, marginBottom: 10}}>
              <ImageButton
                name={" "}
                boarderColor="transparent"
                showEditButton={false}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  // render the "Edit" button at the section bottom bar, 
  // which based on current state either view or edit
  _renderEditText = () => {
    if (this.state.mode === "view"){
      return(
        <Text style={{fontSize:15, flex: 1, color: colors.WHITE}} onPress={this._handleEditPress}>
          EDIT
        </Text>
      );
    } else {
      return(
        <Text style={{fontSize:15, flex: 1, color: colors.WHITE}} onPress={this._handleEditPress}>
          DONE
        </Text>
      );
    }
  }
  
  _handleCommunityPress = () => {
    this.props.navigation.navigate("CommunityMain");
  }

  _handleAccountPress = () => {
    this.props.navigation.navigate("AccountHold");
  }

  _handleEditPress = () => {
    if(this.state.mode === "view"){
      this.setState({mode: "edit"});
    } else {
      this.setState({mode: "view"});
    }
  }

  _handleAvatarPressed = (member) => {
    this.props.navigation.navigate('MemberProfile', {
      model: member
    });
  }

  _handleAddPressed = (item) => {
    this.props.navigation.navigate('AddMemberGuide',{
      gen: item.gen,
      familyAccount: this.state.familyAccount,
      homePageScreen: this
    })
  }

  // the entire JSX to render the whole screen
  render() {
    return (
      <View style={{flex: 1}}>

        <View>
          <FlatList 
            //data={this.avatar}
            data={this.state.avatars}
            extraData={this.state}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.FlatListItemSeparator}
          />
        </View>

        <View style={{width: "100%", height: 76, position:'absolute', top:0}}>
          <View style={{flex:1, backgroundColor:colors.LIGHTBLUE, flexDirection:"row", paddingLeft: 12, alignItems: "center"}}>
            <Text style={{fontSize:25, backgroundColor:"transparent", flex: 7, color: colors.WHITE}}>
              {this.state.familyName}
            </Text>
            {this._renderEditText()}
          </View>
        </View>
        
        <View style={{width: "100%", height: 76, position:'absolute', bottom:0}}>

          <View style={styles.buttonContainer}>
            <Empty/>
            <IconButtonWithText
              onPress={this._handleAccountPress}
              label={strings.HOME_ACCOUNT} 
              extraStyles={{...styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="user"
            />
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <Empty/>
            <IconButtonWithText 
              onPress={this._handleCommunityPress}
              label={strings.HOME_COMMUNITY} 
              extraStyles={{backgroundColor: colors.ORANGE, ... styles.extraStyles}} 
              extraTextStyles={styles.extraTextStyles} 
              nameOfIcon="glasses"/>
            <Empty/>
          </View>
        </View>

        <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>
          <Modal 
            isVisible={this.state.visibleModal} 
            style={styles.modal}
            onBackdropPress={this._toggleModal}
            onBackButtonPress={this._toggleModal}
            animationInTiming={500}
            animationOutTiming={300}
            animationIn={'zoomInUp'}
            animationOut={'fadeOut'}
          >

            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
              <View style={{flex:4, flexDirection:"row", marginVertical:10}}>

                <View style={{marginHorizontal:10}}>
                  <Avatar
                  icon={{name:"more-horiz", type:"material"}} 
                  rounded
                  size={"medium"}/>
                </View>

                <Avatar
                icon={{name:"more-horiz", type:"material"}} 
                rounded
                size={"medium"}/>

              </View>
              <View style={{flex:1}}>
                <Button label="Hide modal" onPress={this._toggleModal} extraStyles={{backgroundColor:colors.TORCH_RED, marginVertical:10}}/>
              </View>
            </View>
          </Modal>
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
            <Text style={{textAlign: 'center', fontSize: 22, color: '#fff', marginTop: 200,}}>You have unlocked an</Text>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#FFD700'}}>Achievement!</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  extraStyles:{
    height:42, 
    borderRadius:21,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 18,
    flex: 1
  },
  extraTextStyles:{
    fontSize:14, 
    marginRight: 12
  },
  buttonContainer:{
    flex:1, 
    backgroundColor:colors.HOMESCREENLIGHTBLUE, 
    flexDirection:"row", 
    padding:10, 
    justifyContent:"space-between", 
    alignItems: "center"
  }, 
  modal:{
    marginVertical:170, 
    backgroundColor:colors.WHITE, 
    borderRadius:15, 
    justifyContent:"center"
  }, 
  flatListContainer:{
    backgroundColor: "transparent", 
    flexDirection:"row", 
    alignItems:'center', 
    paddingLeft: 12, 
    paddingTop: 16
  },
  achievementModalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
});