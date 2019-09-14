import * as firebase from "firebase";
// REVIEW : firebase is a global namespace which you can access all the facilities in firebase, so remove '* as'
// I did this for you for all the page and tested well.

export class FamilyModelManage{

  static _managePart = null
  _familyPath = "families"

  static getInstance(){
    if(this._managePart == null){
      this._managePart = new FamilyModelManage();
    }
    return this._managePart;
  }

  getFamily(familyId){
    
  }

  setFamily(familyName){

    
    let setUpFamily = new Family(familyName);

    let familyReference = firebase.database().ref(this._familyPath);
    let familyPromise = familyReference.push();
    familyPromise.set(
      setUpFamily.toObject()
    )

    let familyId = this._getFamilyId(familyPromise.parent.toString(), familyPromise.toString());

    setUpFamily.setId(familyId)
    
    return setUpFamily;
  }

  _getFamilyId(promiseParent, promiseString){
    return promiseString.slice((promiseParent.length + 1), promiseString.length)
  }
}


export class Family{

  familyId = "-1";

  constructor(familyName){
    this.familyName = familyName
  }

  toObject(){
    return {familyName: this.familyName}
  }

  setId(familyId){
    this.familyId = familyId;
  }

  isValid(){
    return !this.familyId == "-1";
  }

  


}


export default familyModel = {
  FamilyModelManage: FamilyModelManage
}
