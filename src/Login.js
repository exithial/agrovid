import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { validateEmail } from "../functions";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser() {
    try {
      if (email === "" || password === "") {
        Alert.alert("Debe llenar todos los campos");
      } else if (!validateEmail(email)) {
        Alert.alert("Email con formato inválido");
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Registro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, alignItems: "center" },
  textInput: {
    padding: 10,
    width: "100%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#3E4424",
    padding: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  registerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E4424",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Login;
