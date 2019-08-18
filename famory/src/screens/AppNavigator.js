import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import DebugScreen from "./DebugScreen";
import { createStackNavigator } from "react-navigation";


const AppNavigator = createStackNavigator({
  Debug: {screen: DebugScreen},
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen,},
  SignIn: {screen: SignInScreen},
}, {
      initialRouteName: 'Welcome',
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;