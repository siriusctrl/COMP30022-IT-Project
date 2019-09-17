import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";
import ItemModelManage from "./ItemModel"

export class itemModelManage{
  static _managePart = null
  _path = "FamilyMember"

  static getInstance(){
    firebaseContainer.getInstance().justStart();
    if(this._managePart == null){
      this._managePart = new itemModelManage();
    }
    return this._managePart;
  }

  getMember(callBack, id){
    let memberRef = firebase.database().ref(this._path + "/" + id);
    memberRef.once("value").then((snapshotGot) => {
      snapshot = snapshotGot.val();
      let member = new Member(snapshot, id);
      callBack(member);
    });
  }

  // TODO add member
  setMember(memberName){
  
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
    this.itemsId = id;
    this._path = "FamilyMember" + "/" + id;
  }

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

  items = {}


  updateFirstName = (newFirstName) => {
    firebaseContainer.getInstance().justStart();
    let MemberReference = firebase.database().ref(this._path + "/firstName");
    MemberReference.set(newFirstName);
  }

  getItems(callback){
    if(Object.keys(this.items).length != this.item.length){
      for (let item of Object.keys(this.item)) {
        ItemModelManage.getInstance().getItem((itemModel) => {
          this.items[item] = itemModel
          
          if(Object.keys(this.items).length == Object.keys(this.item).length){
            
            callback(this.items)
          }

        }, this.item[item])
      }
    }else{
      callback(this.items)
    }
  }
}

export default itemModelManage;
