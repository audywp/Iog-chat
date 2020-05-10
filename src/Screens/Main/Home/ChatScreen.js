import React, { Component } from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import { Text, View, TextInput, ScrollView } from 'react-native'

import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import SortData from 'sort-objects-array';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class ChatScreen extends Component {

  state = {
    currentUser: auth().currentUser.uid,
    userSelected: this.props.route.params.data.uid,
    name: '',
    uid:'',
    messages: [],
    messagesList: [],
    phone: '',
    messageCurrentUser: ''
  }


  async componentDidMount  ()  {
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
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
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
        const {uri} = response;
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
                  this.setState({textMessage: ''});
                });
            } catch (error) {
              console.log('This error from chat', error);
            }
          })
          .catch(err => {
            console.log({err}, 'ERROR IN UPLOAD IMAGEPICKER');
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
                this.setState({textMessage: ''});
              });
          } catch (error) {
            console.log('This error from chat', error);
          }
        }
      },
    );
  }

  render() {
    return (
      <>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
          <Text style={{
            color: '#999'
          }}> Sending message to {this.props.route.params.data.phone} </Text>
        </View>
        <GiftedChat
          isTyping={true}
          showAvatarForEveryMessage={false}
          infiniteScroll
          alwaysShowSend
          showUserAvatar
          style
          textInputStyle = {{ paddingHorizontal: 10 }}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </>
    )
  }
}
