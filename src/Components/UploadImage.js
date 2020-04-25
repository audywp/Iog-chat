// import React, {Component} from 'react';
// import {Text, View, ScrollView, StyleSheet, Platform, Image, TouchableOpacity} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// // import storage from '@react-native-firebase/storage';

// class UploadImage extends Component {
//   state = {
//     uri: 'https://firebasestorage.googleapis.com/v0/b/iogchat.appspot.com/o/user.png?alt=media&token=3916d464-a072-43e3-a4af-9826f83af6e9',
//     upload: true,
//     image: '',
//   };
//   //Handle Choose Picture
//   choosePicture = () => {
//     var options = {
//       quality: 0.7,
//       mediaType: 'photo',
//       noData: true,
//       allowsEditing: true,
//       storageOptions: {
//         waitUntilSaved: true,
//         path: 'images',
//         cameraRoll: true,
//       },
//     };
//     ImagePicker.showImagePicker(options, response => {
//       console.log('Response = ', response);
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         console.log(response.fileName);
//         this.setState({
//           upload: true,
//           image: {
//             name: response.fileName,
//             type: response.type,
//             size: response.fileSize,
//             uri:
//               Platform.OS === 'android'
//                 ? response.uri
//                 : response.uri.replace('file://', ''),
//           },
//         });
//       }
//     });
//   };

//   uriToBlob = uri => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function() {
//         resolve(xhr.response);
//       };

//       xhr.onerror = function() {
//         reject(new Error('Error on upload image'));
//       };

//       xhr.responseType = 'blob';
//       xhr.open('GET', uri, true);
//       xhr.send(null);
//     });
//   };

//   uploadPicture = async () => {
//     console.log('mulai upload');
//   };

//   render() {
//     return (
//       <ScrollView>
//         <View style= {{
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop :20
//           }}>
//             <Image source={{ uri: this.state.uri }} style= {{
//               width:150, height: 150 , borderRadius: 90
//             }} />
//             <View
//               style={{
//                 backgroundColor: '#189A8A',
//                 width: 40, 
//                 height: 40,
//                 borderRadius: 30,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 position: "absolute",
//                 bottom: 0,
//                 right: 95
//               }}
//             >
//               <TouchableOpacity
//                 onPress={this.choosePicture}
//               >
//                 <Image source={require('../Assets/Images/photograph.png')}
//                   style={{
//                     width: 25,
//                     height: 25
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//       </ScrollView>
//     );
//   }
// }

// const localStyle = StyleSheet.create({
//   iconBox: {
//     width: 73,
//     alignItems: 'center',
//     padding: 5,
//   },
//   iconDesc: {fontSize: 11, alignItems: 'center'},
// });

// export default UploadImage;