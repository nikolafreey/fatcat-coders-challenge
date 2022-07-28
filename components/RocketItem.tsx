import React from 'react';
import { View, Pressable, Text, Image, StyleSheet, Platform } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RocketType } from '../commonTypes/rockets';
import RocketDetails from './RocketDetails';
// import RocketDetails from './RocketDetails';

const RocketItem = ({
  name,
  description,
  active,
  type,
  cost_per_launch,
  country,
  flickr_image,
}: RocketType) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const selectRocketItemHandler = () => {
    console.log('name', name);
  };

  return (
    <View style={styles.rocketItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectRocketItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: flickr_image }} style={styles.image} />
            <Text style={styles.name}>🚀 {name} 🚀</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <RocketDetails
            active={active}
            type={type}
            cost_per_launch={cost_per_launch}
            country={country!}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default RocketItem;

const styles = StyleSheet.create({
  rocketItem: {
    width: '80%',
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    margin: 4,
  },
});
