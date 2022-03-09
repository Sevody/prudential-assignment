import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AnimatedColumnar from "./AnimatedColumnar";


export default function MoodChart({ data }) {
  const [activeIndex, setActiveIndex] = useState();

  // Formatting the data AnimatedColumnar component needed for rendering
  const formatData = useMemo(() => {
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const today = new Date().getDay();
    const dayList = [
      ...weekdays.slice(today + 1),
      ...weekdays.slice(0, today + 1),
    ];
    const result = [];
    for (let i = 0; i < dayList.length; i++) {
      const score = data[i];
      let faceIcon;
      let bgColor;
      let textColor;
      if (typeof score !== "number") {
        faceIcon = {
          default: require("../../../assets/icon/questionMark.png"),
          active: require("../../../assets/icon/questionMark.png"),
        };
        bgColor = {
          default: ["#CFCFCF", "#CFCFCF"],
          active: ["#CFCFCF", "#CFCFCF"],
        };
        textColor = {
          default: "#2D2F33",
          active: "#2D2F33",
        };
      } else if (score >= 90) {
        faceIcon = {
          default: require("../../../assets/icon/goodMood.png"),
          active: require("../../../assets/icon/goodMoodActive.png"),
        };
        bgColor = {
          default: ["#FF823C", "#FF823C"],
          active: ["#FFA14A", "#FFCC4A"],
        };
        textColor = {
          default: "#2D2F33",
          active: "#F36A1B",
        };
      } else {
        faceIcon = {
          default: require("../../../assets/icon/normalMood.png"),
          active: require("../../../assets/icon/normalMoodActive.png"),
        };
        bgColor = {
          default: ["#52C873", "#52C873"],
          active: ["#42F373", "#A1FD44"],
        };
        textColor = {
          default: "#2D2F33",
          active: "#52C873",
        };
      }
      
      result.push({
        score,
        weekday: dayList[i],
        faceIcon,
        bgColor,
        textColor,
      });
    }
    return result;
  }, [data]);

  const handleClick = (weekday) => {
    setActiveIndex(weekday);
  };

  const renderChart = () => {
    return formatData.map((item, index) => {
      const isActive = activeIndex === item.weekday;
      const isToday = index === formatData.length - 1;
      return (
        <AnimatedColumnar
          data={item}
          isActive={isActive}
          isToday={isToday}
          key={item.weekday}
          handleClick={handleClick}
          index={index}
        ></AnimatedColumnar>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroud}>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.chart}>{renderChart()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: -159,
    paddingLeft: 12,
    paddingRight: 12,
    shadowOffset: {
      width: 0,
      height: -25,
    },
    shadowRadius: 5,
    shadowColor: "#FFFFFF",
    shadowOpacity: 1,
    position: "relative",
  },
  backgroud: {
    height: 148,
    justifyContent: "space-between",
  },
  line: {
    width: "100%",
    height: 2,
    borderRadius: 16,
    backgroundColor: "#F2F2F2",
  },
  chart: {
    width: "100%",
    height: 327,
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
  },
});

MoodChart.propTypes = {
  data: PropTypes.array.isRequired,
};
