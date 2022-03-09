import { StyleSheet, View } from "react-native";
import MoodCard from "./components/MoodCard";
import MoodChart from "./components/MoodChart";

const fakeData = {
  avatar:
    "https://oss-public.fangdd.com/prod/static/FqXhYmI643S8dABTB_TqzzeFzbZK.png",
  name: "李强",
  moodList: [86, 80, null, 90, 92, 97, 81],
};

export default function MoodIndex() {
  const data = fakeData;
  return (
    <View style={styles.container}>
      <MoodCard data={data}></MoodCard>
      <MoodChart data={data.moodList}></MoodChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
