import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";

export class MemberModelManage{
  static _managePart = null
  _path = "FamilyMember"

  static getInstance(){
    if(this._managePart == null){
      this._managePart = new MemberModelManage();
    }
    return this._managePart;
  }

  getMember(cb, id){
    // REVIEW : Delete if you don't want to use it
    firebaseContainer.getInstance().justStart();
    let returned = {}
    let memberRef = firebase.database().ref(this._path + "/" + id);
    // REVIEW : use a better input name
    memberRef.once("value").then((snapshota) => {
      // REVIEW : use a better input name
      snapshot = snapshota.val();

      let member = new Member(snapshot, id);
      // REVIEW : use a better input name
      cb(member);

    });
  }

  // REVIEW : function?
  setModel(memberName){
  
  }
}


export class Member{

  constructor(snapshot, id){
    this.role = snapshot["role"];
    this.dob = snapshot["dob"];
    this.firstName = snapshot["firstName"];
    this.gender = snapshot["gender"];
    this.generation = snapshot["generation"];
    this.item = snapshot["item"];
    this.lastName = snapshot["lastName"];
    this.profileImage = snapshot["profileImage"];
    this.ringColor = snapshot["ringColor"];
    this.memberId = id;
    this._path = "FamilyMember" + "/" + id;
  }

  // REVIEW :  toJson is better from my point of view
  toObject(){
    return {
      dob: this.dob,
      firstName: this.firstName,
      gender: this.gender,
      generation: this.generation,
      item: this.item,
      lastName: this.lastName,
      profileImage: this.profileImage,
      ringColor: this.ringColor,
      id: this.id,
    }
  }


  updateFirstName = (newFirstName) => {
    firebaseContainer.getInstance().justStart();
    let MemberReference = firebase.database().ref(this._path + "/firstName");
    MemberReference.set(newFirstName);
  }
}

// REVIEW : why don't simply export the class?
export default memberModel = {
  MemberModelManage: MemberModelManage
}
