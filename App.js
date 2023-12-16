import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Header from "./components/Header";
import Login from "./src/Login";
import Register from "./src/Register";
import Dashboard from "./src/Dashboard";

import { firebase } from "./config";

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <Text>Cargando...</Text>;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header title="Login" />,
            headerStyle: styles.header,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <Header title="Registro" />,
            headerStyle: styles.header,
            headerLeft: (props) => (
              <AntDesign
                style={{ marginLeft: 16 }}
                name="back"
                size={24}
                color="white"
                {...props}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header title="Agrovid" />,
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#3E4424",
    shadowColor: "#000",
    elevation: 25,
  },
});
