import React from 'react';
import { Alert, Button, Linking } from 'react-native';

const ExternalLinkButton = ({ title, url }: ExternalLinkButtonProps) => {
  return (
    <Button
      title={title}
      onPress={() => {
        Linking.openURL(url).catch((err: Error) => {
          console.error('Failed opening page because: ', err);
          Alert.alert('Failed to open page');
        });
      }}
    />
  );
};

interface ExternalLinkButtonProps {
  title: string;
  url: string;
}

export default ExternalLinkButton;
