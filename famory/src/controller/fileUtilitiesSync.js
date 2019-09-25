import firebase from "firebase";
import firebaseContainer from "./firebaseConfig";
import * as ImagePicker from 'expo-image-picker';


// picks image from local file system
// we do not upload here because user need to 'confirm' to upload artefact
export const _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
  });

  return result;
};

// picks video from local file system
export const _pickVideo = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
  });

  return result;
};

export const _uploadItem = (result, callback) => {
  firebaseContainer.getInstance().justStart();
  _handleItemPicked(result, callback);
}

// handle item picked
export const _handleItemPicked = (result, callback) => {
  try {
    if (!result.cancelled) {
      // upload item to firebase
      _uploadToFirebase(result.uri, callback);
    }
  } catch (e) {
    console.log(e);
    alert('Upload failed, sorry :(');
  } finally {
    // all good
  }
};

// upload item to firebase storage
export const _uploadToFirebase = (uri, callback) => {

  (new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  })).then(
    (blob) => {
      // randomly generate a suffix for artefact using crypto
      var rdmString = "";
      for( ;rdmString.length < 11; rdmString  += Math.random().toString(36).substr(2));
      const ref = firebase
        .storage()
        .ref()
        .child('artefact_' + rdmString.substr(0, 11));
      ref.put(blob).then(
        (snapshot) => {
          blob.close();
          snapshot.ref.getDownloadURL().then(
            (uri) => callback(uri)
          );
        }
      )
    }
  )
}