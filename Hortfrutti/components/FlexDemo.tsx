import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FlexDemo = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: '#f44336' }]}>
        <Text style={styles.text}>Box 1</Text>
      </View>
      <View style={[styles.box, { backgroundColor: '#2196f3' }]}>
        <Text style={styles.text}>Box 2</Text>
      </View>
      <View style={[styles.box, { backgroundColor: '#4caf50' }]}>
        <Text style={styles.text}>Box 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});