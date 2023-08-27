import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({route}) => {
  const [shareList, setShareList] = useState([]);

  const baseURL = 'http://www.kursadozdemir.com';

  useEffect(() => {
    const fetchShareList = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${baseURL}/Share/GetTimeline`, {
          token,
        });
        if (response.data.DURUM) {
          console.log("Response Data Nesne: ", response.data.NESNE);
          const data = response.data.NESNE;
          setShareList(data);
        } else {
          console.log('API request failed');
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchShareList();

    // Refresh share list if route.params.refresh is true (after sharing)
    if (route.params?.refresh) {
      fetchShareList();
    }
  }, [route.params?.refresh]);

  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <FlatList
          data={shareList}
          keyExtractor={(item) => item.share_id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.user_display_name}</Text>
              <Text>{item.user_job_title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.like_count}</Text>
              <Text>{item.like_status}</Text>
              <Text>{item.comment}</Text>
            </View>
          )} />
      </View>
    </SafeAreaView>
  );
};


export default HomeScreen;
