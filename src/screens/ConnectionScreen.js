import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConnectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Connection Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})

export default ConnectionScreen;
