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
import ForgetPasswordScreen from "./ForgetPasswordScreen";

import ArtefactGuide from "./ArtefactGuideScreen";
import AddMemberGuide from "./AddMemberGuideScreen";
import AddArtefactFromMemberGuideScreen from "./AddArtefactFromMemberGuideScreen";
import { createStackNavigator } from "react-navigation";
import { fromRight, flipY } from 'react-navigation-transitions';


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (prevScene
    && prevScene.route.routeName === 'CommunityMain'
    && nextScene.route.routeName === 'CommunityComment') {
      return flipY(800);
  }

  return fromRight(500);
}

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
  AddMemberGuide: {screen: AddMemberGuide},
  ForgetPassword: {screen: ForgetPasswordScreen},
  Achievement: {screen: Achievement}
}, {
      // should be debug
      initialRouteName: "Debug",
      transitionConfig: (screens) => handleCustomTransition(screens)
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;