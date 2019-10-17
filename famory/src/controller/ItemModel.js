import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";

// manage class
// singleton, call getInstance() to get an instace
export class ItemModelManage{
  static _managePart = null
  _path = "Item"

  // type of items, used to find the right firebase
  // db path
  type = {
    "image": "imageItem",
    "text": "textItem",
    "video": "videoItem"
  }

  // get instance
  static getInstance(){
    firebaseContainer.getInstance().justStart();
    if(this._managePart == null){
      this._managePart = new ItemModelManage();
    }
    return this._managePart;
  }

  // get a item using its description store in member
  // cb is callback function that is called after getting the item
  // cb should take a itemModel
  getItem(callback, memberDescri){
    let path = this._path + "/" + this.type[memberDescri["type"]] + "/" + memberDescri["id"];
    let memberRef = firebase.database().ref(path);
    memberRef.once("value").then((snapshotDB) => {
      snapshot = snapshotDB.val();
      let member = new Item(snapshot, memberDescri["type"], memberDescri["id"]);
      callback(member);
    })
  }

  setItem(callback, details, memberModel, type){

    let path = {
      "image": "imageItem",
      "text": "textItem",
      "video": "videoItem"
    }[type]

    itemIds = Object.keys(memberModel.item).map((a) => Number(a))


    if(Object.keys(memberModel.item).length != 0){
      itemId = Math.max.apply(null, itemIds) + 1
    }else{
      itemId = 0
    }
    
    nextId = itemId
    firebase.database().ref(this._path + "/" + path + "/" + "maxTo/").once("value").then((maxMember) => {
      let maxId = maxMember.val()
      let newItemId = type + "_" + (Number(maxId) + 1)
      firebase.database().ref(this._path + "/" + path + "/" + newItemId).set(details)
      firebase.database().ref(memberModel._path + "/item" + "/" + nextId).set({id: newItemId, 
        type: type })
      firebase.database().ref(this._path + "/" + path + "/" + "maxTo/").set((Number(maxId) + 1))
      let item = new Item(details, type, newItemId);

      callback(item)
    });
  }

  // get all items count to unlock achievement where appropriate
  getItemCount(callback, count) {
    let path = [
      this._path + "/" + "imageItem/maxTo", 
      this._path + "/" + "textItem/maxTo", 
      this._path + "/" + "videoItem/maxTo"
    ];
    let total = 0;
    // get count and update callback
    firebase.database().ref(path[0]).once("value").then((snapshot1) => {
      total += snapshot1.val();
      firebase.database().ref(path[1]).once("value").then((snapshot2) => {
        total += snapshot2.val();
        firebase.database().ref(path[2]).once("value").then((snapshot3) => {
          total += snapshot3.val();
          if (total === count) {
            callback(true);
          } else {
            callback(false);
          }
        });
      });
    });
  }
}

// item
export class Item{

  // item types
  typeA = {
    "image": "imageItem",
    "text": "textItem",
    "video": "videoItem"
  }

  constructor(snapshot, type, id){
    this.content = snapshot["content"]
    this.dateAdded = snapshot["dateAdded"]
    this.description = snapshot["description"]
    this.name = snapshot["name"]
    this.itemId = id;
    this.type = type;

    // db path
    this._path = "Item/" + this.type[type] + "/" + id
  }

  // to normal javascript object with only information
  toObject(){
    return {
      content: this.content,
      dateAdded: this.dateAdded,
      description: this.description,
      name: this.name,
      itemId: this.itemId
    }
  }
}

export default ItemModelManage;
