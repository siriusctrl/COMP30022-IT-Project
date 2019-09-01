import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import DebugScreen from "./DebugScreen";
import HomePage from "./HomePageScreen";
import CommunityMainScreen from "./CommunityMainScreen";
import TestScreen from "./TestScreen";
import MemberPr from "./MemberPr";
import { createStackNavigator } from "react-navigation";


const AppNavigator = createStackNavigator({
  Debug: {screen: DebugScreen},
  Test:{screen: TestScreen},
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen,},
  SignIn: {screen: SignInScreen},
  HomePage: {screen: HomePage},
  CommunityMain: {screen: CommunityMainScreen},
  MemberPr: {screen: MemberPr},
}, {
      // should be debug
      initialRouteName: 'Debug',
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;