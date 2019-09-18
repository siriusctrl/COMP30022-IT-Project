import * as firebase from "firebase";
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
  getItem(cb, memberDescri){
    let returned = {}
    let memberRef = firebase.database().ref(this._path + "/" + this.type[memberDescri["type"]] + "/" + memberDescri["id"]);
    memberRef.once("value").then((snapshota) => {
      snapshot = snapshota.val();
      let member = new Item(snapshot, memberDescri["type"], memberDescri["id"]);
      cb(member);

    })
  }

  setModel(memberName){
  
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


export default ItemModelManage
