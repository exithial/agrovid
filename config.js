// Configuración de llave de firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Configuración WebApp firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6g_TyFdFB8zvUMU5r5jg-fVeZC6dmM_c",
  authDomain: "agrovid-fc435.firebaseapp.com",
  projectId: "agrovid-fc435",
  storageBucket: "agrovid-fc435.appspot.com",
  messagingSenderId: "149705864372",
  appId: "1:149705864372:web:f32584521c5261a02853e1",
  measurementId: "G-0MG5FXHWQX",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
