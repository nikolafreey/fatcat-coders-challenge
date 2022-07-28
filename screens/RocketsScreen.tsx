import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import { RocketType } from '../commonTypes/rockets';
import { axiosInstance } from '../utils/axiosInstance';
import { checkNetwork } from '../utils/NetworkUtils';

const RocketsScreen = ({ navigation }: NavProps) => {
  const [rockets, setRockets] = useState<RocketType | [] | any | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const url = 'rockets';

  const fetchRockets = async () => {
    try {
      setIsLoading(true);
      console.log('fetchingReockets');
      const response = await axiosInstance.get(url);
      console.log('response', response);
      if (response.status === 200) {
        setRockets(response);
        setIsLoading(false);
        return;
      } else {
        throw new Error('Failed to fetch rockets!');
      }
    } catch (error: AxiosError | any) {
      console.log('error', error);
      // if (axios.isCancel(error)) {
      //   console.log('Data fetching cancelled');
      // } else {
      // }
      setErrorFlag(true);
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  const [isConnected, setIsConnected] = useState<boolean | null>();

  useEffect(() => {
    checkNetwork(setIsConnected);
  }, [fetchRockets]);

  //   useEffect(() => {
  //     const source = axios.CancelToken.source();
  //     const url = 'rockets';

  //     const fetchRockets = async () => {
  //       if (!isConnected) {
  //         Alert.alert('You are not connected to the Internet!');
  //       }
  //       try {
  //         setIsLoading(true);
  //         const response = await axiosInstance.get(url, { cancelToken: source.token });
  //         if (response.status === 200) {
  //           setRockets(response?.data);
  //           setIsLoading(false);
  //           return;
  //         } else {
  //           throw new Error('Failed to fetch users');
  //         }
  //       } catch (error) {
  //         if (axios.isCancel(error)) {
  //           console.log('Data fetching cancelled');
  //         } else {
  //           setErrorFlag(true);
  //           setIsLoading(false);
  //         }
  //       }
  //     };
  //     fetchRockets();
  //     return () => source.cancel('Data fetching cancelled');
  //   }, []);

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Loading Please Wait. . .</Text>
      </View>
    );

  if (hasError)
    return (
      <View style={styles.container}>
        <Text>Error Fetching Please Try Again Later!</Text>
        <Text>{errorMessage}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Button onPress={fetchRockets} title="Testing" />
      <Text>Rockets! ! !</Text>
      {/* <FlatList data={rockets} renderItem={} /> */}
      {/* <Text>Rockets Array: {JSON.stringify(rockets.data)}</Text> */}
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
