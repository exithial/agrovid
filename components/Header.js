import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";

const Header = ({ title }) => {
  const user = firebase.auth().currentUser;

  async function logout() {
    await firebase.auth().signOut();
  }

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
        {title}
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
