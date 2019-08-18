import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import { createStackNavigator } from "react-navigation";


const AppNavigator = createStackNavigator({
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