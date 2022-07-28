import React from 'react';
import { View, Pressable, Text, Image, StyleSheet, Platform } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CrewMemberType } from '../commonTypes/crewMember';

const CrewMembersItem = ({
  name,
  image,
  agency,
  id,
  launches,
  status,
  wikipedia,
}: CrewMemberType) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const selectCrewMembersItemHandler = () => {
    navigation.navigate('CrewMember', { name, image, agency, id, launches, status, wikipedia });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectCrewMembersItemHandler}
      >
        <View style={styles.cardWrapper}>
          <Image style={styles.imageThumbnail} source={{ uri: image }} />
          <View style={styles.nameContainer}>
            <Text style={styles.text}>
              {name} | {agency}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CrewMembersItem;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    borderRadius: 4,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  nameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
  },
  text: { fontSize: 10, color: 'black', backgroundColor: '#cccc', textAlign: 'center' },
  buttonPressed: {
    opacity: 0.5,
  },
});
