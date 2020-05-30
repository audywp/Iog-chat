import NetInfo from "@react-native-community/netinfo";

export const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

export const checkConnection = callback => {
  if (Platform.OS === 'android') {
    NetInfo.fetch().then(state => {
      console.log(state.isConnected)
      if (state.isConnected) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
};