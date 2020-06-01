/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';

import ButtonSignout from '../../../Components/Button';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
// redux
import { hasLogout } from '../../../Redux/Actions/Auth/Login';
import { connect } from 'react-redux';
import { setRegister } from '../../../Redux/Actions/Auth/Register';
import {
  CreateProfile,
  getDataProfile,
  UpdateUser,
  UploadPhoto,
} from '../../../Redux/Actions/User/Profile';

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({ skipPermissionRequests: true });

import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import LoadingScreen from '../../../Components/LoadingScreen';
import { GoogleSignin } from '@react-native-community/google-signin'
const mapStateToProps = state => ({
  login: state.isLogin,
  register: state.Register,
  profile: state.Profile,
});

const mapDispatchToProps = {
  hasLogout,
  setRegister,
  CreateProfile,
  getDataProfile,
  UpdateUser,
  UploadPhoto,
};

// config image

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: {
          uri:
            'https://firebasestorage.googleapis.com/v0/b/iogchat-b5496.appspot.com/o/chatapp.png?alt=media&token=9a588acc-d2eb-4203-8ae2-6581922d5199',
        },
        modalVisible1: false,
        modalVisible2: false,
        modalVisible3: false,
        name: '',
        status: '',
        phone: this.props.register.phone,
        loading: false,
        placeholder: false,
        path: '',
        pictureName: null,
        respone: false,
        longitude: '',
        latitude: '',
        btnDisabled: false,
        btnTitle: 'Update'
      };
    }

    modalUsername = () => {
      const { modalVisible1 } = this.state;
      this.setState({
        modalVisible1: !modalVisible1,
      });
    };
    modalStatus = () => {
      const { modalVisible2 } = this.state;
      this.setState({
        modalVisible2: !modalVisible2,
      });
    };
    modalPhone = () => {
      const { modalVisible3 } = this.state;
      this.setState({
        modalVisible3: !modalVisible3,
      });
    };

    setUser = async () => {
      if (this.state.path !== '') {
        await this.props.UploadPhoto(this.state.path);
        this.setState({
          loading: false,
        });
        const upload = storage().ref(`${this.state.pictureName}`);
        await upload.putFile(this.state.path);
        const urlPhoto = await storage()
          .ref(`${this.state.pictureName}`)
          .getDownloadURL();
        const data = {
          uid: auth().currentUser.uid,
          name: this.state.name,
          status: this.state.status,
          phone: this.state.phone,
          picture: urlPhoto,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
        };
        this.setState({
          loading: false,
        });
        try {

          await this.props.getDataProfile(
            this.state.phone,
            callback => {
              if (!callback) {
                this.props.CreateProfile(this.state.phone, data);
                Alert.alert('Create Account success');
                this.props.getDataProfile(this.state.phone);
              } else {
                this.props.UpdateUser(this.state.phone, data);
                Alert.alert('Updata success');
                this.props.getDataProfile(this.state.phone);
              }
            }
          );
          await this.props.getDataProfile(this.props.register.phone);
          this.setState({
            loading: true,
            image: { uri: this.props.profile.user.data.picture },
            pictureName: null,
          });


        } catch (error) {
          console.log(error);
        }
      } else {
        this.setState({
          loading: false,
        });
        const data = {
          uid: auth().currentUser.uid,
          name: this.state.name,
          status: this.state.status,
          phone: this.state.phone,
          picture: this.props.profile.user.data.picture || this.state.image.uri,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
        };
        this.setState({
          loading: false,
        });
        try {
          await this.props.getDataProfile(
            this.props.register.phone,
            callback => {
              if (!callback) {
                this.props.CreateProfile(this.state.phone, data);
                Alert.alert('Create Account success');
              } else {
                this.props.UpdateUser(this.state.phone, data);
                Alert.alert('Updata success');
              }
            }
          );
          await this.props.getDataProfile(this.props.register.phone);
          this.setState({
            loading: true,
            pictureName: null,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    logout = async () => {
      this.props.hasLogout();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    };

    async componentDidMount() {
      Geolocation.getCurrentPosition(
        info => {
          this.setState({
            longitude: info.coords.longitude,
            latitude: info.coords.latitude,
          });
        }, err => console.log(err),
        { enableHighAccuracy: false }
      )
      try {
        await this.props.getDataProfile(
          this.props.register.phone,
          callback => {
            if (callback) {
              this.setState({
                image: { uri: this.props.profile.user.data.picture },
                name:
                  this.props.profile.user && this.props.profile.user.data.name,
                status:
                  this.props.profile.user && this.props.profile.user.data.status,
              });
            } else {
              this.setState({
                name: auth().currentUser.displayName === null ? 'Anonymous' : auth().currentUser.displayName,
                status: 'Available',
                btnTitle: 'Create'
              });
            }
            if (!this.props.isLoading) {
              this.setState({
                loading: true,
                placeholder: true,
              });
            }
          }
        );
        if (this.props.isLoading) {
          this.setState({
            loading: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    imagePicker = async () => {
      const options = {
        title: 'Select Image',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        allowsEditing: true,
      };
      if (!this.state.respone) {
        this.setState({
          loading: false,
        });
      }
      ImagePicker.launchImageLibrary(options, async respone => {
        this.setState({
          respone: true,
        });
        if (respone.fileSize < 4194304) {
          const cancel = respone.didCancel;
          const source = {
            uri:
              cancel && this.props.profile.user.data
                ? this.props.profile.user.data.picture
                : respone.uri,
          };
          const path = respone.path;
          console.log(path);
          this.setState({
            respone: false,
            loading: true,
            image: source,
            path: path,
            pictureName: respone.fileName,
          });
        } else if (respone.didCancel) {
          this.setState({
            respone: false,
            loading: true,
          });
        } else {
          Alert.alert('Files size to large');
          this.setState({
            respone: false,
            loading: true,
          });
        }
      });
    };

    render() {
      console.log(auth().currentUser)
      return (
        <>
          {this.state.loading ? <></> : <LoadingScreen />}
          <ScrollView
            style={{
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Image
                source={this.state.image}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 90,
                }}
                resizeMode='cover'
              />

              <View
                style={{
                  backgroundColor: '#189A8A',
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 0,
                  right: 95,
                }}
              >
                <TouchableOpacity onPress={this.imagePicker}>
                  <Image
                    source={require('../../../Assets/Images/photograph.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 19,
              }}
            >
              <View style={styles.chatContainer}>
                <View style={{ justifyContent: 'center' }}>
                  <Image
                    source={require('../../../Assets/Images/name.png')}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </View>
                <View style={styles.chat}>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 12 }}> Name </Text>
                    <Text style={{ marginTop: 6, fontSize: 16 }}>
                      {' '}
                      {this.state.name}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.modalUsername}
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <AntDesign name="edit" size={25} color="#777" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.chatContainer}>
                <View style={{ justifyContent: 'center' }}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={35}
                    color={'#189A8A'}
                  />
                </View>
                <View style={styles.chat}>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 12 }}> Status </Text>
                    <Text style={{ marginTop: 6, fontSize: 16 }}>
                      {' '}
                      {this.state.status}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.modalStatus}
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <AntDesign name="edit" size={25} color="#777" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.chatContainer}>
                <View style={{ justifyContent: 'center' }}>
                  <Image
                    source={require('../../../Assets/Images/phone.png')}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </View>
                <View style={styles.chat}>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 12 }}> Phone </Text>
                    <Text style={{ marginTop: 6, fontSize: 16 }}>
                      {' '}
                      {this.state.phone}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.modalPhone}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}
                  >
                    <AntDesign name="logout" size={25} color="#777" />
                    <Text style={{ color: '#777' }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ButtonSignout
              onPress={this.setUser}
              title="Update"
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              style={{
                width: 250,
                backgroundColor: '#189A8A',
                borderRadius: 20,
                marginTop: 20,
              }}
              textStyle={{ textAlign: 'center', color: 'white', flex: 1 }}
            />
          </ScrollView>
          <Modal
            style={styles.centeredView}
            animationType="fade"
            visible={this.state.modalVisible1}
            transparent={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text> Enter your name </Text>
                <View style={styles.inputField}>
                  <Image
                    source={require('../../../Assets/Images/name.png')}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                  />
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#ddd"
                    onChangeText={text => this.setState({ name: text })}
                    value={this.state.name}
                    style={{
                      paddingHorizontal: 50,
                      marginTop: 10,
                      borderBottomWidth: 2,
                      borderColor: '#189A8A',
                      width: 230,
                      height: 40,
                      marginLeft: 5,
                    }}
                  />
                </View>
                <View style={styles.condition}>
                  <TouchableOpacity
                    style={styles.conditionText}
                    onPress={() => this.setState({ modalVisible1: false })}
                  >
                    <Text style={{ color: '#189A8A' }}> Save </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            style={styles.centeredView}
            animationType="slide"
            visible={this.state.modalVisible2}
            transparent={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text> Status </Text>
                <View style={styles.inputField}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={35}
                    color={'#189A8A'}
                  />
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#ddd"
                    onChangeText={text => this.setState({ status: text })}
                    value={this.state.status}
                    style={{
                      paddingHorizontal: 50,
                      marginTop: 10,
                      borderBottomWidth: 2,
                      borderColor: '#189A8A',
                      width: 230,
                      height: 40,
                      marginLeft: 5,
                    }}
                  />
                </View>
                <View style={styles.condition}>
                  <TouchableOpacity
                    style={styles.conditionText}
                    onPress={() => this.setState({ modalVisible2: false })}
                  >
                    <Text style={{ color: '#189A8A' }}> Save </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            style={styles.centeredView}
            animationType="slide"
            visible={this.state.modalVisible3}
            transparent={true}
          >
            <View style={styles.centeredWarn}>
              <View style={styles.modalWarn}>
                <View style={styles.logoWarn}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={60}
                    color={'#189A8A'}
                  />
                </View>
                <View>
                  <Text></Text>
                  <Text style={{
                    fontFamily: 'Roboto'
                  }}># For security issues</Text>
                  <Text></Text>
                  <Text style={{
                    fontFamily: 'Roboto'
                  }}>Cause Google signin have alot privacy credential,</Text>
                  <Text></Text>
                  <Text style={{
                    fontFamily: 'Roboto'
                  }}>If you login with Google Sign in method, logout feature will remove all your data from our apps</Text>
                  <Text></Text>
                  <Text style={{
                    fontFamily: 'Roboto'
                  }}>Causing you have to create a new account when logging in again</Text>
                  <Text></Text>
                  <Text style={{
                    fontFamily: 'Roboto'
                  }}>(This issues its not affected if you logging in with phone number method)</Text>
                </View>
                <View style={styles.condition}>
                  <TouchableOpacity
                    style={styles.conditionText}
                    onPress={() => this.setState({ modalVisible3: false })}
                  >
                    <Text style={{ color: '#189A8A' }}> Cancel </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.conditionText}
                    onPress={this.logout}
                  >
                    <Text style={{ color: '#189A8A' }}> Process </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    paddingHorizontal: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
  },
  chat: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  condition: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  conditionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoWarn: {
    alignItems: 'center',
  },
  modalWarn: {
    width: 300,
    height: 470,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredWarn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
