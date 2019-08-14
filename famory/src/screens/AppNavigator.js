import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import { createStackNavigator } from "react-navigation";


const AppNavigator = createStackNavigator({
    Welcome: {screen: WelcomeScreen},
    Login: {screen: LoginScreen,},
  }, {
      initialRouteName: 'Welcome',
}, {
  defaultNavigationOptions:{
    header:null
  }
});

export default AppNavigator;