import React from "react";
import { WebView } from "react-native-webview";

const Dashboard = () => {
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: "https://agrovid.cl/" }}
      startInLoadingState={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default Dashboard;
