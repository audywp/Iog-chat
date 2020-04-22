import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'

const ButtonComp = (props) => {
  return (
    <View style={props.containerStyle}>
      <Button style={props.style} onPress={props.onPress}>
        <Text style={props.textStyle}> {props.title} </Text>
      </Button>
    </View>
  )
}

export default ButtonComp

const styles = StyleSheet.create({})
