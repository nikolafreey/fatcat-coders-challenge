import React from 'react';
import { Alert, Button, Linking, Text } from 'react-native';

const ExternalLinkButton = ({ title, url }: ExternalLinkButtonProps) => {
  return (
    <Text
      style={{ textDecorationLine: 'underline' }}
      onPress={() => {
        Linking.openURL(url).catch((err: Error) => {
          console.error('Failed opening page because: ', err);
          Alert.alert('Failed to open page');
        });
      }}
    >
      {title}
    </Text>
  );
};

interface ExternalLinkButtonProps {
  title: string;
  url: string;
}

export default ExternalLinkButton;
