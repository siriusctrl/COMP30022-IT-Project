import React, { Component } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Icon } from 'native-base';
import colors from "../config/colors";

import BadgeCBL from "../assets/icons/Badges/badgeCommBLocked";
import BadgeCBN from "../assets/icons/Badges/badgeCommBNormal";
import BadgeCGL from "../assets/icons/Badges/badgeCommGLocked";
import BadgeCGN from "../assets/icons/Badges/badgeCommGNormal";
import BadgeCSL from "../assets/icons/Badges/badgeCommSLocked";
import BadgeCSN from "../assets/icons/Badges/badgeCommSNormal";

import BadgeFBL from "../assets/icons/Badges/badgeFamilyBLocked";
import BadgeFBN from "../assets/icons/Badges/badgeFamilyBNormal";
import BadgeFGL from "../assets/icons/Badges/badgeFamilyGLocked";
import BadgeFGN from "../assets/icons/Badges/badgeFamilyGNormal";
import BadgeFSL from "../assets/icons/Badges/badgeFamilySLocked";
import BadgeFSN from "../assets/icons/Badges/badgeFamilySNormal";

import BadgeHBL from "../assets/icons/Badges/badgeHelloBLocked";
import BadgeHBN from "../assets/icons/Badges/badgeHelloBNormal";
import BadgeHGL from "../assets/icons/Badges/badgeHelloGLocked";
import BadgeHGN from "../assets/icons/Badges/badgeHelloGNormal";
import BadgeHSL from "../assets/icons/Badges/badgeHelloSLocked";
import BadgeHSN from "../assets/icons/Badges/badgeHelloSNormal";

import Empty from "../components/Empty";
import { LinearGradient } from 'expo-linear-gradient';

export default class AchievementScreen extends Component {

  static navigationOptions = {
    title: 'Achievements',
    headerStyle: {
      backgroundColor: '#8DC3FA',
      elevation: 0,
    },

    headerTitleStyle: {
      fontWeight: 'bold',
      marginLeft: 63,
      flex: 1,
    },
    headerTintColor: '#FFFFFF',

  }

  state = {
    hello: [1, 1, 1],
    community: [1, 1, 0],
    family: [0, 0, 0],
  }

  render() {

    let helloCompleted = this.state.hello.reduce((a, b) => a + b, 0);
    let communityCompleted = this.state.community.reduce((a, b) => a + b, 0);
    let familyCompleted = this.state.family.reduce((a, b) => a + b, 0);
    let completed = helloCompleted + communityCompleted + familyCompleted;

    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#8DC3FA', colors.LIGHTBLUE]} 
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 600,
          }}
        />
        <Empty></Empty>
        <View style={styles.rectangleShapeView}>
          <View style={{flexDirection: "row", padding: 10,}}>
            <Text style={styles.achievementText}>Hello Famory</Text>
            <Text style={styles.achievementTextCompleted}>
              {(helloCompleted === 3) ? (
                <Text style={{color: '#51AADD'}}>0{helloCompleted}</Text>
              ) : (
                <Text style={{color: '#DD5751'}}>0{helloCompleted}</Text>
              )}
              {" "}/{" "}03
            </Text>
          </View>
          <View style={{flexDirection: "row", padding: 10,}}>
            {(this.state.hello[0] === 0) ? (
              <BadgeHBL style={styles.badge}></BadgeHBL>
            ) : (
              <BadgeHBN style={styles.badge}></BadgeHBN>
            )}
            {(this.state.hello[1] === 0) ? (
              <BadgeHSL style={styles.badge}></BadgeHSL>
            ) : (
              <BadgeHSN style={styles.badge}></BadgeHSN>
            )}
            {(this.state.hello[2] === 0) ? (
              <BadgeHGL style={styles.badge}></BadgeHGL>
            ) : (
              <BadgeHGN style={styles.badge}></BadgeHGN>
            )}
          </View>

          <View style={{flexDirection: "row", padding: 10,}}>
            <Text style={styles.achievementText}>Community Elite</Text>
            <Text style={styles.achievementTextCompleted}>
              {(communityCompleted === 3) ? (
                <Text style={{color: '#51AADD'}}>0{communityCompleted}</Text>
              ) : (
                <Text style={{color: '#DD5751'}}>0{communityCompleted}</Text>
              )}
              {" "}/{" "}03
            </Text>
          </View>
          <View style={{flexDirection: "row", padding: 10,}}>
            {(this.state.community[0] === 0) ? (
              <BadgeCBL style={styles.badge}></BadgeCBL>
            ) : (
              <BadgeCBN style={styles.badge}></BadgeCBN>
            )}
            {(this.state.community[1] === 0) ? (
              <BadgeCSL style={styles.badge}></BadgeCSL>
            ) : (
              <BadgeCSN style={styles.badge}></BadgeCSN>
            )}
            {(this.state.community[2] === 0) ? (
              <BadgeCGL style={styles.badge}></BadgeCGL>
            ) : (
              <BadgeCGN style={styles.badge}></BadgeCGN>
            )}
          </View>

          <View style={{flexDirection: "row", padding: 10,}}>
            <Text style={styles.achievementText}>Treasury Family</Text>
            <Text style={styles.achievementTextCompleted}>
              {(familyCompleted === 3) ? (
                <Text style={{color: '#51AADD'}}>0{familyCompleted}</Text>
              ) : (
                <Text style={{color: '#DD5751'}}>0{familyCompleted}</Text>
              )}
              {" "}/{" "}03
            </Text>
          </View>
          <View style={{flexDirection: "row", padding: 10,}}>
            {(this.state.family[0] === 0) ? (
              <BadgeFBL style={styles.badge}></BadgeFBL>
            ) : (
              <BadgeFBN style={styles.badge}></BadgeFBN>
            )}
            {(this.state.family[1] === 0) ? (
              <BadgeFSL style={styles.badge}></BadgeFSL>
            ) : (
              <BadgeFSN style={styles.badge}></BadgeFSN>
            )}
            {(this.state.family[2] === 0) ? (
              <BadgeFGL style={styles.badge}></BadgeFGL>
            ) : (
              <BadgeFGN style={styles.badge}></BadgeFGN>
            )}
          </View>
        </View>

        <Empty></Empty>
        <Text style={styles.totalCount}>
          Total:{" "}
          {(completed === 9) ? (
            <Text style={{color: '#51AADD'}}>0{completed}</Text>
          ) : (
            <Text style={{color: '#DD5751'}}>0{completed}</Text>
          )}
          {" "}/{" "}09
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHTBLUE,
    flex: 1,
  },
  rectangleShapeView: {
    width: "95%",
    marginLeft: 9,
    marginTop: 10,
    height: 470,
    borderColor: "#C9C7C7",
    borderRadius: 17,
    elevation: 2,
    backgroundColor: "#fff",
  },
  achievementText: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
  },
  badge: {
    marginLeft: 12,
    marginRight: 15,
  },
  achievementTextCompleted: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 120,
  }, 
  totalCount: {
    textAlign: "right",
    marginRight: 20,
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  }
});