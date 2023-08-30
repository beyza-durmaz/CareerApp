import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
    ScrollView,
    Image
} from 'react-native';
import axios from 'axios';
import MyIcon from '../components/MyIcon';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://www.kursadozdemir.com';

const ProfileScreen = ({ route }) => {
    const [profileData, setProfileData] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        fetchProfileData();
    }, [])

    const token = AsyncStorage.getItem('token');

    const fetchProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${baseURL}/User/GetMyProfile`, {
                token: token,
            })
            console.log("Response data:", response.data.NESNE[0]);
            setProfileData(response.data.NESNE[0]);
            console.log("Profile data:", profileData);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    // Profil güncelleme işlemi tamamlandığında tetiklenir
    const handleProfileUpdate = (updatedProfileData) => {
        setProfileData(updatedProfileData);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.editIcon}>
                    <MyIcon
                        name="create"
                        size={30}
                        color="white"
                        onPress={
                            () => navigation.navigate('UpdateProfileScreen', {
                                token: token,
                                profileData: profileData,
                                onProfileUpdate: handleProfileUpdate, // Güncelleme işlemi tamamlandığında tetiklenecek fonksiyon
                            })
                        } />
                </View>

                <View style={{width: "100%"}}>
                    <Image
                        source={require("../assets/bgc.jpg")}
                        style={styles.bgcImage} />
                </View>
                <View style={{ width: "100%", alignItems: "center", top: -60 }}>
                    <Image
                        source={require("../assets/user.jpg")}
                        style={styles.userImage} />
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.name}>{profileData.display_name}</Text>
                    <Text style={styles.jobTitle}>{profileData.job_title}</Text>
                    <Text style={{color: "#983A8D", fontSize: 18, fontWeight: "bold", padding: 10}}>500+</Text>
                    <Text style={styles.email}>{profileData.email}</Text>
                </View>

                <View style={styles.profileInfo}>
                    <Pressable style={styles.btnContainer}>
                        <Text style={styles.btnText}>Connect</Text>
                    </Pressable>
                    <Pressable style={styles.btnContainer}>
                        <Text style={styles.btnText}>Follow</Text>
                    </Pressable>
                    <MyIcon name="ellipsis-horizontal-circle" size={35} color="#983A8D" />
                </View>

                {/* ABOUT SECTION */}
                <View style={styles.aboutSection}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "#983A8D", fontWeight: "bold" }}>About</Text>
                        <MyIcon name="pencil" size={20} />
                    </View>
                    <Text style={{ fontSize: 12, color: "#888" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum doloribus iure molestiae cum laborum perspiciatis eius maxime beatae ut provident culpa aut, commodi perferendis libero officiis laudantium hic soluta odit?</Text>
                </View>

                {/* EXPERIENCE SECTION */}
                <View style={styles.experienceSection}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "#983A8D", fontWeight: "bold" }}>Experience</Text>
                        <MyIcon name="pencil" size={20} />
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="logo-github" size={40} color="black" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>Job Title</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Github</Text>
                            <Text style={{ fontSize: 12 }}>Sep 2020 - Sep 2021</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="logo-facebook" size={40} color="#3C5078" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>Job Title</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Facebook</Text>
                            <Text style={{ fontSize: 12 }}>Sep 2020 - Nov 2020</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="logo-apple" size={40} color="black" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>Job Title</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Apple</Text>
                            <Text style={{ fontSize: 12 }}>Sep 2019 - Sep 2020</Text>
                        </View>
                    </View>
                </View>

                {/* EDUCATION SECTION */}
                <View style={styles.educationSection}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "#983A8D", fontWeight: "bold" }}>Education</Text>
                        <MyIcon name="pencil" size={20} />
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="school" size={40} color="black" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>University</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Department</Text>
                            <Text style={{ fontSize: 12 }}>Sep 2016 - Sep 2020</Text>
                        </View>
                    </View>
                </View>

                {/* CERTIFICATIONS SECTION */}
                <View style={styles.educationSection}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "#983A8D", fontWeight: "bold" }}>Licenses & Certifications</Text>
                        <MyIcon name="pencil" size={20} />
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="logo-google" size={40} color="black" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>Introduction to Front-End Development</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Google</Text>
                            <Text style={{ fontSize: 12 }}>Issued Jul 2018</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MyIcon name="logo-amazon" size={40} color="black" style={{ backgroundColor: "#eee", padding: 10, borderRadius: 10 }} />
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>Mobile App Development</Text>
                            <Text style={{ fontSize: 14, color: "black" }}>Amazon</Text>
                            <Text style={{ fontSize: 12 }}>Issued Jul 2017</Text>
                        </View>
                    </View>
                </View>

                {/* SHOW MORE BUTTON */}
                <View style={styles.showMoreBtn}>
                    <MyIcon name="chevron-down" size={25} color="white" />
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Show More</Text>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    editIcon: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    bgcImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover"
    },
    userImage: {
        position: "absolute",
        zIndex: 1,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 100,
    },
    profileHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    btnContainer: {
        backgroundColor: "#983A8D",
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 8,
    },
    btnText: {
        color: "white",
        fontSize: 16,
    },
    userInfo: {
        alignItems: "center",
        top: 70
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
    },
    jobTitle: {
        fontSize: 18,
        color: '#333',
    },
    profileInfo: {
        flexDirection: "row",
        marginTop: 100,
        gap: 10,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    aboutSection: {
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: "100%",
        paddingHorizontal: 20,
    },
    experienceSection: {
        width: "100%",
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    educationSection: {
        paddingHorizontal: 20,
        width: "100%",
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        gap: 10,
    },
    showMoreBtn: {
        width: "100%",
        flexDirection: "row",
        paddingVertical: 15,
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#983A8D",
        marginTop: 10,
    },
    bottomTabs: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
    },
});

export default ProfileScreen;