import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import DebugScreen from "./DebugScreen";
import HomePage from "./HomePageScreen";
import CommunityMainScreen from "./CommunityMainScreen";
import AccountHold from "./AccountHold"
import MemberPr from "./MemberProfile";
import TestScreen from "./TestScreen";
import CommunityCommentScreen from "./CommunityCommentScreen";
import EditProfile from "./EditProfile";
import Achievement from "./AchievementScreen";
import ArtefactItem from "./ArtefactItem";
import TestFirebase from "./TestFirebase";

import ArtefactGuide from "./ArtefactGuide";
import AddMemberGuide from "./AddMemberGuide";
import ArtGuide from "./AddArtefactFromMemberGuide";
import { createStackNavigator } from "react-navigation";

const AppNavigator = createStackNavigator({
  Debug: {screen: DebugScreen},
  Test:{screen: TestScreen},
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen,},
  SignIn: {screen: SignInScreen},
  HomePage: {screen: HomePage},
  CommunityMain: {screen: CommunityMainScreen},
  CommunityComment: {screen: CommunityCommentScreen},
  AccountHold: {screen: AccountHold},
  MemberPr: {screen: MemberPr},
  EditProfile: {screen: EditProfile},
  Achievement: {screen: Achievement},
  ArtGuide: {screen: ArtGuide},
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