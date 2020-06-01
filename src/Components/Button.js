import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Spinner } from 'native-base'


const ButtonComp = (props) => {
  return (
    <View style={props.containerStyle}>
      <Button
        disabled={props.disabled}
        style={props.style}
        onPress={props.onPress}>
        {props.loading ? <Spinner color='white' style={{ flex: 1 }} />
          : <Text style={props.textStyle}> {props.title} </Text>
        }

      </Button>
    </View>
  )
}

export default ButtonComp

const styles = StyleSheet.create({})
