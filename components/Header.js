import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
        {title}
      </Text>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: "",
};

export default Header;
