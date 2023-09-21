import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const DDListItem = ({ onItemPress, selected, user }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onItemPress(user)}
      style={[
        styles.itemTextStyle,
        { ...(selected ? styles.activeItemStyle : {}) },
      ]}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
};

export default memo(DDListItem);

const styles = StyleSheet.create({
  itemTextStyle: {
    backgroundColor: '#333',
    borderRadius: 8,
    margin: 4,
    padding: 8,
  },
  activeItemStyle: {
    backgroundColor: '#444',
    color: '#fff',
  },
});
