import * as firebase from "firebase";
import firebaseContainer from "./firebaseConfig";


export class AchievementModelManage {
  static _managePart = null
  _achievementPath = "FamilyAccount/achievement"

  // get instance of Achievement model manager
  static getInstance() {
    firebaseContainer.getInstance().justStart();
    if (this._managePart == null) {
      this._managePart = new AchievementModelManage();
    }
    return this._managePart;
  }

  // get achievement posts and return as an array
  getAchievement(callback) {

    let achievementRef = firebase.database().ref(this._achievementPath);
    achievementRef.once("value").then((snapshot) => {

      let unlocked = [];
      let unlockDate = [];
      // for each post, get object and put to array of badges
      objectlist = snapshot.val();
      for (let i = 1; i < 10; i++) {
        //alert(i + ": " +  objectlist[i.toString()].dateCompleted);
        if (objectlist[i.toString()].completed === true) {
          unlocked.push(1);
        } else {
          unlocked.push(0);
        }
        unlockDate.push(objectlist[i.toString()].dateCompleted);
      }

      callback(unlocked, unlockDate);
    });
  }
}


export class Badge {

  completed = false;
  dateCompleted = "Jan 1, 1970";

  constructor(badge){
    this.completed = badge["completed"];
    this.dateCompleted = badge["dateCompleted"];
  }

  toObject() {
    return {
      completed: this.completed,
      dateCompleted: this.dateCompleted,
    }
  }
}

export default achievementModel = {
  AchievementModelManage: AchievementModelManage
}
