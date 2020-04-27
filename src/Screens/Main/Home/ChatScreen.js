import React, { Component } from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import { Text, View, TextInput, ScrollView } from 'react-native'

import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class ChatScreen extends Component {

  state = {
    name: '',
    uid:'',
    currentUser: {},
    messages: [],
    messagesList: [],
    phone: '',
    messageCurrentUser: ''
  }


  async componentDidMount  ()  {
    console.log(this.props)
   await database()
    .ref(`/users/${this.props.route.params.data.phone}/messages/${this.props.route.params.data.uid}/text/0/text`)
    .on('value', value => {
      this.setState(previousState => ({
        messagesCurrentUser: GiftedChat.append(previousState.messages),
        messages: [
          {
            _id: 1,
            text: value.val(),
            createdAt: new Date(),
            user: {
              _id: this.props.route.params.data.uid,
              name: this.props.route.params.data.name,
              avatar: 'https://firebasestorage.googleapis.com/v0/b/iogchat.appspot.com/o/user.png?alt=media&token=3916d464-a072-43e3-a4af-9826f83af6e9',
            },
          },
        ],
      }))
    })
    
  }
  async onSend(messages = []) {
    const user = auth().currentUser
    console.log(user)
    const id= user.uid
    let addMessage = await database()
    .ref(`/users/${user.phoneNumber}/messages/${id}`)
    .set({
      text: messages
    })
    
    
    
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    console.log(this.props)
    console.log(this.state.phone)
    return (
     
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: auth().currentUser.uid,
          }}
        />
      
    )
  }
}
