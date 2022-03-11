import React, { useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Text, Image, StyleSheet, View, Animated } from "react-native";
import { BoxShadow } from "react-native-shadow";

export default function MoodCard({ data }) {
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const fakeInCard = () => {
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fakeInCard();
  }, []);

  // Calculate and cache the average mood index
  const averageScore = useMemo(() => {
    // Need to filter the invalid mood index
    const availableData = data.moodList.filter((n) => typeof n === "number");
    return Math.ceil(
      availableData.reduce((sum, n) => sum + n, 0) / availableData.length
    );
  }, [data]);

  // cover the shadow of card
  const shadowOpt = {
    width: 380,
    height: 62,
    color: "#FFF",
    border: 20,
    radius: 3,
    opacity: 0.9,
    x: 0,
    y: 0,
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: cardOpacity,
        },
      ]}
    >
      <View style={styles.userInfo}>
        <Image
          source={{ uri: data.avatar }}
          style={styles.userAvatar}
          resizeMode="contain"
        />
        <Text style={styles.userName}>{data.name}</Text>
      </View>
      <View style={styles.averageScore}>
        <Text style={styles.averageScoreText}>{averageScore}</Text>
      </View>
      <BoxShadow setting={shadowOpt}>
        <View style={styles.title}>
          <Text style={styles.titleText}>周平均心情指数</Text>
        </View>
      </BoxShadow>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 43.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 399,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    elevation: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  userName: {
    fontWeight: "500",
    fontSize: 20,
    marginLeft: 12,
    fontFamily: "PingFang HK",
  },
  averageScore: {
    height: 98,
    justifyContent: "center",
    alignItems: "center",
  },
  averageScoreText: {
    fontWeight: "800",
    fontSize: 72,
    fontFamily: "Nunito Bold",
    color: "#2D2F33",
  },
  title: {
    width: "100%",
    alignItems: "center",
    height: 62,
  },
  titleText: {
    fontFamily: "PingFang HK",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.3,
    color: "#929292",
  },
});

MoodCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    moodList: PropTypes.array.isRequired,
  }),
};
