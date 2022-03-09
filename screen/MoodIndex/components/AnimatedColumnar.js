import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

// The height corresponding to 100 points
const maxColumnarHeight = 286;

export default function AnimatedColumnar({
  data,
  isActive,
  isToday,
  handleClick,
  index,
}) {
  const columnarOpacity = useRef(new Animated.Value(0)).current;
  const weekdayOpacity = useRef(new Animated.Value(0)).current;
  const weekDayScale = useRef(new Animated.Value(0)).current;
  const columnarHeight = useRef(new Animated.Value(48)).current;
  const faceScale = useRef(new Animated.Value(0)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;
  const expanderHeight = useRef(new Animated.Value(4)).current;

  const fadeInColumnar = Animated.timing(columnarOpacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  });

  // Calculate the height corresponding to the current score according to the scale
  const scoreHeight = data.score
    ? Math.ceil(maxColumnarHeight * (data.score / 100))
    : 87;

  const growColumnar = Animated.timing(columnarHeight, {
    toValue: scoreHeight,
    duration: 800,
    useNativeDriver: false,
  });
  const zoomFaceScale = Animated.timing(faceScale, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
  const fakeInScore = Animated.timing(scoreOpacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
  const fadeInWeekday = Animated.timing(weekdayOpacity, {
    toValue: 1,
    duration: isToday ? 0 : 800,
    useNativeDriver: true,
  });
  const zoomWeekDay = Animated.timing(weekDayScale, {
    toValue: 1,
    duration: isToday ? 500 : 0,
    useNativeDriver: true,
  });
  const columnarAnimated = Animated.sequence([
    fadeInColumnar,
    Animated.parallel([
      zoomFaceScale,
      Animated.stagger(400, [growColumnar, fakeInScore]),
    ]),
  ]);
  const weekDayAnimated = Animated.parallel([fadeInWeekday, zoomWeekDay]);
  const allAnimated = Animated.sequence([
    Animated.delay(index * 100),
    Animated.stagger(300, [columnarAnimated, weekDayAnimated]),
  ]);

  useEffect(() => {
    allAnimated.start();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClick(data.weekday);
      }}
    >
      <View style={styles.item}>
        <Animated.View
          style={[
            styles.columnar,
            isActive ? styles.columnarActive : null,
            {
              paddingTop: isActive ? 0 : 2,
              paddingBotton: isActive ? 0 : 2,
              opacity: columnarOpacity,
              height: columnarHeight,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.columnarBg,
              isActive ? styles.columnarBgActive : null,
              {
                height: isActive
                  ? columnarHeight
                  : Animated.subtract(columnarHeight, expanderHeight),
              },
            ]}
          >
            <LinearGradient
              style={{ flex: 1 }}
              colors={data.bgColor[isActive ? "active" : "default"]}
              locations={[0.35, 1]}
            ></LinearGradient>
          </Animated.View>
          <Animated.Text
            style={[
              styles.scoreText,
              isActive ? styles.scoreTextActive : null,
              { opacity: scoreOpacity },
            ]}
          >
            {data.score}
          </Animated.Text>
          <Animated.Image
            source={data.faceIcon[isActive ? "active" : "default"]}
            resizeMode="contain"
            style={[
              styles.faceIcon,
              {
                transform: [{ scale: faceScale }],
              },
            ]}
          ></Animated.Image>
        </Animated.View>
        <Animated.View
          style={[
            styles.weekday,
            isActive && !isToday ? styles.weekdayActive : null,
            isToday ? styles.weekdayToday : null,
            {
              transform: [{ scale: weekDayScale }],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.weekdayText,
              {
                opacity: weekdayOpacity,
                color: !isToday
                  ? data.textColor[isActive ? "active" : "default"]
                  : "#FFFFFF",
              },
            ]}
          >
            {data.weekday}
          </Animated.Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
  },
  columnar: {
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
    position: "relative",
    overflow: "visible",
  },
  columnarBg: {
    width: 44,
    position: "absolute",
    bottom: 0,
    borderRadius: 22,
    overflow: "hidden",
  },
  columnarActive: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 1,
  },
  columnarBgActive: {
    width: 48,
    borderRadius: 24,
    bottom: -1,
  },
  scoreText: {
    fontFamily: "Nunito Bold",
    fontWeight: "700",
    top: 12,
    fontSize: 20,
    lineHeight: 27,
    color: "#FFFFFF",
    position: "absolute",
  },
  faceIcon: {
    position: "absolute",
    width: 36,
    height: 36,
    bottom: 4,
  },
  weekday: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 9,
    backgroundColor: "#FFFFFF",
  },
  weekdayActive: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 1,
  },
  weekdayToday: {
    backgroundColor: "#2D2F33",
  },
  weekdayText: {
    color: "#2D2F33",
    fontFamily: "PingFang HK",
    fontWeight: "500",
    fontSize: 18,
  },
});

AnimatedColumnar.propTypes = {
  data: PropTypes.shape({
    weekday: PropTypes.string.isRequired,
    bgColor: PropTypes.object.isRequired,
    faceIcon: PropTypes.object.isRequired,
    textColor: PropTypes.object.isRequired,
    score: PropTypes.any,
  }),
  isActive: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
