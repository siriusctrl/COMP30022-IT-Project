import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";
import ItemModelManage from "./ItemModel";

import MemberModelManage from "./MemberModel";

export class FamilyAccountModelManage{

  static _managePart = null
  _path = "FamilyAccount"

  static getInstance(){
    firebaseContainer.getInstance().justStart();
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

  // TODO when sign up a account then use this to push to the database
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

  member = {}

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

  delMember(memberId){
    if(this.member[memberId]){
      
    }
  }

  isValid(){
    return this.email != "";
  }

  delMember(memberId){
    
  }

  


}


export default FamilyAccountModelManage;