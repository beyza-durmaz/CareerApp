import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const WelcomeScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={require("../assets/goal.png")} style={styles.img} />
                <View style={styles.innerContainer}>
                    <Text style={styles.label}>
                        Welcome to {"\n"} Your Career Hub
                    </Text>
                    <Text style={styles.desc}>
                        Connect with professionals worldwide, showcase your skills, and stay updated with industry trends. Join us now!
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable
                        style={styles.signupBtn}
                        onPress={() => navigation.navigate("SignupScreen")}
                    >
                        <Text style={styles.btnText}>Sign Up</Text>
                    </Pressable>
                    <Pressable
                        style={styles.loginBtn}
                        onPress={() => navigation.navigate("LoginScreen")}
                    >
                        <Text style={[styles.btnText, { color: "#983A8D" }]}>Log In</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    innerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 1,
    },
    desc: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888888',
        paddingHorizontal: 20,
    },
    btnContainer: {
        marginTop: 30,
    },
    signupBtn: {
        backgroundColor: "#983A8D",
        height: 50,
        width: windowWidth * 0.7,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 15,
    },
    loginBtn: {
        backgroundColor: "#fff",
        borderColor: "#983A8D",
        borderWidth: 2,
        height: 50,
        width: windowWidth * 0.7,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#fff",
        textAlign: "center",
        letterSpacing: 1,
    },
});

export default WelcomeScreen;
