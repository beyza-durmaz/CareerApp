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

const baseURL = 'http://www.kursadozdemir.com';

const UpdatePassword = ({ route, navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleUpdatePassword = async () => {
        // Şifre boş olmamalıdır.
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setOldPassword('Enter your old password')
            setNewPasswordError('Enter a new password');
            setConfirmPasswordError('Confirm your new password');
            return;
        } else {
            setOldPassword('')
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

        const updatedPasswordData = {
            password: newPassword,
        }

        try {
            const response = await axios.post(`${baseURL}/User/UpdatePassword`,
                updatedPasswordData
            );
            console.log("selam", response.data);

            if (response.data.DURUM) {
                console.log('Password updated successfully.');
                Alert.alert('Success', 'Password updated successfully.');
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
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Update Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    secureTextEntry
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                />
                <Pressable
                    style={styles.updateButton}
                    onPress={handleUpdatePassword}
                >
                    <Text style={styles.buttonText}>Update Password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    updateButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default UpdatePassword