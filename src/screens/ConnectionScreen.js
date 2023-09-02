import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MyIcon from '../components/MyIcon';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConnectionScreen = () => {
  const [userList, setUserList] = useState([]);

  const baseURL = 'http://www.kursadozdemir.com';

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${baseURL}/User/GetAllUser`, {
          token
        });

        if (response.data.DURUM) {
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

  const handleFollow = async (userId) => {
    console.log("User Id: ", userId);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/User/Follow`, {
        token,
        follow_user_id: userId,
      });
      
      if (response.data.DURUM) {
        await AsyncStorage.setItem('followingUsers', JSON.stringify(userId));
        const updatedUserList = userList.map((user) =>
          user.user_id === userId ? { ...user, follow_status: 1 } : user
        );
        console.log("updated user list", updatedUserList);
        setUserList(updatedUserList);
      } else {
        console.log('Follow API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleUnFollow = async (userId) => {
    console.log("User Id: ", userId);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/User/UnFollow`, {
        token,
        follow_user_id: userId,
      });

      if (response.data.DURUM) {
        const updatedUserList = userList.map((user) =>
          user.user_id === userId ? { ...user, follow_status: 0 } : user
        );
        console.log("updated user list", updatedUserList);
        setUserList(updatedUserList);
      } else {
        console.log('Follow API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, padding: 10 }}>
          <Text style={{ paddingVertical: 10, fontSize: 25, fontWeight: "bold", color: "#283C8D" }}>Connection</Text>
          <MyIcon name="search" size={25} color="#283C8D" />
        </View>
        <View style={{ paddingBottom: 100 }}>
          <FlatList
            data={userList}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <View style={{ width: "50%", flexDirection: "row" }}>
                  <Image source={require("../assets/user.jpg")} style={styles.userImage} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.displayName}>{item.display_name}</Text>
                    <Text style={styles.jobTitle}>{item.job_title}</Text>
                    {/* <Text style={styles.followStatus}>
                    {item.follow_status === 1 ? 'Takip Ediliyor' : 'Takip Edilmiyor'}
                  </Text> */}
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  {
                    item.follow_status === 1 ? (
                      <TouchableOpacity
                        onPress={() => handleUnFollow(item.user_id)}
                        style={[styles.button, styles.unfollowButton]}>
                        <Text style={[styles.buttonText, styles.unfollowBtnText]}>Following</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleFollow(item.user_id)}
                        style={[styles.button, styles.followButton]}>
                        <Text style={styles.buttonText}>Follow</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
              </View>
            )} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  userContainer: {
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
  },
  userImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black"
  },
  jobTitle: {
    fontSize: 14,
    color: '#999',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  followStatus: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  buttonContainer: {
    width: "50%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 90,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  followButton: {
    backgroundColor: '#283C8D',
  },
  unfollowButton: {
    backgroundColor: '#eee',
  },
  buttonText: {
    color: 'white',
    fontWeight: "bold"
  },
  unfollowBtnText: {
    color: "black",
    // fontWeight: "normal"
  },
});

export default ConnectionScreen;
