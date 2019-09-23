import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignUpScreen from "./SignUpScreen";
import DebugScreen from "./DebugScreen";
import HomePage from "./HomePageScreen";
import CommunityMainScreen from "./CommunityMainScreen";
import MemberPr from "./MemberProfileScreen";
import AccountHoldScreen from "./AccountHoldScreen";
import TestScreen from "./TestScreen";
import CommunityCommentScreen from "./CommunityCommentScreen";
import EditProfileScreen from "./EditProfileScreen";
import Achievement from "./AchievementScreen";
import ArtefactItem from "./ArtefactItemScreen";
import TestFirebase from "./TestFirebase";

import ArtefactGuide from "./ArtefactGuideScreen";
import AddMemberGuide from "./AddMemberGuideScreen";
import AddArtefactFromMemberGuideScreen from "./AddArtefactFromMemberGuideScreen";
import { createStackNavigator } from "react-navigation";

const AppNavigator = createStackNavigator({
  Debug: {screen: DebugScreen},
  Test:{screen: TestScreen},
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen,},
  SignUp: {screen: SignUpScreen},
  HomePage: {screen: HomePage},
  CommunityMain: {screen: CommunityMainScreen},
  CommunityComment: {screen: CommunityCommentScreen},
  AccountHold: {screen: AccountHoldScreen},
  MemberPr: {screen: MemberPr},
  EditProfile: {screen: EditProfileScreen},
  AddArtefactFromMember: {screen: AddArtefactFromMemberGuideScreen},
  ArtefactItem: {screen: ArtefactItem},
  TestFirebase: {screen: TestFirebase},
  ArtefactGuide: {screen: ArtefactGuide},
  AddMemberGuide: {screen: AddMemberGuide}

}, {
      // should be debug
      initialRouteName: "Debug",
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;