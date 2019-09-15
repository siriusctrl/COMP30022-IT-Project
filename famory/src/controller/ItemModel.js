import * as firebase from "firebase";
import firebaseContainer from "./firebaseConfig";

export class ItemModelManage{
  static _managePart = null
  _path = "Item"

  type = {
    "image": "imageItem",
    "text": "textItem",
    "video": "videoItem"
  }

  static getInstance(){
    firebaseContainer.getInstance().justStart();
    if(this._managePart == null){
      this._managePart = new ItemModelManage();
    }
    return this._managePart;
  }

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


export class Item{


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
    this._path = "Item/" + this.type[type] + "/" + id
  }

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


export default itemModel = {
  ItemModelManage: ItemModelManage
}
