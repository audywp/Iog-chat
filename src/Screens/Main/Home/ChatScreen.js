import React, { Component } from 'react'
import { GiftedChat, Composer, InputToolbar, Send, Message, Actions } from 'react-native-gifted-chat'
import { Text, View, TextInput, ScrollView, TouchableHighlight, TouchableOpacity, ImageBackground, } from 'react-native'

import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import SortData from 'sort-objects-array';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header, Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  profile: state.Profile.user.data
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(class ChatScreen extends Component {

  state = {
    currentUser: auth().currentUser.uid,
    userSelected: this.props.route.params.data.uid,
    name: '',
    uid: '',
    messages: [],
    messagesList: [],
    phone: '',
    messageCurrentUser: ''
  }


  renderComposer = props => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        zIndex: -1
      }}>
        <MaterialIcons name='camera-alt' size={20} color='#999' />
        <Composer {...props} />
        <MaterialIcons style={{
          marginHorizontal: 5
        }} name='attach-file' size={20} color='#999' />

      </View>
    )
  }

  renderInputToolbar = props => {
    return (

      <InputToolbar containerStyle={{
        marginTop: 10,
        paddingBottom: 5,
        width: '100%',
        marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)'

      }} {...props} />

    )
  }

  renderSend = props => {
    return (
      <Send {...props}
        containerStyle={{
          marginLeft: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View>
          <MaterialIcons name='send' size={25} color='#189A8A' />
        </View>
      </Send>
    )
  }

  renderMessage = props => {

    <Message
      {...props}
      containerStyle={{
        backgroundColor: 'red'
      }}
    >
      <View style={{
        backgroundColor: 'red'
      }}><Text>test</Text></View>
    </Message>
  }

  async componentDidMount() {
    database()
      .ref('message/')
      .child(`/${this.state.currentUser}/`)
      .child(`/${this.state.userSelected}/`)

      .on('child_added', value => {
        this.setState(prevState => {
          const data = value.val();
          const res = [...prevState.messages, value.val()];
          const d = res.map((data, index) => {
            data._id = 1 + index;
            data.user = {
              _id: data.from === this.state.currentUser ? 1 : 2,
              avatar:
                data.from !== this.state.currentUser
                  ? this.props.route.params.data.photo
                  : null,
            };
            return data;
          });

          return {
            messages: SortData(d, 'createdAt', 'desc'),
          };
        });
      });

  }

  uriToBlob = uri => {
    console.log('URI', uri);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('Error on upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  handleAddPicture = () => {
    const options = {
      title: 'Select',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',

      allowsEditing: true,
      noData: true,
    };
    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const { uri } = response;
        const extensionIndex = uri.lastIndexOf('.');
        const extension = uri.slice(extensionIndex + 1);
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const correspondingMime = ['image/jpeg', 'image/jpeg', 'image/png'];

        const blobImage = await this.uriToBlob(uri);
        storage()
          .ref(`profile/${this.props.route.params.uid}.png`)
          .put(blobImage)
          .then(async () => {
            const url = await storage()
              .ref(`profile/${this.props.route.params.uid}.png`)
              .getDownloadURL();
            const dataMessage = {
              text: '',
              createdAt: database.ServerValue.TIMESTAMP,
              from: this.state.currentUser,
              image: url,
            };
            try {
              let messageId = (await database()
                .ref(`message/`)
                .child(`/${this.state.currentUser}/`)
                .child(`/${this.state.userSelected}`)
                .push()).key;
              let updates = {};

              updates[
                `message/${this.state.currentUser}/${
                this.state.userSelected
                }/${messageId}`
              ] = dataMessage;
              updates[
                `message/${this.state.userSelected}/${
                this.state.currentUser
                }/${messageId}`
              ] = dataMessage;
              database()
                .ref()
                .update(updates, () => {
                  this.setState({ textMessage: '' });
                });
            } catch (error) {
              console.log('This error from chat', error);
            }
          })
          .catch(err => {
            console.log({ err }, 'ERROR IN UPLOAD IMAGEPICKER');
          });
      }
    });
  };

  async onSend(messages = []) {
    this.setState(
      previousState => ({}),
      async () => {
        if (messages) {
          try {
            let messageId = (await database()
              .ref(`message/`)
              .child(`/${this.state.currentUser}/`)
              .child(`/${this.state.userSelected}`)
              .push()).key;
            let updates = {};
            let message = {
              text: messages[0].text,
              createdAt: database.ServerValue.TIMESTAMP,
              from: this.state.currentUser,
            };
            updates[
              `message/${this.state.currentUser}/${
              this.state.userSelected
              }/${messageId}`
            ] = message;
            updates[
              `message/${this.state.userSelected}/${
              this.state.currentUser
              }/${messageId}`
            ] = message;
            database()
              .ref()
              .update(updates, () => {
                this.setState({ textMessage: '' });
              });
          } catch (error) {
            console.log('This error from chat', error);
          }
        }
      },
    );
  }

  headerLeft = () => {
    return (
      <View style={{
        flex: 1
      }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={30} color='white' />
        </TouchableOpacity>
      </View>
    )
  }

  headerCenter = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <View style={{
          marginRight: 10
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Avatar
              rounded
              source={{ uri: this.props.route.params.data.picture }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'white' }}>{this.props.route.params.data.phone}</Text>
          <Text style={{ color: 'white' }}>{this.props.route.params.data.status}</Text>
        </View>
      </View>
    )
  }

  headerRight = () => {
    return (
      <View style={{
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
        flex: 1
      }}>
        <Ionicons name='ios-videocam' size={30} color='white' />
        <Ionicons name='ios-call' size={30} color='white' />
      </View>
    )
  }

  render() {
    console.log(this.props)
    return (


      <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/iogchat-b5496.appspot.com/o/background-chat.jpg?alt=media&token=f9705d0c-755d-40f5-b272-ffa5126e12d8' }} style={{
        flex: 1
      }}>
        <Header
          goBack={() => this.props.navigation.goBack()}
          placement="left"
          statusBarProps={{ barStyle: 'light-content' }}
          containerStyle={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: 'rgba(0,0,0,0)'
          }}
          leftComponent={this.headerLeft}
          centerComponent={this.headerCenter}
          rightComponent={this.headerRight}
        />
        <GiftedChat

          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
          renderInputToolbar={this.renderInputToolbar}
          isTyping={true}
          showUserAvatar={false}
          showAvatarForEveryMessage={false}
          infiniteScroll
          alwaysShowSend
          renderAvatar={null}
          onSend={messages => this.onSend(messages)}
          messages={this.state.messages}
          user={{
            _id: 1,
          }}
          keyboardShouldPersistTaps='always'
        />
      </ImageBackground>

    )
  }
})
