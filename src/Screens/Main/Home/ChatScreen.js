import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import HeaderProf from '../../../Components/HeaderNav'
import { Thumbnail } from 'native-base'
export default class Contact extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderProf
          source={require('../../../Assets/Images/person1.jpg')}
          title='Contact'
        />
        <ScrollView style={styles.container}>
          <View style={styles.chatContainer}>
            <View style={{ justifyContent: 'center' }}>
                <Thumbnail medium source={require('../../../Assets/Images/person1.jpg')} />
            </View>
            <View style={styles.chat}>
              <View style={{ marginLeft: 20 }}>
                <Text> Audywp </Text>
                <Text style={{ marginTop: 6 }}> hallo there </Text>
              </View>
              <Text> 10.35 PM </Text>
            </View>
          </View>
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
    height: 80,
    marginBottom: 10
  },
  chat: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }
})