import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import CrewMemberScreen from './CrewMemberScreen';
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CrewMember"
        component={CrewMemberScreen}
        options={{ headerTitleAlign: 'center' }}
      />
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
