import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class maps extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    Geolocation.requestAuthorization
    Geolocation.watchPosition((info) => console.log(info));
    this.getDataUser();
  }

  getDataUser() {
    database()
      .ref(`users/${auth().currentUser.phoneNumber}/friend`)
      .on('value', (snapshot) => {
        const current_user = auth().currentUser.uid;
        console.log(snapshot.val())
        console.log('hahaha', current_user);
        const data = snapshot.val();
        const user = Object.values(data);
        this.setState({
          users: user,
        });
      });
  }
  render() {
    const marker = this.state.users.map((item) => (
      <MapView.Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        
        description="My Location">
        <Text style={{ color: '#189A8A' }}>{item.name}</Text>
        <Image
          source={{uri: item.picture}}
          style={{width: 30, height: 38, borderRadius: 40}}
        />
      </MapView.Marker>
    ));
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          zoomControlEnabled
          minZoomLevel={0}
          initialRegion={{
            latitude: -6.6211252,
            longitude: 106.818001,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {marker}
        </MapView>
      </View>
    );
  }
}