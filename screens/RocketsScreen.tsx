import axios, { Axios, AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import { RocketType } from '../commonTypes/rockets';
import RocketItem from '../components/RocketItem';
import { axiosInstance } from '../utils/axiosInstance';
import { checkNetwork } from '../utils/NetworkUtils';

const RocketsScreen = ({ navigation }: NavProps) => {
  const [rockets, setRockets] = useState<RocketType[] | [] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean | null>();

  const url: string = 'rockets';

  const fetchRockets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        setRockets(response.data);
        setIsLoading(false);
        return;
      } else {
        throw new Error('Failed to fetch rockets!');
      }
    } catch (err: AxiosError | any) {
      let error = err;
      if (axios.isAxiosError(err)) {
        error = err as AxiosError;
      }
      setErrorFlag(true);
      setErrorMessage(error?.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkNetwork(setIsConnected);
  }, [navigation, fetchRockets]);

  useEffect(() => {
    fetchRockets();
  }, [fetchRockets]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.spinner}>
          <Text>Loading Please Wait. . .</Text>
        </View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error Fetching Please Try Again Later!</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%', marginLeft: 50 }}
        data={rockets}
        renderItem={({ item }: ListRenderItemInfo<RocketType>) => (
          <RocketItem
            id={item.id}
            active={item.active}
            description={item.description}
            name={item.name}
            type={item.type}
            country={item.country}
            cost_per_launch={item.cost_per_launch}
            flickr_images={item?.flickr_images[0] || 'https://imgur.com/DaCfMsj.jpg'}
            company={item.company}
          />
        )}
        keyExtractor={(item: RocketType) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  errorText: { color: 'red' },
  spinner: { marginBottom: 64 },
});

export default RocketsScreen;
