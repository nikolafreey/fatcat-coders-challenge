import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CrewMemberType } from '../commonTypes/crewMember';
import { NavProps } from '../commonTypes/navigationTypes';
import CrewMembersItem from '../components/CrewMembersItem';
import { axiosInstance } from '../utils/axiosInstance';
import { checkNetwork } from '../utils/NetworkUtils';

const CrewMembersScreen = ({ navigation }: NavProps) => {
  const [crewMembers, setCrewMembers] = useState<CrewMemberType | [] | any | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean | null>();

  const url: string = 'crew';

  const fetchCrewMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        console.log('response', response.data[0]);
        setCrewMembers(response.data);
        setIsLoading(false);
        return;
      } else {
        throw new Error('Failed to fetch Crew Members!');
      }
    } catch (error: AxiosError | any) {
      console.log('error', error);
      setErrorFlag(true);
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkNetwork(setIsConnected);
  }, [fetchCrewMembers]);

  useEffect(() => {
    fetchCrewMembers();
  }, []);

  if (isLoading)
    return (
      <View style={styles.container}>
        <View style={styles.spinner}>
          <Text>Loading Please Wait. . .</Text>
        </View>
        <ActivityIndicator size="large" />
      </View>
    );

  if (hasError)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error Fetching Please Try Again Later!</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );

  return (
    <>
      <View style={styles.containerFlatList}>
        <FlatList
          data={crewMembers}
          renderItem={({ item }: ListRenderItemInfo<any>['item']) => (
            <CrewMembersItem
              agency={item.agency}
              image={item.image}
              name={item.name}
              id={item.id}
              launches={item.launches}
              status={item.status}
              wikipedia={item.wikipedia}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  containerFlatList: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  errorText: { color: 'red' },
  spinner: { marginBottom: 64 },
});

export default CrewMembersScreen;
