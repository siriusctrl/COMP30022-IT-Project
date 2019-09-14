import firebase from "firebase";
// REVIEW : remove wasted import
import firebaseContainer from "./firebaseConfig";

export class FamilyAccountModelManage{

  static _managePart = null
  _path = "FamilyAccount"

  static getInstance(){
    if(this._managePart == null){
      this._managePart = new FamilyAccountModelManage();
    }
    return this._managePart;
  }

  // cb is the callback when get the data
  getFamilyAccount(cb){
    let returned = {}
    let familyAccountRef = firebase.database().ref(this._path);
    familyAccountRef.once("value").then((snapshota) => {

      snapshot = snapshota.val();
      let familyAccoun = new FamilyAccount(snapshot);

      cb(familyAccoun);

    });
  }

  // REVIEW : remove unimplemented functions
  setFamilyAccount(familyName){

  }

  _getFamilyId(promiseParent, promiseString){
    return promiseString.slice((promiseParent.length + 1), promiseString.length)
  }
}


export class FamilyAccount{

  avatar = "-1";
  dateCreated = 0;
  email = "";
  familyMember = [];
  name = "";

  constructor(accountObject){
    this.avatar = accountObject["avatar"];
    this.dateCreated = accountObject["dateCreated"];
    this.email = accountObject["email"];
    this.familyMember = accountObject["familyMember"];
    this.name = accountObject["name"];
    this.achievement = accountObject["achievement"];
  }

  toObject(){
    return {
      achievement: this.achievement,
      avatar: this.avatar,
      dateCreated: this.dateCreated,
      email: this.email,
      familyMemberAll: this.familyMemberAll,
      name: this.name
    }
  }

  isValid(){
    return this.email != "";
  }

  


}


export default familyModel = {
  FamilyAccountModelManage: FamilyAccountModelManage
}
