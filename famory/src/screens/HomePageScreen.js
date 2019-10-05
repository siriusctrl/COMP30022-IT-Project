import React, {Component} from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import colors from "../config/colors";
import strings from "../config/strings";
import IconButtonWithText from "../components/IconButtonWithText";
import Empty from "../components/Empty";
import ImageButton from "../components/ImageButton";
import { Avatar } from "react-native-elements";
import Button from "../components/Button";
import TouchableScale from 'react-native-touchable-scale';
import { Icon } from 'react-native-elements'

import FamilyAccountModelManage from "../controller/FamilyAccountModel";
import MemberModelManage from "../controller/MemberModel";
import AchievementModelManage from "../controller/AchievementModel";
import LottieView from "lottie-react-native";

export default class HomePageScreen extends Component{
  state = {
    visibleModal: false,
    mode: "view",
    familyAccount: null,
    avatars: [],
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
    for (let m of item.members) {
      jsx.push(
        <View style={{marginRight: 14, marginBottom: 16, elevation: 6}}>
          <ImageButton
            name={" "}
            imageSource={{uri:m.profileImage}}
            onPressHandler={((member) => () => {this._handleAvatarPressed(member)})(m)}
            boarderColor={m.ringColor}
            Component={TouchableScale}
            activeScale={0.95}
            fraction={3}
<<<<<<< HEAD
            tension={150}
            style={{width: 64, height: 64}}
=======
            // control how strong the the resilience is
            tension={100}
>>>>>>> master
          />
          {this.state.mode==="edit"? 
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'Delete member ' + m.firstName + " " + m.lastName + " ?",
                m.firstName + " " + m.lastName + " and his " + Object.keys(m.item).length + " Artefacts will be gone.",
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {this.state.familyAccount.delMember(
                      (familyAccount) => {
                        this.setModel(familyAccount);
                      }, m.memberId
                    )}
                  },
                ],
                {cancelable: false},
              )}} style={{position: "absolute", right: 0, Top: 0, width: 30, height: 30, borderRadius: 15, elevation: 6}}>
              <View style={{backgroundColor: colors.TORCH_RED, width: 30, height: 30, borderRadius: 15, borderColor: colors.WHITE, borderWidth: 2, justifyContent: "center", alignItems: "center"}}>
                <Icon name='clear' size={17} color={colors.WHITE}/>
              </View>
            </TouchableOpacity>:[]}
        </View>
      );
    }

    if(this.state.mode==="edit"){
      jsx.push(
        <View style={{marginBottom:16, width: 64, height: 64}}>
          <Avatar
            icon={{name:"add", type:"ion-icon"}}
            rounded
            size={64}
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
          <View style={{flex: 1, paddingRight: 2}}>
            <Icon name="supervisor-account" color={colors.SILVER}/>
            <Text style={{fontSize:12, textAlign: "center", color: colors.SILVER}}>
              {item.gen}
            </Text>
          </View>

          <View style={{flex: 4.3, flexDirection: "row", justifyContent: "flex-start", flexWrap:"wrap", alignContent:"space-around", paddingTop: 16}}>
           {this.avatarConstructor(item)}
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

        <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <FlatList 
            //data={this.avatar}
            data={this.state.avatars}
            extraData={this.state}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            style={{width: "100%", height: "80%", marginTop: 76, marginBottom: 76}}
          />
        </View>

        <View style={{width: "100%", height: 76, position:'absolute', top:0, borderRadius: 12}}>
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

        <Modal
          isVisible={this.state.isAchievementVisible}
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
    justifyContent: "center",
  },
  achievementModalStyle: {
    borderRadius: 15,
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: 'transparent',
  },
});