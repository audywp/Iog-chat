import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({ skipPermissionRequests: true });
import ButtonComp from "../../Components/Button";
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { connect } from 'react-redux';

const Greetings = props => {
  const [Location, setLocation] = useState(false);
  useEffect(() => {
    RequestLocation();
    console.log(Location);
  }, [RequestLocation, setCurrentPos, Location]);

  const RequestLocation = useCallback(async () => {
    try {
      const status = await LocationServicesDialogBox.checkLocationServicesIsEnabled(
        {
          message:
            "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: 'YES',
          cancel: 'NO',
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
          providerListener: true,
        }
      );
      console.log(status.enabled);
      if (status.enabled) {
        setLocation(true);
      } else {
        setLocation(false);
      }
    } catch (error) {
      console.log(error);
    }
  });
  const setCurrentPos = useCallback(() => {
    if (Location) {
      Geolocation.getCurrentPosition(
        Position => console.log(Position),
        err => console.log(err),
        {
          enableHighAccuracy: false
        }
      );
      props.navigation.navigate('Login');
    } else {
      RequestLocation();
    }
  });
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-evenly",
        paddingHorizontal: 20
      }}
    >
      <View>
        <Text style={{ fontSize: 32, fontFamily: "OpenSans-Italic" }}>
          Quick
          </Text>
        <Text style={{ fontSize: 32, fontFamily: "OpenSans-Italic" }}>
          and easy
          </Text>
      </View>
      <View>
        <Image
          source={require("../../Assets/Images/chat.png")}
          style={{ width: 320, height: 280 }}
          resizeMode="contain"
          containerStyle={{ backgroundColor: "red" }}
        />
        <Text
          style={{ fontSize: 32, fontFamily: "Roboto", textAlign: "center" }}
        >
          Iog App
          </Text>
      </View>

      <View>
        <TouchableOpacity>
          <ButtonComp
            onPress={() => setCurrentPos()}
            containerStyle={{
              alignItems: "center"
            }}
            title="Take me in"
            style={{
              width: "80%",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#189A8A"
            }}
            textStyle={{
              fontSize: 16,
              fontFamily: "Roboto",
              color: "white"
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default Greetings;
