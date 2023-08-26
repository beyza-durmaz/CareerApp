import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ConnectionScreen = () => {
  const [userList, setUserList] = useState('');

  const baseURL = 'http://www.kursadozdemir.com';

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${baseURL}/User/GetAllUser`, {
          token
        });

        if (response.data.DURUM) {
          console.log("Successfull", response.data.NESNE);
          const data = response.data.NESNE;
          setUserList(data)
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUserList()
  }, []);
  
  return (
    <SafeAreaView>
      <View>
        <Text>GetAllUser</Text>
        <FlatList
          data={userList}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.display_name}</Text>
              <Text>{item.job_title}</Text>
              <Text>{item.email}</Text>
              <Text>{item.follow_status === 1 ? 'Takip Ediliyor' : 'Takip Edilmiyor'}</Text>
            </View>
          )} />
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
// })

export default ConnectionScreen;
