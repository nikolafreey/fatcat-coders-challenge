import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavProps } from '../commonTypes/navigationTypes';

const CrewMembersScreen = ({ navigation }: NavProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Crew Members! ! !</Text>
        <Text>Crew Members! ! !</Text>
        <Text>Crew Members! ! !</Text>
      </View>
      <Button onPress={() => navigation.navigate('CrewMember')} title="Crew Member Screen" />
    </>
  );
};

interface CrewMembersScreenProps {
  navigation: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
});

export default CrewMembersScreen;
