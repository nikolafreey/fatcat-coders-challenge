import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavProps } from '../commonTypes/navigationTypes';

const RocketsScreen = ({ navigation }: RocketsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Rockets</Text>
    </View>
  );
};

interface RocketsScreenProps {
  navigation: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default RocketsScreen;
