import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyIcon from '../components/MyIcon';

const ShareScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');

  const baseURL = 'http://www.kursadozdemir.com';

  const handleShare = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/Share`, {
        token,
        description,
      });

      if (response.data.DURUM) {
        console.log("Share successful");
        navigation.navigate('HomeScreen', { refresh: true })
        setDescription(''); // Clear the input field
      } else {
        console.log('Share request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ padding: 20, fontSize: 18, color: "black" }}>Create a Post</Text>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <Image source={require("../assets/user.jpg")} style={styles.userImage} />
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "black"
            }}>Anyone</Text>
            <MyIcon name="caret-down-outline" size={18} color="black" />
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <TouchableOpacity
            onPress={handleShare}
            style={styles.shareButton}>
            <Text style={{ color: 'white' }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Write your post..."
        style={styles.input}
      />
      <View style={styles.footerView}>
        <MyIcon name="image-outline" size={25} color={`black`} />
        <MyIcon name="videocam-outline" size={25} color={`black`} />
        <MyIcon name="calendar-outline" size={25} color={`black`} />
        <MyIcon name="document-outline" size={25} color={`black`} />
        <View style={{ width: "40%", alignItems: "flex-end" }}>
          <MyIcon name="ellipsis-horizontal" size={25} color={`black`} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    width: "90%",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  userImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  input: {
    width: '90%',
    // borderWidth: 1,
    // borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  shareButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  footerView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default ShareScreen;
