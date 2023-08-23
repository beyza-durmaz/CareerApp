import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const MyIcon = ({ name, size, color, style, onPress }) => {
  return (
    <View>
      <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />
    </View>
  );
};

export default MyIcon;