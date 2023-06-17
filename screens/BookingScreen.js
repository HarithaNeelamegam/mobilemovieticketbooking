import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import timeData from "../data/timeData";

const BookingScreen = () => {
  const [dates, setDates] = useState([]);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const Time = timeData;
  const route = useRoute();
  const { userData } = route.params;
  const handleBookNow = () => {
    const ticketData = {
      selectedDate: selectedDate.toDateString(),
      selectedTime,
      selectedSeats,
    };

    navigation.navigate("Ticket", { ticketData, userData });
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  const handleSelectTime = (showTimes) => {
    setSelectedTime(showTimes);
  };

  const handleSeatSelection = (tableData) => {
    setSelectedSeats((prevSelectedSeats) => {
      console.log("previous", prevSelectedSeats);
      const seatIndex = prevSelectedSeats.indexOf(tableData);
      if (seatIndex !== -1) {
        const updatedSelectedSeats = [...prevSelectedSeats];
        updatedSelectedSeats.splice(seatIndex, 1);

        return updatedSelectedSeats;
      } else {
        const updatedSelectedSeats = [...prevSelectedSeats, tableData];
        return updatedSelectedSeats;
      }
    });
  };
  console.log("selectedSeats", selectedSeats);

  useEffect(() => {
    const currentDate = new Date();
    const tempDates = [];

    for (let i = 0; i <= 3; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      tempDates.push(date);
    }

    setDates(tempDates);
  }, []);
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back"
        size={24}
        color="black"
      />
      <Text>{userData.Name}</Text>
      <View style={{ height: 40 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {dates.map((date, index) => (
            <TouchableOpacity
              style={[date === selectedDate ? styles.selectedContainer : null]}
              onPress={() => handleSelectDate(date)}
              key={index}
            >
              <View key={index} style={styles.dateContainer}>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {Time.map(({ id, showTimes, tableData }) => (
        <View>
          {showTimes.map((time, index) => (
            <TouchableOpacity
              style={[time === selectedTime ? styles.selectedContainer : null]}
              onPress={() => handleSelectTime(time)}
              key={index}
            >
              <View key={index} style={styles.dateContainer}>
                <Text style={styles.dateText}>{time}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <FlatList
            numColumns={7}
            data={tableData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.seat,
                  selectedSeats.includes(item) ? styles.selectedSeat : null,
                  selectedSeats.includes(item) ? styles.disabledSeat : null,
                ]}
                onPress={() => handleSeatSelection(item)}
                disabled={selectedSeats.includes(item)}
              >
                <View
                  style={{
                    margin: 10,
                    borderWidth: 0.5,
                    borderColor: "gray",
                    borderRadius: 4,
                    padding: 6,
                  }}
                >
                  <Text style={{}}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
      <TouchableOpacity
        onPress={handleBookNow}
        style={{ alignItems: "center" }}
      >
        <Text
          style={{
            color: "white",
            backgroundColor: "blue",
            borderRadius: 5,
            paddingVertical: 5,
            width: "25%",
            textAlign: "center",
          }}
        >
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  scroll: {
    height: 30,
  },
  dateContainer: {
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedContainer: {
    backgroundColor: "#316cf5",
    height: 30,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seat: {
    width: 50,
    height: 50,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: "blue",
  },
  disabledSeat: {
    opacity: 0.5,
    backgroundColor: "blue",
  },
});

export default BookingScreen;
