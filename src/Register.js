import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { firebase } from "../config";
import { validateEmail } from "../functions";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  async function RegisterUser() {
    try {
      if (email === "" || password === "" || fullName === "") {
        Alert.alert("Debe llenar todos los campos");
      } else if (!validateEmail(email)) {
        Alert.alert("Email con formato inválido");
      } else {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({ fullName, email }).then(()=>{
                Alert.alert("Registro completo, estás dentro!");
              });
          })
          .catch((error) => { 
            Alert.alert(error.message);
          });
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
        placeholder="Nombre completo"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
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
      <TouchableOpacity style={styles.button} onPress={() => RegisterUser()}>
        <Text style={styles.buttonText}>Registrar</Text>
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
});

export default Register;
