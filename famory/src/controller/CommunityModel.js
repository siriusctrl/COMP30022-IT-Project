import * as firebase from "firebase";

export class CommunityModelManage{

  static _managePart = null
  _path = "Post"

  // get instance of community model manager
  static getInstance(){
    if(this._managePart == null){
      this._managePart = new CommunityModelManage();
    }
    return this._managePart;
  }

  // cb is the callback when getting the data
  getCommunity(cb){

    let communityRef = firebase.database().ref(this._path);
    communityRef.once("value").then((snapshot) => {

      let posts = [];
      // for each post, get object and put to array of posts
      objectlist = snapshot.val();
      for (let i = 1; i < objectlist.length; i++) {
        posts.push(new Post(objectlist[i.toString()]));
      }

      cb(posts);
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
    // for replies, we need an array of json format
    let id = 0;
    for (let reply in post["replies"]) {
      this.replies.push({
        id: id, 
        text: reply[id],
      });
      id += 1;
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


export default communityModel = {
  CommunityModelManage: CommunityModelManage
}