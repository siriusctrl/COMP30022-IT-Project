import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";
import ItemModelManage from "./ItemModel";

import MemberModelManage from "./MemberModel";

// manage class
// singleton, call getInstance() to get an instace
export class FamilyAccountModelManage{

  static _managePart = null
  _path = "FamilyAccount"

  // get instance
  static getInstance(){
    firebaseContainer.getInstance().justStart();
    if(this._managePart == null){
      this._managePart = new FamilyAccountModelManage();
    }
    return this._managePart;
  }

  // get family account
  // cb is the callback when get the data, takes a familyAccountModel
  getFamilyAccount(callback){
    let familyAccountRef = firebase.database().ref(this._path);
    familyAccountRef.once("value").then((snapshota) => {
      snapshot = snapshota.val();
      let familyAccount = new FamilyAccount(snapshot);
      callback(familyAccount);

    });
  }

  // TODO when sign up a account then use this to push to the database
  setFamilyAccount(familyName){
    
  }
}


// family account model
// contains information for family account and the function to modify
export class FamilyAccount{

  avatar = "-1";
  dateCreated = 0;
  email = "";
  familyMember = [];
  name = "";
  _path = "FamilyAccount"

  constructor(accountObject){
    this.avatar = accountObject["avatar"];
    this.dateCreated = accountObject["dateCreated"];
    this.email = accountObject["email"];
    this.familyMember = accountObject["familyMember"];
    this.name = accountObject["name"];
    this.achievement = accountObject["achievement"];
  }

  member = {}

  // to normal javascript object with only information
  toObject(){
    return {
      achievement: this.achievement,
      avatar: this.avatar,
      dateCreated: this.dateCreated,
      email: this.email,
      familyMember: this.familyMember,
      name: this.name
    }
  }


  // get all members
  // callback is called after getting them
  // callback should be a function that takes a list of memberModel
  getMembers(callback){
    if(Object.keys(this.member).length != this.familyMember.length){
      for (let member of Object.keys(this.familyMember)) {
        MemberModelManage.getInstance().getMember((memberModel) => {
          this.member[this.familyMember[member]] = memberModel
          if(Object.keys(this.member).length == Object.keys(this.familyMember).length){
            callback(this.member)
          }
        }, this.familyMember[member])
      }
    }else{
      callback(this.member)
    }
  }

  // del member
  delMember(memberId){
    if(this.member[memberId]){
      
    }
  }
}


export default FamilyAccountModelManage;