import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import * as permissions from 'react-native-permissions';
import { request, PERMISSIONS } from 'react-native-permissions';

const CrewMemberScreen = ({ navigation }: NavProps) => {
  const [appTrackingTransparencyPermission, setAppTrackingTransparencyPermission] =
    useState<permissions.PermissionStatus>();
  const [cameraPermission, setCameraPermission] = useState<permissions.PermissionStatus>();
  const [galleryPermission, setGalleryPermission] = useState<permissions.PermissionStatus>();
  const [galleryAddPermission, setGalleryAddPermission] = useState<permissions.PermissionStatus>();

  request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(
    (result) => {
      setCameraPermission(result);
      console.log('setCameraPermission', result);
    }
  );

  request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  ).then((result) => {
    setGalleryPermission(result);
    console.log('setGalleryPermission', result);
  });

  request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  ).then((result) => {
    setGalleryAddPermission(result);
    console.log('setGalleryAdddPermission', result);
  });

  if (Platform.OS === 'ios') {
    request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).then((result) => {
      setAppTrackingTransparencyPermission(result);
      console.log('setAppTrackingTransparencyPermission', result);
    });
  }

  if (
    appTrackingTransparencyPermission === permissions.RESULTS.BLOCKED ||
    appTrackingTransparencyPermission === permissions.RESULTS.DENIED
  ) {
    Alert.alert(
      'App Tracking Transparency (ATT) Permission is not granted, therefore you cannot access requested page!'
    );
    navigation.replace('CrewMembers');
  }
  useLayoutEffect(() => {
    navigation?.setOptions({
      title: 'Crew Member {Id}',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Crew Member!!!</Text>
    </View>
  );
};

interface CrewMemberScreenProps {
  navigation?: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CrewMemberScreen;
