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

  // get comments
  getComments(callback, id) {
    let communityRef = firebase.database().ref(this._path + '/' + id + '/replies');
    communityRef.once("value").then((snapshot) => {

      let posts = [];
      // for each post, get object and put to array of posts
      objectlist = snapshot.val();
      for (let i = 0; i < objectlist.length; i++) {
        posts.push(objectlist[i.toString()]);
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

  // made comment, update replies
  makeComment(callback, id, myComment) {
    let commRef = firebase.database().ref(this._path + '/' + id + '/replies/3');
    commRef.once("value").then((snapshot) => {
      // set commented
      commRef.set(myComment);
      callback(myComment);
    });
  }

  // set a community post
  setPost(callback, postModel, length) {

    const newIndex = (length + 1).toString();
    let postRef = firebase.database().ref(this._path + '/' + newIndex);
    postRef.once("value").then((snapshot) => {
      // set details
      postRef.set({
        description: postModel.description,
        item: postModel.item,
        likes: 1,
        location: postModel.location,
        replies: [
          "The artefact has been successfully added to our community!", 
          "Feel free to comment on the artefact.", 
          "Make sure your comment is meaningful and friendly ^_^"],
        title: postModel.title,
      });
    });
    callback(newIndex);
  }
}


// Post class, we can obtain a post object from the class
export class Post {

  description = "";
  item = "";
  likes = 1;
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
    if (post["replies"].length === 4) {
      this.replies.push(post["replies"]["3"]);
    }
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


export default CommunityModelManage;