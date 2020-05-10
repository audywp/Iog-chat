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
    return (
      <>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: auth().currentUser.uid,
          }}
        />
      </>
    )
  }
}
