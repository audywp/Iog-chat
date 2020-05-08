// import React, {Component} from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
// import Geolocation from '@react-native-community/geolocation';
// Geolocation.setRNConfiguration({skipPermissionRequests: true});

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: '100%',
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default class maps extends Component {
//   state = {
//     users: [],
//   };

//   componentDidMount() {
//     Geolocation.getCurrentPosition((info) => console.log(info));
//     this.getDataUser();
//   }

//   getDataUser() {
//     database()
//       .ref('users/')
//       .on('value', (snapshot) => {
//         const current_user = auth().currentUser.uid;
//         console.log('hahaha', current_user);
//         const data = snapshot.val();
//         const user = Object.values(data);
//         const result = user.filter((user) => user.uid !== current_user);
//         this.setState({
//           users: result,
//         });
//       });
//   }
//   render() {
//     const marker = this.state.users.map((item) => (
//       <MapView.Marker
//         coordinate={{
//           latitude: item.latitude,
//           longitude: item.longitude,
//         }}
//         title={item.name}
//         description={item.status}
//       />
//     ));
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           showsUserLocation
//           zoomControlEnabled
//           minZoomLevel={0}
//           initialRegion={{
//             latitude: -6.6211252,
//             longitude: 106.818001,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}>
//           {marker}
//         </MapView>
//       </View>
//     );
//   }
// }