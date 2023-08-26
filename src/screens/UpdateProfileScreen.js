import React, { useState, useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    Dimensions,
    Alert
} from 'react-native';
import MyIcon from '../components/MyIcon';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://www.kursadozdemir.com';

const UpdateProfileScreen = ({ route }) => {
    const [newDisplayName, setNewDisplayName] = useState(route.params.profileData.display_name);
    const [newJobTitle, setNewJobTitle] = useState(route.params.profileData.job_title);
    const [token, setToken] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await AsyncStorage.getItem('token');
            setToken(fetchedToken);
        };
        fetchToken();
    }, []);

    // Cihazın boyutlarını al
    const windowHeight = Dimensions.get('window').height;

    // Eğer ekran boyutu 500'den küçükse, bgcImage boyutunu düşür
    const bgcImageHeight = windowHeight < 500 ? windowHeight : 500;

    const updateProfile = async () => {

        const updatedData = {
            token: token,
            display_name: newDisplayName,
            job_title: newJobTitle,
        };

        await axios.post(`${baseURL}/User/UpdateProfile`, updatedData)
            .then(response => {
                console.log('Profil güncellendi:', response.data);
                Alert.alert('Başarılı', 'Profil güncellendi.');

                route.params.onProfileUpdate({
                    ...route.params.profileData,
                    display_name: newDisplayName,
                    job_title: newJobTitle,
                });

                navigation.goBack();
            })
            .catch(error => {
                console.error('Güncelleme hatası:', error);
                Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.headerIcon}>
                        <MyIcon
                            name="chevron-back-outline"
                            size={30}
                            color="white"
                            onPress={
                                () => navigation.goBack()
                            } />
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <Image
                        source={require("../assets/bgc.jpg")}
                        style={[styles.bgcImage, { height: bgcImageHeight }]} />
                    <Image
                        source={require("../assets/user.jpg")}
                        style={styles.userImage} />
                    <MyIcon
                        name="camera-outline"
                        size={22}
                        color="white"
                        style={styles.cameraIcon} />
                </View>

                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Yeni Ad"
                        onChangeText={text => setNewDisplayName(text)}
                        value={newDisplayName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Yeni İş Ünvanı"
                        onChangeText={text => setNewJobTitle(text)}
                        value={newJobTitle}
                    />
                    <Pressable style={styles.updateButton} onPress={updateProfile} >
                        <Text style={styles.updateButtonText}>Update</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
    },
    headerIcon: {
        position: "absolute",
        zIndex: 1,
        flexDirection: "row",
        width: "95%",
        justifyContent: "space-between",
        color: "white",
        top: 10,
    },
    title: {
        color: "white",
        fontSize: 18,
    },
    bgcImage: {
        width: "100%",
        height: 500,
        position: "absolute",
    },
    userImage: {
        position: "relative",
        zIndex: 1,
        top: 130,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 100,
    },
    cameraIcon: {
        position: "absolute",
        zIndex: 1,
        top: 100,
        left: 22,
        backgroundColor: "#1773EA",
        borderRadius: 100,
        padding: 5,
    },
    innerContainer: {
        top: 300,
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 50,
        padding: 10,
        marginBottom: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    updateButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1773EA',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default UpdateProfileScreen;