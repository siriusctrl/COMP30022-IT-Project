import React, { Component } from 'react';
import {StyleSheet, Image, Alert, View, Text, TextInput, Button} from 'react-native';
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch, Separator } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

import firebase from "firebase";
import firebaseContainer from "../controller/firebaseConfig";

export default class TestScreen extends Component{
  static navigationOptions = {
    header: null
  };

  state = {
    image: "https://firebasestorage.googleapis.com/v0/b/fir-one-28de9.appspot.com/o/post-3.jpg?alt=media&token=76e4cd81-d3ba-46ea-9346-890659cf7714",
    video: null,
    uploading: false,
  };

  uploadImage = () => {

  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
    });

    firebaseContainer.getInstance().justStart();
    this._handleImagePicked(result);
  };

  _handleImagePicked = async result => {
    try {
      this.setState({ uploading: true });

      if (!result.cancelled) {
        uploadUrl = await uploadVideoAsync(result.uri);
        alert(uploadUrl);
        this.setState({ video: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };


  render() {
    return (
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>
        <View style={{alignItems: "center", }}>
          <Image source={{uri: this.state.image}}  style={styles.avatar} />
          <Text style={{fontSize: 30, color: '#347ED3'}} onPress={this._pickImage}>
            Upload Photo From Local
          </Text>
          {(this.state.video === null) ? (
            <Text style={{fontSize: 30, color: '#347ED3'}} onPress={this._pickVideo}>
            Upload Video From Local
          </Text>
          ) : (
            <Video
              source={{ uri: this.state.video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="Video.RESIZE_MODE_CONTAIN"
              useNativeControls={true}
              isLooping={true}
              style={{ width: 350, height: 350 }}
            />
          )}
        </View>
      </View>
    );
  }
};

async function uploadVideoAsync(uri) {

  const blob = await new Promise((resolve, reject) => {
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
  });

  const ref = firebase
    .storage()
    .ref()
    .child('caixukun');
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
})