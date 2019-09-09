import * as firebase from "firebase";

export class MemberModelManage{
  static _managePart = null
  _path = "Family_Member"

  static getInstance(){
    if(this._managePart == null){
      this._managePart = new MemberModelManage();
    }
    return this._managePart;
  }

  setModel(memberName){
    
    let setUpMember = new Member(memberName);
    let memberReference = firebase.database().ref(this._path);
    let memberPromise = memberReference.push();
    memberPromise.set(
      setUpMember.toObject()
    )

    let memberId = this._getFamilyId(memberPromise.parent.toString(), memberPromise.toString());

    setUpMember.setId(memberId);
    
    return setUpMember;
  }
}


export class Member{

  id = "-1";

  constructor(memberName){
    this.memberName = memberName
  }

  toObject(){
    return {memberName: this.memberName}
  }

  setId(id){
    this.id = id;
  }

  isValid(){
    return !this.id == "-1";
  }
}


export default familyModel = {
  FamilyModelManage: FamilyModelManage
}
