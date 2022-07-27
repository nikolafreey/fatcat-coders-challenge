import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import CrewMemberScreen from './CrewMemberScreen';
import { NavProps } from '../commonTypes/navigationTypes';
import CrewMembersScreen from './CrewMembersScreen';

const Stack = createNativeStackNavigator();

const CrewMembersWrapperScreen = ({ navigation }: CrewMembersWrapperScreenProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CrewMembersMain"
        component={CrewMembersScreen}
        options={{
          headerShown: true,
          title: 'Crew Members',
        }}
      />
      <Stack.Screen name="CrewMember" component={CrewMemberScreen} />
    </Stack.Navigator>
  );
};

interface CrewMembersWrapperScreenProps {
  navigation: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CrewMembersWrapperScreen;
