import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUg74-P-HB6wyklgGFfuM61x4D77RJeq4",
  authDomain: "fir-one-28de9.firebaseapp.com",
  databaseURL: "https://fir-one-28de9.firebaseio.com/",
  storageBucket: "gs://fir-one-28de9.appspot.com"
};

export default class firebaseContainer{


  firebaseOn = false;

  firebaseCon = firebaseConfig;

  constructor(){
    if(!firebaseOn){
      firebase.initializeApp(this.firebaseCon);
      this.firebaseOn = true;
    }
  }
}