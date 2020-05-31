import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
  pos: state.Profile
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(class maps extends Component {
  state = {
    loading: false
  };

  async componentDidMount() {
    try {
      Geolocation.watchPosition((info) => console.log(info), err => console.log(err), { enableHighAccuracy: false });
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    console.log(this.props)
    const marker = this.props.pos.curentPos && this.props.pos.curentPos.map((item, i) => (
      <MapView.Marker key={i}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}

        description="My Location">
        <Text style={{ color: '#189A8A' }}>{item.name}</Text>
        <Image
          source={{ uri: item.picture }}
          style={{ width: 30, height: 38, borderRadius: 40 }}
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
            latitude: this.props.pos.pos.latitude,
            longitude: this.props.pos.pos.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {marker}
        </MapView>
      </View>
    );
  }
})