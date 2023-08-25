import axios from 'axios';
import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://www.kursadozdemir.com';

const UpdatePassword = ({ route, navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleUpdatePassword = async () => {
        // Şifre boş olmamalıdır.
        if (!newPassword || !confirmNewPassword) {
            setNewPasswordError('Enter a new password');
            setConfirmPasswordError('Confirm your new password');
            return;
        } else {
            setNewPasswordError('');
            setConfirmPasswordError('');
        }

        // İki şifre alanının da eşleştiğinden emin olun.
        if (newPassword !== confirmNewPassword) {
            setNewPasswordError('Passwords do not match');
            setConfirmPasswordError('Passwords do not match');
            return;
        } else {
            setNewPasswordError('');
            setConfirmPasswordError('');
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(newPassword)) {
            setNewPasswordError(
                'Password should contain at least one digit, one lowercase letter, one uppercase letter, and be at least 6 characters long.'
            );
            return;
        } else {
            setNewPasswordError('');
        }

        const token = await AsyncStorage.getItem("token", token)
        const updatedPasswordData = {
            token: token,
            password: newPassword,
        }

        try {
            const response = await axios.post(`${baseURL}/User/UpdatePassword`,
                updatedPasswordData
            );
            console.log("ResponseData: ", response);

            if (response.data["DURUM"]) {
                console.log('Password updated successfully.');
                Alert.alert('Success', 'Password updated successfully.');
                // Güncellenmiş şifreyi AsyncStorage'ye kaydedin.
                await AsyncStorage.setItem('updatedPassword', newPassword);
                navigation.goBack();
            } else {
                console.log('Password update failed.', 'Failed to update password.');
                Alert.alert('Error', 'Failed to update password.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('An error occurred. Please try again later.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Update Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={[styles.input, newPasswordError && styles.inputError]}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                {setNewPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}
                <TextInput
                    style={[styles.input, confirmPasswordError && styles.inputError]}
                    placeholder="Confirm New Password"
                    secureTextEntry
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                />
                {setConfirmPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}
            </View>
            <Pressable
                style={styles.updateButton}
                onPress={handleUpdatePassword}
            >
                <Text style={styles.buttonText}>Update Password</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        marginTop: 50,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    inputContainer: {
        flex: 1,
        width: "90%",
        height: 50,
        gap: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    updateButton: {
        width: "90%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    inputError: {
        borderWidth: 1,
        borderColor: "red",
    },
    errorText: {
        color: 'red',
    },
});

export default UpdatePassword