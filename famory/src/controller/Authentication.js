import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";

export default class authentication {
  constructor(){
    let base = firebaseContainer.getInstance();
    base.justStart();
  }

  static _auth = null;

  static getInstance(){
    if(this._auth == null){
      this._auth = new authentication();
    }
    return this._auth;
  }

  static verifyEmail = (email, pwd) => {
    firebase.auth().signInWithEmailAndPassword(email, pwd)
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    });
  }
}