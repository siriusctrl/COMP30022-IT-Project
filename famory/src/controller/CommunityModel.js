import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";

export class CommunityModelManage{

  static _managePart = null
  _path = "Post"

  // get instance of community model manager
  static getInstance(){
    firebaseContainer.getInstance().justStart();
    if (this._managePart == null){
      this._managePart = new CommunityModelManage();
    }
    return this._managePart;
  }

  // get community posts and return as an array
  getCommunity(callback) {

    let communityRef = firebase.database().ref(this._path);
    communityRef.once("value").then((snapshot) => {

      let posts = [];
      // for each post, get object and put to array of posts
      objectlist = snapshot.val();
      for (let i = 1; i < objectlist.length; i++) {
        posts.push(new Post(objectlist[i.toString()]));
      }

      callback(posts);
    });
  }

  // update like + 1
  increaseLike(callback, id) {

    let likeRef = firebase.database().ref(this._path + '/' + id + '/likes');
    likeRef.once("value").then((snapshot) => {
      // set like
      likeRef.set(snapshot.val() + 1);
    });
  }

  // update like - 1
  decreaseLike(callback, id) {
    
    let likeRef = firebase.database().ref(this._path + '/' + id + '/likes');
    likeRef.once("value").then((snapshot) => {
      // set like
      likeRef.set(snapshot.val() - 1);
    });
  }
}


// Post class, we can obtain a post object from the class
export class Post {

  description = "";
  item = "";
  likes = 0;
  location = "Earth";
  replies = [];
  title = "Untitled";

  constructor(post){
    this.description = post["description"];
    this.item = post["item"];
    this.likes = post["likes"];
    this.location = post["location"];
    this.title = post["title"];
    // for replies, we need an array of comment
    this.replies.push(post["replies"]["0"]);
    this.replies.push(post["replies"]["1"]);
    this.replies.push(post["replies"]["2"]);
  }

  toObject() {
    return {
      description: this.description,
      item: this.item,
      likes: this.likes,
      location: this.location,
      replies: this.replies,
      title: this.title,
    }
  }
}


export default communityModel = {
  CommunityModelManage: CommunityModelManage
}