import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Header from "./components/Header";
import Dashboard from "./src/Dashboard";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header title="Agrovid - JardineroConecta" />,
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
