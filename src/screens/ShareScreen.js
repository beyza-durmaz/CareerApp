import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text>Share a Post</Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Write your post..."
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleShare}
        style={styles.shareButton}>
        <Text style={{ color: 'white' }}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  shareButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default ShareScreen;
