import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyIcon from '../components/MyIcon';


const HomeScreen = ({ route }) => {
  const [shareList, setShareList] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentInputVisibilityList, setCommentInputVisibilityList] = useState([]);


  const baseURL = 'http://www.kursadozdemir.com';

  useEffect(() => {

    fetchShareList();

    // Refresh share list if route.params.refresh is true (after sharing)
    if (route.params?.refresh) {
      fetchShareList();
    }
  }, [route.params?.refresh]);

  const fetchShareList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/GetTimeline`, {
        token,
      });
      if (response.data["DURUM"]) {
        console.log("Response Data: ", response.data);
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

  const handleUnLike = async (shareId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/Like`, {
        token,
        share_id: shareId,
      });

      if (response.data.DURUM) {
        const updatedShareList = shareList.map((item) =>
          item.share_id === shareId ?
            { ...item, like_status: 0, like_count: item.like_count - 1 } : item
        );
        console.log("updated share list", updatedShareList);
        setShareList(updatedShareList);
      } else {
        console.log('Follow API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleLike = async (shareId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/UnLike`, {
        token,
        share_id: shareId,
      });

      if (response.data.DURUM) {
        const updatedShareList = shareList.map((item) =>
          item.share_id === shareId ?
            { ...item, like_status: 1, like_count: item.like_count + 1 } : item
        );
        console.log("updated share list", updatedShareList);
        setShareList(updatedShareList);
      } else {
        console.log('Follow API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleSendComment = async (shareId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/SendComment`, {
        token,
        share_id: shareId,
        comment: commentText,
      });
      if (response.data.DURUM) {
        const updatedShareList = shareList.map((item) =>
          item.share_id === shareId
            ? { ...item, comments: [...item.comments, { comment: commentText, can_delete: 1 }] }
            : item
        );
        setShareList(updatedShareList);
        setCommentText('');
      } else {
        console.log('SendComment API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleDeleteComment = async (shareId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/DeleteComment`, {
        token,
        comment_id: commentId,
      });
      if (response.data.DURUM) {
        const updatedShareList = shareList.map((item) =>
          item.share_id === shareId
            ? { ...item, comments: item.comments.filter(comment => comment.comment_id !== commentId) }
            : item
        );
        setShareList(updatedShareList);
      } else {
        console.log('DeleteComment API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleDeleteShare = async (shareId) => {
    console.log("Deleting share with ID:", shareId);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${baseURL}/Share/DeleteShare`, {
        token,
        share_id: shareId,
      });
      if (response.data.DURUM) {
        const updatedShareList = shareList.filter(share => share.share_id !== shareId);
        console.log("updated share list", updatedShareList);
        setShareList(updatedShareList);
      } else {
        console.log('DeleteShare API request failed');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.iconbgc}>
            <MyIcon name="search" size={25} />
            <TextInput placeholder='Search' style={styles.searchInput} />
          </View>
          <View style={{ justifyContent: "center" }}>
            <MyIcon name="chatbubble-ellipses" size={25} />
          </View>
        </View>
        <FlatList
          data={shareList}
          keyExtractor={(item) => item.share_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shareContainer}>
              <View style={styles.postHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={require('../assets/user.jpg')} style={styles.userImage} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: "black", fontSize: 17 }}>{item.user_display_name}</Text>
                    <Text style={{ color: "#999", fontSize: 13 }}>{item.user_job_title}</Text>
                  </View>
                </View>
                <View>
                  <View key={item.share_id}>
                    {item.share_id !== item.share_id ? (
                      <MyIcon name="ellipsis-vertical" size={25} />
                    ) : (
                      <MyIcon name="close-outline" size={25} onPress={() => handleDeleteShare(item.share_id)} />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.postBody}>
                <Text style={{ color: "black" }}>{item.description}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
                <Text>Batuhan and {item.like_count} others</Text>
                <Text>Comments</Text>
              </View>
              <View style={styles.postFooter}>
                <View style={styles.footer}>
                  <View style={{ alignItems: "center" }}>
                    {
                      item.like_status === 1 ? (
                        <MyIcon name="heart" size={20} color="red"
                          onPress={() => handleUnLike(item.share_id)} />
                      ) : (
                        <MyIcon name="heart-outline" size={20} color="red"
                          onPress={() => handleLike(item.share_id)} />
                      )
                    }
                    <Text style={{ fontSize: 13 }}>
                      {item.like_status === 1 ? 'Unlike' : 'Like'}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <MyIcon name="chatbox-ellipses-outline" size={20}
                      onPress={() => {
                        const updatedVisibilityList = [...commentInputVisibilityList];
                        updatedVisibilityList[item.share_id] = !updatedVisibilityList[item.share_id];
                        setCommentInputVisibilityList(updatedVisibilityList);
                      }} />
                    <Text style={{ fontSize: 13 }}>Comment</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <MyIcon name="repeat-outline" size={20} />
                    <Text style={{ fontSize: 13 }}>Repost</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <MyIcon name="send" size={20} />
                    <Text style={{ fontSize: 13 }}>Send</Text>
                  </View>
                </View>
              </View>
              {
                commentInputVisibilityList[item.share_id] && (
                  <View>
                    <View style={styles.commentInputContainer}>
                      <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        value={commentText}
                        onChangeText={setCommentText}
                      />
                      <TouchableOpacity
                        onPress={() => handleSendComment(item.share_id)}
                        style={styles.sendButton}>
                        <Text style={{ color: 'white' }}>Send</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.commentList}>
                      {item.comments.map((comment) => (
                        <View key={comment.comment_id} style={styles.commentContainer}>
                          <Text style={styles.commentText}>{comment.comment}</Text>
                          {comment.can_delete === 1 && (
                            <TouchableOpacity
                              onPress={() => handleDeleteComment(item.share_id, comment.comment_id)}
                              style={styles.deleteButton}
                            >
                              <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>

                  </View>
                )
              }
            </View>
          )} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: "#fff",
  },
  shareContainer: {
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    width: "95%",
    padding: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  postBody: {
    paddingVertical: 10,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    paddingVertical: 5,
  },
  footer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  searchInput: {
    marginLeft: 40,
    position: "absolute",
    width: "90%",
  },
  iconbgc: {
    position: "relative",
    backgroundColor: "#eee",
    width: "90%",
    padding: 10,
    borderRadius: 50,
  },
  userImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  commentInput: {
    borderWidth: 1,
    width: "80%",
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  commentInputContainer: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  commentContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentText: {
    backgroundColor: "#eee",
    width: "80%",
    padding: 5
  }
});

export default HomeScreen;