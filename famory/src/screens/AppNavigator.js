import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import DebugScreen from "./DebugScreen";
import HomePage from "./HomePageScreen";
import CommunityMainScreen from "./CommunityMainScreen";
import AccountHold from "./AccountHold"
import MemberPr from "./MemberPr";
import TestScreen from "./TestScreen";
import CommunityCommentScreen from "./CommunityCommentScreen";
import EditProfile from "./EditProfile";
import ContactSupport from "./ContactSupport";
import Achievement from "./AchievementScreen";

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
  ContactSupport: {screen: ContactSupport},
  Achievement: {screen: Achievement}
}, {
      // should be debug
      initialRouteName: 'Debug',
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;