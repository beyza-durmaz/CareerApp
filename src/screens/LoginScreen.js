import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Alert,
} from 'react-native';
import MyIcon from '../components/MyIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const baseURL = 'http://www.kursadozdemir.com';

    const handleLogin = async () => {
        // E-posta ve şifre boş olmamalıdır.
        if (!email || !password) {
            setEmailError('Enter an email address')
            setPasswordError('Enter a password')
            console.log('Login failed', 'Please fill in all fields.');
            return;
        } else {
            setEmailError('');
            setPasswordError('')
        }

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address')
        } else {
            setEmailError('');
        }

        try {
            const response = await axios.post(`${baseURL}/User/Login`, {
                email: email,
                password: password,
            });
            console.log("response: ", response);
            console.log("response data: ", response.data);
            console.log("response data durum: ", response.data["DURUM"]);

            if (response.data["DURUM"]) {
                const token = response.data.NESNE.token; // Token'i alın
                console.log("Token: ", token);
                console.log("Email: ", email);
                
                await AsyncStorage.setItem('token', token); // Token'i AsyncStorage'ye kaydet
                console.log('Login successful!', response.data);
                navigation.navigate('BottomTabsNavigator', {
                    token: response.data.NESNE.token,
                }); // Profil sayfasına yönlendir

            } else {
                console.log('Login failed', 'Incorrect email or password.');
                Alert.alert('Login failed', 'Incorrect email or password.')
            }
        } catch (error) {
            Alert.alert('An error occurred. Please check your credentials.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.desc}>Welcome back you've been missed!</Text>

            {/* Mail Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                    <MyIcon name="mail-outline" size={24} color="#666" />
                </View>
                <TextInput
                    style={[styles.input, emailError && styles.inputError]}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        setEmailError('')
                    }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                    <MyIcon name="lock-closed-outline" size={24} color="#666" />
                </View>
                <TextInput
                    style={[styles.input, passwordError && styles.inputError]}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => {
                        setPassword(text)
                        setPasswordError('')
                    }}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <View style={{ alignSelf: "flex-end", marginVertical: 20 }}>
                <Text
                    style={{ color: "#333" }}>
                    Forgot your password?
                </Text>
            </View>
            <Pressable style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.btnText}>Log In</Text>
            </Pressable>
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.icons}>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-facebook" size={35} color="#333" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-instagram" size={35} color="#333" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-google" size={35} color="#333" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-apple" size={35} color="#333" style={styles.iconStyle} />
                </View>
            </View>
            <Text style={styles.signupText}>
                Don't have an account?
                <Text style={styles.textBtn} onPress={() => navigation.navigate('SignupScreen')}>
                    {' '}
                    Sign Up
                </Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#283C8D",
        letterSpacing: 1,
    },
    desc: {
        fontSize: 17,
        textAlign: "center",
        maxWidth: "80%",
        color: "black",
        marginBottom: 50,
        lineHeight: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingLeft: 50,
        marginBottom: 20,
    },
    inputError: {
        borderWidth: 1,
        borderColor: "red",
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    inputIcon: {
        top: 12,
        left: 10,
        position: "absolute",
        zIndex: 1,
    },
    loginBtn: {
        backgroundColor: '#283C8D',
        borderRadius: 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#666',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginBottom: 20,
        marginVertical: 20,
    },
    iconStyle: {
        backgroundColor: "#eee",
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    signupText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    textBtn: {
        color: '#283C8D',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
