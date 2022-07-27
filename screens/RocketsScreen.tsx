import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import { RocketType } from '../commonTypes/rockets';
import { axiosInstance } from '../utils/axiosInstance';

const RocketsScreen = ({ navigation }: NavProps) => {
  const [rockets, setRockets] = useState<RocketType | [] | any | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const url = 'https://jsonplaceholder.typicode.com/posts';

  const fetchRockets = async () => {
    try {
      setIsLoading(true);
      console.log('fetchingReockets');
      // const response = await axiosInstance.get(url);
      const response = await axios.get(url);
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

  useEffect(() => {
    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => console.log('json123', json))
      .catch((error) => console.error(error));

    fetch(url)
      .then((response) => response.json())
      .then((json) => console.log('json', json))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // const source = axios.CancelToken.source();
    // const url = 'rockets';
    // const url = 'https://api.spacexdata.com/v4/rockets';

    fetchRockets();
    // return () => source.cancel('Data fetching cancelled');
  }, []);

  //   if (isLoading)
  //     return (
  //       <View style={styles.container}>
  //         <Text>Loading Please Wait. . .</Text>
  //       </View>
  //     );

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
      <Text>Rockets Array: {JSON.stringify(rockets)}</Text>
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
