import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrewMembersWrapperScreen from './screens/CrewMembersWrapperScreen';
import RocketsScreen from './screens/RocketsScreen';
import { checkNetwork } from './utils/NetworkUtils';

MIcon.loadFont();

const Tab = createBottomTabNavigator();

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();

  useEffect(() => {
    checkNetwork(setIsConnected);
  }, []);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {!isConnected && (
        <View>
          <Text style={{ textAlign: 'center', color: 'red' }}>Network Connection: Offline</Text>
        </View>
      )}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Rockets"
            component={RocketsScreen}
            options={{
              headerTitleAlign: 'center',
              tabBarLabel: 'Rockets',
              tabBarIcon: ({ size, color }) => <MIcon name="rocket" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="CrewMembers"
            component={CrewMembersWrapperScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Crew Members',
              tabBarIcon: ({ size, color }) => (
                <MIcon name="account-group" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
