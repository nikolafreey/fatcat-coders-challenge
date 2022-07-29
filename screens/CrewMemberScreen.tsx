import React, { useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { ActivityIndicator, Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../commonTypes/navigationTypes';
import * as permissions from 'react-native-permissions';
import { request, PERMISSIONS } from 'react-native-permissions';
import { CrewMemberType } from '../commonTypes/crewMember';
import ExternalLinkButton from '../components/ExternalLinkButton';
import { WebView } from 'react-native-webview';

const CrewMemberScreen = ({ route, navigation }: NavProps) => {
  const crewMemberObject: CrewMemberType | any = route.params;

  const { name, image, agency, id, launches, status, wikipedia }: CrewMemberType = crewMemberObject;

  const [appTrackingTransparencyPermission, setAppTrackingTransparencyPermission] =
    useState<permissions.PermissionStatus>();
  const [cameraPermission, setCameraPermission] = useState<permissions.PermissionStatus>();
  const [galleryPermission, setGalleryPermission] = useState<permissions.PermissionStatus>();
  const [galleryAddPermission, setGalleryAddPermission] = useState<permissions.PermissionStatus>();

  useEffect(() => {
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
  }, []);

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: name,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.bgImage}>
        <View style={styles.bottomContainer}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.agency}>
            <Text style={{ fontWeight: 'bold' }}>Agency: </Text>
            {agency}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.launches}>
              <Text style={styles.number}>{launches}</Text>
              <Text style={[styles.number, { fontWeight: 'normal', fontSize: 18 }]}>Launches </Text>
            </View>
            <View style={styles.launches}>
              <Text style={[styles.numberSecond, { color: status === 'active' ? 'green' : 'red' }]}>
                {status?.toUpperCase()}
                {status === 'active' ? ' ✔️' : ' ❌'}
              </Text>
              <Text style={[styles.numberSecond, { fontWeight: 'normal', fontSize: 18 }]}>
                Status
              </Text>
            </View>
          </View>
          <View style={styles.wikiWrapper}>
            <ExternalLinkButton title="Wiki Link" url={wikipedia!} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              height: 200,
              width: '90%',
              padding: 12,
            }}
          >
            <WebView
              originWhitelist={['*']}
              source={{ uri: wikipedia! }}
              renderLoading={() => <ActivityIndicator size="large" />}
              startInLoadingState
            />
          </View>
        </View>
      </View>
    </View>
  );
};

interface CrewMemberScreenProps {
  navigation?: NavProps;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#04e2ff3b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 225,
    width: 225,
    bottom: '10%',
    borderRadius: 20,
  },
  name: { fontSize: 36, fontWeight: 'bold', bottom: '8%' },
  agency: { color: 'gray', bottom: '7%', fontSize: 18 },
  imageWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  nameContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 64,
  },
  bottomContainer: {
    marginTop: '52%',
    height: '90%',
    width: 400,
    backgroundColor: 'white',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: 'center',
  },
  wikiWrapper: { flexDirection: 'row', justifyContent: 'center', width: '75%' },
  wikiText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 10, color: 'black', backgroundColor: '#cccc', textAlign: 'center' },
  number: { color: '#66a7f', fontSize: 16, fontWeight: 'bold' },
  numberSecond: { color: '#66a7f', fontSize: 16, fontWeight: 'bold', marginLeft: 36 },
  launches: { bottom: '5%', alignItems: 'center' },
});

export default CrewMemberScreen;
