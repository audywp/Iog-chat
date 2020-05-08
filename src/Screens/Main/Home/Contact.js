import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native'
import HeaderProf from '../../../Components/HeaderNav'
import { Thumbnail } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'



import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


export default class Contact extends Component {

    state = {
      search : '',
      users: null,
      contacts: [],
      modalVisible: false,
      phoneNumb: '',
      notFound: 'none'
    }
  

  updateSearch = search => {
    this.setState({ search })
  }

  async addContactByPhone(phone) {
    await database()
    .ref(`/users/${phone}`)
    .once('value')
    .then(snapshot=>{
      const current_user = auth().currentUser.phoneNumber
      const data = snapshot.val()
      console.log(data)
      if (data && this.state.phoneNumb.length > 1 && data.phone != current_user) {
        this.setState({
          users: data
        })
      } else {
        this.setState({
          notFound: 'User Not Found'
        })
      }
    })
  }
  async addContact(phone) {
    await database()
    .ref(`/users/${phone}`)
    .once('value')
    .then(snapshot=>{
      const current_user = auth().currentUser.phoneNumber 
      const data = snapshot.val()
      database()
      .ref(`/users/${current_user}/friend`)
      .push(data)
      this.state.contacts.push(data)
      this.setState({
        modalVisible: false
      })
    })
  }
  // async contacts () {
  //   const current_user = auth().currentUser.phoneNumber
  //   await database().ref(`/users/${current_user}/friend`)
  //   .once('value')
  //   .then(async snapshot=>{
  //     const user = await snapshot.val()
        
        
  //   })
  // }
  render() {
    const { users, phoneNumb, contacts, notFound } = this.state
    console.log(contacts)
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={()=> this.setState({modalVisible: !this.state.modalVisible})} style={styles.addContact}>
          <AntDesign name='pluscircleo' size={35} color='#189A8A' />
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          { contacts && contacts.map((contact, i) => {
            return (
              <TouchableOpacity key={ i } style={styles.chatContainer}
                onPress={()=> this.props.navigation.navigate('Chat', { data: contact })}
              >
                <View style={{ justifyContent: 'center' }}>
                    <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
                </View>
                <View style={styles.chat}>
                  <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                    <Text style={{ color: '#189A8A' }}> {contact.name} </Text>
                    <Text style={{ color: '#777' }}> {contact.phone} </Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesign name='message1' size={25} color='#189A8A' />
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
          }
          
        </ScrollView>
        <Modal
            style={ styles.centeredView }
            animationType='fade'
            visible={this.state.modalVisible }
            transparent={true}
            
          >

            <View style={ styles.centeredView }>
              <View style={ styles.modalView }>
                <Text> Enter phone number </Text>
                <View style={styles.inputField}>
                  <AntDesign name='phone' size={35} color={'#189A8A'} />
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
                      keyboardType='phone-pad'
                      dataDetectorTypes='phoneNumber'
                      maxLength={11}
                      placeholder='Phone Number'
                      placeholderTextColor='#333'
                      onChangeText={ phone => this.setState({ phoneNumb: `+62${phone}` })}
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
                  <TouchableOpacity style={styles.conditionText}
                    onPress={()=> this.setState({ modalVisible: false })}
                  >
                    <Text style={{ color: '#189A8A' }}> Cancel </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.conditionText}
                    onPress={() => this.addContactByPhone(phoneNumb)}
                  >
                    <Text style={{ color: '#189A8A' }}> Add </Text>
                  </TouchableOpacity>
                </View>
                { users !== null
                  ? <TouchableOpacity style={styles.chatContainer}
                      onPress={() => this.addContact(phoneNumb)}
                    >
                      <View style={{ justifyContent: 'center' }}>
                          <Thumbnail medium source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/iogchat.appspot.com/o/user.png?alt=media&token=3916d464-a072-43e3-a4af-9826f83af6e9' }} />
                      </View>
                      <View style={styles.chat}>
                        <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                          <Text style={{ color: '#189A8A' }}> { users.name } </Text>
                          <Text style={{ color: '#777' }}> { users.phone } </Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <AntDesign name='message1' size={25} color='#189A8A' />
                        </View>
                      </View>
                    </TouchableOpacity> 
                    :<Text style={{ paddingVertical: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#ddd', textAlign: 'center' }}>{notFound}</Text>
                    }
              </View>
            </View>
          </Modal>
      </View>
    )
  }
}

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
    flex:1,
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
    flex:1,
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
  inputField:{
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  }
})