import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import HeaderProf from '../../../Components/HeaderNav'
import { Thumbnail } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default class Contact extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderProf
          source={require('../../../Assets/Images/person1.jpg')}
          title='Contact'
        />
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ justifyContent: 'space-evenly', marginLeft: 20 }}>
                <Text style={{ color: '#189A8A' }}> Audywp </Text>
                <Text style={{ color: '#777' }}> +6281281043299 </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <AntDesign name='message1' size={25} color='#189A8A' />
              </View>
            </View>
          </TouchableOpacity>

        </ScrollView>
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
    marginBottom: 40
  },
  chat: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }
})