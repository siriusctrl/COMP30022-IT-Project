import AppNavigator from "./src/screens/AppNavigator";
import React from "react";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppNavigator/>
//     );
//   }   
// }

export default createAppContainer(AppNavigator);