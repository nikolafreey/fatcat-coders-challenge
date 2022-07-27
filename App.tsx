import React, { useEffect, type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RocketsScreen from './screens/RocketsScreen';
import CrewMembersWrapperScreen from './screens/CrewMembersWrapperScreen';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

MIcon.loadFont();

const Tab = createBottomTabNavigator();

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  {
    /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
  }
  {
    /* <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
    <Header />
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}
    >
      <Section title="Step One">
        Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
        back to see your edits.
      </Section>
      <Section title="See Your Changes">
        <ReloadInstructions />
      </Section>
      <Section title="Debug">
        <DebugInstructions />
      </Section>
      <Section title="Learn More">Read the docs to discover what to do next:</Section>
      <LearnMoreLinks />
    </View>
  </ScrollView> */
  }
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetchRockets = async () => {
    try {
      // setIsLoading(true);
      console.log('fetchingReockets APP');
      // const response = await axiosInstance.get(url);
      const response = await axios.get(url);
      console.log('response', response);
      if (response.status === 200) {
        //   setRockets(response);
        // setIsLoading(false);
        return;
      } else {
        throw new Error('Failed to fetch rockets!');
      }
    } catch (error: any) {
      console.log('error', error);
      // if (axios.isCancel(error)) {
      //   console.log('Data fetching cancelled');
      // } else {
      // }
      // setErrorFlag(true);
      // setErrorMessage(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRockets();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('response', response);
        return response.json();
      })
      .then((json) => console.log('json123', json))
      .catch((error) => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => console.log('json', json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Rockets"
            component={RocketsScreen}
            options={{
              tabBarLabel: 'Rockets',
              tabBarIcon: ({ size, color }) => <MIcon name="phone" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="CrewMembers"
            component={CrewMembersWrapperScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Crew Members',
              tabBarIcon: ({ size, color }) => <MIcon name="account" color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
