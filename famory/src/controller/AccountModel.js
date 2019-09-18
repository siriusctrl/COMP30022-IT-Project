import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";


export class AccountModelManage {

  static _managePart = null
  _accountPath = "FamilyAccount"

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

      callback(familyName, dateCreated);
    });
  }
}

export class Family{

  familyName = "";
  dateCreated = "Jan 01, 1970"

  constructor(family){
    this.familyName = family["familyName"];
    this.dateCreated = family["dateCreated"];
  }

  toObject() {
    return {
      familyName: this.familyName,
      dateCreated: this.dateCreated,
    }
  }

}

export default accountModel = {
  AccountModelManage: AccountModelManage
}
