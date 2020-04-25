import React,{ useState } from 'react'
import { View, Text, Modal, TextInput, StyleSheet, Image,ScrollView, TouchableOpacity } from 'react-native'

const ModalComponent = (props) => {

  const [modalVisible, setmodalVisible] = useState(false)

  return (
    <ScrollView>
    <View style={ styles.centeredView }>
      <Modal
        animationType='slide'
        visible={ props.modalVisible || modalVisible }
        transparent={true}
      >

        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <Text> {props.title} </Text>
            <View style={styles.inputField}>
              <Image source={props.source}
                style={{
                  width: 35,
                  height: 35
                }}
              />
              <TextInput
                placeholder={props.placeholder}
                placeholderTextColor='#ddd'
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
              <TouchableOpacity style={styles.conditionText}
                onPress={()=> setmodalVisible(false)}
              >
                <Text style={{ color: '#189A8A' }}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.conditionText}
                onPress={props.onpress}
              >
                <Text style={{ color: '#189A8A' }}> Save </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
    </View>
    </ScrollView>
  )
}

export default ModalComponent

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 22
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
  }
});
