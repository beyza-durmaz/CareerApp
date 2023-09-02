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
import axios from 'axios';
import MyIcon from '../components/MyIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [displayNameError, setDisplayNameError] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const baseURL = 'http://www.kursadozdemir.com';

    const handleSignup = async () => {
        if (!displayName) {
            setDisplayNameError('Please enter a name');
        } else {
            setDisplayNameError('');
        }

        if (!jobTitle) {
            setJobTitleError('Please enter a job title');
        } else {
            setJobTitleError('');
        }

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }

        const userData = {
            display_name: displayName,
            job_title: jobTitle,
            email: email,
            password: password,
        };

        if (!displayName || !jobTitle || !email || !password) {
            console.log('Please enter all inputs');
        } else if (!emailPattern.test(email)) {
            console.log('Login failed', 'Please enter a valid email address.');
        } else {
            try {
                const response = await axios.post(`${baseURL}/User/Register`, userData);
                console.log('Signup response:', response);
                console.log('Signup response data:', response.data);

                if (response.data.DURUM) {
                    await AsyncStorage.setItem('userEmail', email);
                    await AsyncStorage.setItem('userPassword', password);

                    navigation.navigate('LoginScreen');
                } else {
                    Alert.alert(
                        'This user already registered! You can log in.'
                    );
                }
            } catch (error) {
                console.error('Error during signup:', error);
                Alert.alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.desc}>Create an account so you can explore all the existing jobs</Text>

            {/* User Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                    <MyIcon name="person-outline" size={24} color="#666" />
                </View>
                <TextInput
                    style={[styles.input, displayNameError && styles.inputError]}
                    placeholder="Name"
                    value={displayName}
                    onChangeText={(text) => {
                        setDisplayName(text)
                        setDisplayNameError('')
                    }}
                />
                {displayNameError ? <Text style={styles.errorText}>{displayNameError}</Text> : null}
            </View>

            {/* Job Title Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                    <MyIcon name="briefcase-outline" size={24} color="#666" />
                </View>
                <TextInput
                    style={[styles.input, jobTitleError && styles.inputError]}
                    placeholder="Job Title"
                    value={jobTitle}
                    onChangeText={(text) => {
                        setJobTitle(text)
                        setJobTitleError('')
                    }}
                />
                {jobTitleError ? <Text style={styles.errorText}>{jobTitleError}</Text> : null}
            </View>

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

            <Pressable style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </Pressable>
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.icons}>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-facebook" size={35} color="#983A8D" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-instagram" size={35} color="#983A8D" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-google" size={35} color="#983A8D" style={styles.iconStyle} />
                </View>
                <View style={styles.iconCircle}>
                    <MyIcon name="logo-apple" size={35} color="#983A8D" style={styles.iconStyle} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Text style={styles.textBtn} onPress={() => navigation.navigate("LoginScreen")}>
                    {' '}
                    Log In
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "white"
    },
    title: {
        color: "#983A8D",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        letterSpacing: 1,
    },
    desc: {
        textAlign: "center",
        maxWidth: "70%",
        color: "black",
        marginBottom: 30,
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
        marginTop: 20,
        paddingLeft: 50,
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
        top: 30,
        left: 10,
        position: "absolute",
        zIndex: 1,
    },
    signupButton: {
        backgroundColor: '#983A8D',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    textBtn: {
        color: '#983A8D',
        fontWeight: 'bold',
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
});

export default SignupScreen;
