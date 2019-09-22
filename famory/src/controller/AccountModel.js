import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";


export class AccountModelManage {

  static _managePart = null;
  _accountPath = "FamilyAccount";

  // get instance of Account model manager
  static getInstance() {
    firebaseContainer.getInstance().justStart();
    if (this._managePart == null) {
      this._managePart = new AccountModelManage();
    }
    return this._managePart;
  }

  // get Account info
  getAccount(callback) {
    let accountRef = firebase.database().ref(this._accountPath);
    accountRef.once("value").then((snapshot) => {

      // get objectlist
      objectlist = snapshot.val();

      // get family name and date of creation
      let familyName = objectlist.name;
      let dateCreated = objectlist.dateCreated;
      let avatar = objectlist.avatar;

      callback(familyName, dateCreated,avatar);
    });
  }
}

export class Family{

  familyName = "";
  dateCreated = "Jan 01, 1970";
  avatar = "";

  constructor(family){
    this.familyName = family["familyName"];
    this.dateCreated = family["dateCreated"];
    this.avatar = family["avatar"];
  }

  toObject() {
    return {
      familyName: this.familyName,
      dateCreated: this.dateCreated,
      avatar: this.avatar,
    }
  }

}

export default accountModel = {
  AccountModelManage: AccountModelManage
}
