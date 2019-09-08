import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAUg74-P-HB6wyklgGFfuM61x4D77RJeq4",
  authDomain: "fir-one-28de9.firebaseapp.com",
  databaseURL: "https://fir-one-28de9.firebaseio.com/",
  projectId: "fir-one-28de9",
  storageBucket: "fir-one-28de9.appspot.com",
  messagingSenderId: "609981049573"
};

export default class firebaseContainer{
  

  firebaseCon = firebaseConfig;

  constructor(){
    if(!firebase.apps.length){
      firebase.initializeApp(this.firebaseCon);
    }
  }

  isInitialized(){
    return firebase.apps.length;
  }
}