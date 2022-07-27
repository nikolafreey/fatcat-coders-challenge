import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';

const CrewMemberScreen = ({ navigation }: CrewMemberScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Crew Member!!!</Text>
    </View>
  );
};

interface CrewMemberScreenProps {
  navigation?: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CrewMemberScreen;
