import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeaderProf from '../../../Components/HeaderNav';
import { Thumbnail } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { setRegister } from '../../../Redux/Actions/Auth/Register';
import { getDataProfile } from '../../../Redux/Actions/User/Profile';
import {
  searchContacts,
  addContact,
  getContact,
} from '../../../Redux/Actions/Auth/addContact';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
import LoadingScreen from '../../../Components/LoadingScreen';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({ skipPermissionRequests: true });
import MapView from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import HeaderNav from '../../../Components/HeaderNav'
const mapStateToProps = state => ({
  friend: state.addContact,
  login: state.isLogin,
  pos: state.Profile.pos,
  register: state.Register
});

const mapDispatchToProps = {
  setRegister,
  searchContacts,
  addContact,
  getContact,
  getDataProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Contact extends Component {
    state = {
      search: '',
      users: null,
      contacts: [],
      modalVisible: false,
      phoneNumb: '',
      notFound: 'none',
      loading: true,
      modalProfile: false,
      imageUser: '',
      nameUser: '',
      phoneUser: '',
      longitude: '',
      latitude: ''
    };

    updateSearch = search => {
      this.setState({ search });
    };

    async addContactByPhone(phone) {
      try {
        await this.props.searchContacts(phone, status => {
          console.log(this.props.friend.friend.data);
          if (status) {
            this.setState({
              users:
                this.props.friend.friend.data && this.props.friend.friend.data
            });
          }
          if (!status) {
            this.setState({
              notFound: 'User Not Found'
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    async addContact(phone) {
      const current_user = this.props.register.phone;
      try {
        await database()
          .ref(`/users/${current_user}/data`)
          .once('value')
          .then(snapshot => {
            this.props.addContact(
              current_user,
              phone,
              this.state.users,
              snapshot.val()
            );
            this.props.getContact(current_user);
          });
        await this.props.getContact(current_user);

        this.setState({
          modalVisible: false
        });
      } catch (error) {
        console.log(error);
      }
    }

    componentDidMount = async () => {
      try {
        await LocationServicesDialogBox.checkLocationServicesIsEnabled(
          {
            message:
              "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: 'YES',
            cancel: 'NO',
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
            providerListener: true,
          }
        ).then(async (success) => {
          await this.props.getDataProfile(this.props.register.phone);
          await this.props.getContact(this.props.register.phone);
          if (!this.props.friend.isLoading) {
            this.setState({
              loading: true
            });
          }
          if (!this.props.friend.isLoading) {
            this.setState({
              loading: false
            });
          }
        }).catch(err => console.log(err))
      } catch (error) {
        console.log(error);
      }
      Geolocation.requestAuthorization;
      Geolocation.watchPosition(
        info => console.log(info),
        err => console.log(err),
        { enableHighAccuracy: false }
      );
    };

    render() {
      console.log(this.props.pos);
      const { contact } = this.props.friend;
      const contacts = !contact ? null : Object.values(contact);
      const { users, phoneNumb, notFound, longitude, latitude } = this.state;
      console.log(longitude, latitude, contacts);
      return (
        <>
          <HeaderNav onpress={() => this.setState({ modalVisible: !this.state.modalVisible })} onPress={() => this.props.navigation.navigate('Profile')} />
          <View style={{ flex: 1 }}>
            {!this.state.loading ? <></> : <LoadingScreen />}
            <ScrollView style={styles.container}>
              {contacts &&
                contacts.map((contact, i) => {
                  return (
                    <View key={i}>
                      <View style={styles.chatContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              modalProfile: !this.state.modalProfile,
                              imageUser: contact.picture,
                              nameUser: contact.name,
                              phoneUser: contact.phone,
                              longitude: contact.longitude,
                              latitude: contact.latitude
                            })
                          }
                          style={{ justifyContent: 'center' }}
                        >
                          <Thumbnail medium source={{ uri: contact.picture }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('Chat', {
                              data: contact,
                            })
                          }
                        >
                          <View style={styles.chat}>
                            <View
                              style={{
                                justifyContent: 'space-evenly',
                                marginLeft: 20,
                              }}
                            >
                              <Text style={{ color: '#189A8A' }}>
                                {' '}
                                {contact.name}{' '}
                              </Text>
                              <Text style={{ color: '#777' }}>
                                {' '}
                                {contact.phone}{' '}
                              </Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                              <AntDesign
                                name="message1"
                                size={25}
                                color="#189A8A"
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
            <Modal
              style={styles.centeredView}
              animationType="fade"
              visible={this.state.modalVisible}
              transparent={true}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text> Enter phone number </Text>
                  <View style={styles.inputField}>
                    <AntDesign name="phone" size={35} color={'#189A8A'} />
                    <View style={styles.inputText}>
                      <Text
                        style={{
                          position: 'absolute',
                          left: 15
                        }}
                      >
                        +62 :
                    </Text>
                      <TextInput
                        keyboardType="phone-pad"
                        dataDetectorTypes="phoneNumber"
                        maxLength={11}
                        placeholder="Phone Number"
                        placeholderTextColor="#333"
                        onChangeText={phone =>
                          this.setState({ phoneNumb: `+62${phone}` })
                        }
                        style={{
                          paddingHorizontal: 50,
                          borderRadius: 8,
                          borderBottomWidth: 2,
                          borderColor: '#189A8A',
                          width: 230,
                          height: 40,
                          marginLeft: 5
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.condition}>
                    <TouchableOpacity
                      style={styles.conditionText}
                      onPress={() => this.setState({ modalVisible: false })}
                    >
                      <Text style={{ color: '#189A8A' }}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.conditionText}
                      onPress={() => this.addContactByPhone(phoneNumb)}
                    >
                      <Text style={{ color: '#189A8A' }}> Add </Text>
                    </TouchableOpacity>
                  </View>
                  {users !== null ? (
                    <TouchableOpacity
                      style={styles.chatContainer}
                      onPress={() => this.addContact(phoneNumb)}
                    >
                      <View style={{ justifyContent: 'center' }}>
                        <Thumbnail medium source={{ uri: users.picture }} />
                      </View>
                      <View style={styles.chat}>
                        <View
                          style={{
                            justifyContent: 'space-evenly',
                            marginLeft: 20,
                          }}
                        >
                          <Text style={{ color: '#189A8A' }}> {users.name} </Text>
                          <Text style={{ color: '#777' }}> {users.phone} </Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <AntDesign name="message1" size={25} color="#189A8A" />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                      <Text
                        style={{
                          paddingVertical: 8,
                          marginTop: 20,
                          borderTopWidth: 1,
                          borderTopColor: '#ddd',
                          textAlign: 'center'
                        }}
                      >
                        {notFound}
                      </Text>
                    )}
                </View>
              </View>
            </Modal>

            <Modal
              style={styles.centeredView}
              animationType="fade"
              visible={this.state.modalProfile}
              transparent={true}
            >
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.6)'
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    width: '90%',
                    borderRadius: 20,
                    marginBottom: 60
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: 15
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <Thumbnail medium source={{ uri: this.state.imageUser }} />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          modalProfile: false
                        })
                      }
                      style={styles.chat}
                    >
                      <View
                        style={{ justifyContent: 'space-evenly', marginLeft: 20 }}
                      >
                        <Text style={{ color: '#189A8A' }}>
                          {' '}
                          {this.state.nameUser}{' '}
                        </Text>
                        <Text style={{ color: '#777' }}>
                          {' '}
                          {this.state.phoneUser}{' '}
                        </Text>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <AntDesign
                          name="closecircleo"
                          size={25}
                          color="#189A8A"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    height: 460,
                  }}
                >
                  <MapView
                    style={styles.map}
                    showsUserLocation
                    zoomControlEnabled
                    minZoomLevel={0}
                    initialRegion={{
                      latitude: this.props.pos.latitude,
                      longitude: this.props.pos.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                      }}
                      description="My Location"
                    >
                      <Text style={{ color: '#189A8A' }}>
                        {this.state.nameUser}
                      </Text>
                      <Image
                        source={{ uri: this.state.imageUser }}
                        style={{ width: 30, height: 38, borderRadius: 40 }}
                      />
                    </MapView.Marker>
                  </MapView>
                </View>
              </View>
            </Modal>
          </View>
        </>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  chatContainer: {
    flexDirection: 'row',
    height: 78,
    marginBottom: 10,
    marginBottom: 40,
    marginTopTop: 20
  },
  chat: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  addContact: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  chatContainer: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 10
  },
  chat: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  condition: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end'
  },
  conditionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  conditionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  // containerMap: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: '100%',
  //   width: '100%',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
