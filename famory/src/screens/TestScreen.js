import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import AlertPro from "react-native-alert-pro";

export default class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>REACT NATIVE ALERT PRO</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.AlertPro.open()}
            style={styles.button}
          >
            <Text style={styles.text}>CUSTOM</Text>
          </TouchableOpacity>
        </View>

        <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          onCancel={() => this.AlertPro.close()}
          showConfirm={false}
          title="Working Test"
          message="Is this working?"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    marginTop: 120
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginBottom: 15
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});