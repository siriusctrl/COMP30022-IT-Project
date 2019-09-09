import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
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

import BadgeHBNB from "../assets/icons/Badges/badgeHelloBNormalBig";
import BadgeHSNB from "../assets/icons/Badges/badgeHelloSNormalBig";
import BadgeHGNB from "../assets/icons/Badges/BadgeHelloGNormalBig";
import BadgeCBNB from "../assets/icons/Badges/badgeCommBNormalBig";
import BadgeCSNB from "../assets/icons/Badges/badgeCommSNormalBig";
import BadgeCGNB from "../assets/icons/Badges/badgeCommGNormalBig";
import BadgeFBNB from "../assets/icons/Badges/badgeFamilyBNormalBig";
import BadgeFSNB from "../assets/icons/Badges/badgeFamilySNormalBig";
import BadgeFGNB from "../assets/icons/Badges/badgeFamilyGNormalBig";

import Facebook from "../assets/icons/facebook";
import Twitter from "../assets/icons/twitter";
import AchievementBG from "../assets/icons/achievementBG";

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
    unlocked: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    isVisible: [false, false, false, false, false, false, false, false, false],
    unlockDate: [
      new Date(), 
      new Date(1993, 5, 7, 14, 39, 7),
      new Date(1811, 6, 28, 14, 39, 7),
      new Date(2018, 6, 28, 14, 39, 7),
      new Date(2012, 6, 22, 14, 39, 7),
      new Date(2012, 6, 22, 14, 39, 7),
      new Date(2002, 3, 8, 14, 39, 7),
      new Date(2012, 6, 22, 14, 39, 7),
      new Date(2012, 6, 22, 14, 39, 7),

    ],
  };

  toggleModal = (id) => {
    if (this.state.unlocked[id] === 1) {
      this.state.isVisible[id] = !this.state.isVisible[id];
      this.forceUpdate();
    }
  };

  sumCount = (i, j, k) => {
    let unlockedItem = this.state.unlocked;
    return unlockedItem[i] + unlockedItem[j] + unlockedItem[k];
  };

  getDateFormat = (id) => {
    let d = this.state.unlockDate[id];
    let format = d.toDateString().split(" ");
    return format[1] + " " + format[2] + ", " + format[3];
  }

  render() {
    let helloCompleted = this.sumCount(0, 1, 2);
    let communityCompleted = this.sumCount(3, 4, 5);
    let familyCompleted = this.sumCount(6, 7, 8);
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
            <TouchableOpacity onPress={() => this.toggleModal(0)}>
              {(this.state.unlocked[0] === 0) ? (
                <BadgeHBL style={styles.badge}></BadgeHBL>
              ) : (
                <BadgeHBN style={styles.badge}></BadgeHBN>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(1)}>
              {(this.state.unlocked[1] === 0) ? (
              <BadgeHSL style={styles.badge}></BadgeHSL>
              ) : (
              <BadgeHSN style={styles.badge}></BadgeHSN>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(2)}>
            {(this.state.unlocked[2] === 0) ? (
              <BadgeHGL style={styles.badge}></BadgeHGL>
            ) : (
              <BadgeHGN style={styles.badge}></BadgeHGN>
            )}
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => this.toggleModal(3)}>
            {(this.state.unlocked[3] === 0) ? (
              <BadgeCBL style={styles.badge}></BadgeCBL>
            ) : (
              <BadgeCBN style={styles.badge}></BadgeCBN>
            )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(4)}>
            {(this.state.unlocked[4] === 0) ? (
              <BadgeCSL style={styles.badge}></BadgeCSL>
            ) : (
              <BadgeCSN style={styles.badge}></BadgeCSN>
            )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(5)}>
            {(this.state.unlocked[5] === 0) ? (
              <BadgeCGL style={styles.badge}></BadgeCGL> 
            ) : (
              <BadgeCGN style={styles.badge}></BadgeCGN>
            )}
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => this.toggleModal(6)}>
            {(this.state.unlocked[6] === 0) ? (
              <BadgeFBL style={styles.badge}></BadgeFBL>
            ) : (
              <BadgeFBN style={styles.badge}></BadgeFBN>
            )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(7)}>
            {(this.state.unlocked[7] === 0) ? (
              <BadgeFSL style={styles.badge}></BadgeFSL>
            ) : (
              <BadgeFSN style={styles.badge}></BadgeFSN>
            )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal(8)}>
            {(this.state.unlocked[8] === 0) ? (
              <BadgeFGL style={styles.badge}></BadgeFGL>
            ) : (
              <BadgeFGN style={styles.badge}></BadgeFGN>
            )}
            </TouchableOpacity>
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

        <Modal
          isVisible={this.state.isVisible[0]}
          onBackdropPress={() => this.toggleModal(0)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeHBNB style={{marginTop: -75, marginLeft: -3}}></BadgeHBNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Explorer</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Added first family member</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(0)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[1]}
          onBackdropPress={() => this.toggleModal(1)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeHSNB style={{marginTop: -75, marginLeft: -3}}></BadgeHSNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Identity Confirmed</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Completed accont profile</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(1)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[2]}
          onBackdropPress={() => this.toggleModal(2)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeHGNB style={{marginTop: -75, marginLeft: -3}}></BadgeHGNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Official Resident</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Created 3 generations</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(2)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[3]}
          onBackdropPress={() => this.toggleModal(3)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeCBNB style={{marginTop: -75, marginLeft: -3}}></BadgeCBNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>First Step</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Uploaded first artefact to</Text>
            <Text style={{fontSize: 16}}>the Community</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(3)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[4]}
          onBackdropPress={() => this.toggleModal(4)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeCSNB style={{marginTop: -75, marginLeft: -3}}></BadgeCSNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Kudos Giver</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Liked 50 posts</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(4)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[5]}
          onBackdropPress={() => this.toggleModal(5)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeCGNB style={{marginTop: -75, marginLeft: -3}}></BadgeCGNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Elite Commentator</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Made 100 comments</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(5)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[6]}
          onBackdropPress={() => this.toggleModal(6)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeFBNB style={{marginTop: -75, marginLeft: -3}}></BadgeFBNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Register Beginner</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Uploaded first artefact to</Text>
            <Text style={{fontSize: 16, marginTop: 3}}>the Register</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(6)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[7]}
          onBackdropPress={() => this.toggleModal(7)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeFSNB style={{marginTop: -75, marginLeft: -3}}></BadgeFSNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Register Hunter</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Uploaded 50 artefacts to</Text>
            <Text style={{fontSize: 16, marginTop: 3}}>the Register</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(7)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isVisible[8]}
          onBackdropPress={() => this.toggleModal(8)}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          style={styles.modalStyle}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center", marginLeft: 3}}>
            <AchievementBG></AchievementBG>
            <BadgeFGNB style={{marginTop: -75, marginLeft: -3}}></BadgeFGNB>
          </View>
          <Empty></Empty>
          <Empty></Empty>
          <Empty></Empty>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold"}}>Register Master</Text>
            <Text style={{fontSize: 16, marginTop: 15}}>Upload 200 artefacts to</Text>
            <Text style={{fontSize: 16, marginTop: 3}}>the Register</Text>
            <Empty></Empty>
            <Empty></Empty>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>Unlocked on:{" "}{this.getDateFormat(8)}</Text>
          </View>
          <View style={styles.share}>
            <Text style={{fontSize: 12}}>Share on:{" "}</Text>
            <Facebook style={{marginLeft: 5}}></Facebook>
            <Twitter style={{marginLeft: 5}}></Twitter>
          </View>
        </Modal>

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
  },
  modalStyle: {
    borderRadius: 15, 
    justifyContent: "center",
    marginVertical: 140,
    marginHorizontal: 30,
    backgroundColor: colors.WHITE,
  },
  share: {
    flex:1, 
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection: "row", 
    marginLeft: 120,
    marginTop: 10,
  }
});