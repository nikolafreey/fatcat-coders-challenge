import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}

export const checkNetwork = async (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean | null | undefined>>
) => {
  const isConnectedTemp = await NetworkUtils.isNetworkAvailable();
  setIsConnected(isConnectedTemp);

  if (!isConnectedTemp) {
    Alert.alert('You are Offline!', 'Please reconnect to the Internet!');
  }
};
