import React from 'react';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import * as permissions from 'react-native-permissions';
import { request, PERMISSIONS } from 'react-native-permissions';

const CrewMemberScreen = ({ navigation }: NavProps) => {
  useLayoutEffect(() => {
    navigation?.setOptions({
      title: 'Crew Member {Id}',
    });
  }, [navigation]);

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
