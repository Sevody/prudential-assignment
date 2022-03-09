import { View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="进入历史心情指数"
        onPress={() => navigation.navigate("MoodIndex")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};
