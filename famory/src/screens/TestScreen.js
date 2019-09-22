import authentication from "../controller/Authentication";
import Component from "react";
import {view, text} from "react-native";

export default class TestScreen extends Component {

  async componentDidMount() {
    await authentication.getInstance().verifyEmail("testing@gmail.com", 12345);
  }
  
  render(){
    return(
      <View/>
    );
  }
}