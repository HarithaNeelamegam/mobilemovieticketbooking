import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment/moment";
import QRCode from "react-native-qrcode-svg";
const TicketScreen = ({}) => {
  const route = useRoute();
  const { ticketData } = route.params;
  const { userData } = route.params;
  const formattedDate = moment(ticketData.selectedDate);
  const newFormat = formattedDate.format("DD/MM/YYYY");
  const navigation = useNavigation();
  const data=JSON.stringify(ticketData);

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ marginTop: 5 }}
        name="arrow-back"
        size={24}
        color="black"
      />
      <View style={{ padding: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            {userData.Name}
          </Text>
        </View>

        <Text>Time: {ticketData.selectedTime}</Text>
        <Text
          style={{
            borderWidth: 0.5,
            borderColor: "black",
            height: 1,
            margin: 10,
          }}
        />
        <View style={{ flexdirection:"row", justifyContent: "space-between"  }}>
          <Text>Date:{newFormat}</Text>
          <Text>Tickets:{ticketData.selectedSeats.length}</Text>
          </View>
          <Text>Seats: {ticketData.selectedSeats.join(",")}</Text>
          <Image
            source={{ uri: userData.Image }}
            style={{ height: 100, width: 100, borderRadius: 3 }}
          />
          <Text
          style={{
            borderWidth: 0.5,
            borderColor: "black",
            height: 1,
            margin: 10,
          }}
        />
        <View style={{justifyContent:"center",alignItems:"center"}}>
      <QRCode value={data} size={100} />
</View>
</View>
      </View>
    
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "90%",
    margin: 10,
    marginTop: 30,
    borderRadius: 10,
  },
});

export default TicketScreen;
