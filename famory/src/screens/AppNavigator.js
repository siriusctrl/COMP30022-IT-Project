import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import DebugScreen from "./DebugScreen";
import HomePage from "./HomePageScreen";
import { createStackNavigator } from "react-navigation";


const AppNavigator = createStackNavigator({
  Debug: {screen: DebugScreen},
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen,},
  SignIn: {screen: SignInScreen},
  HomePage: {screen: HomePage},
}, {
      initialRouteName: 'Debug',
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;