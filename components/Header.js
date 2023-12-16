import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";

const Header = ({ title }) => {
  const user = firebase.auth().currentUser;
  const [fullName, setFullName] = useState("");

  async function logout() {
    await firebase.auth().signOut();
  }

  function getFullName() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        setFullName(doc.data().fullName);
      });
  }

  useEffect(() => {
    if (user) {
      getFullName();
    }
  }, [user]);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {user && <View style={{ width: 50 }} />}
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
        {user ? `Bienvenido ${fullName}` : title}
      </Text>
      {user && (
        <TouchableOpacity onPress={() => logout()}>
          <View style={{ width: 50 }}>
            <AntDesign name="logout" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;
