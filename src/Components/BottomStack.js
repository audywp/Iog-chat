import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  View,
  Image
} from 'react-native';
import Contact from "../Screens/Main/Home/Contact";
import HeaderNav from '../Components/HeaderNav';
import Maps from '../Screens/Main/Maps';
import { checkConnection, unsubscribe } from '../Utils/config';
import { getDataUser, getUserPos } from '../Redux/Actions/User/CurentPos';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTabs = createBottomTabNavigator();

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const BottomStack = props => {
  const [conn, setConn] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkConnection(callback => {
      if (callback) {
        setConn(true);
      } else {
        setConn(false);
      }
    });
    props.getDataUser();
    props.getUserPos();
    unsubscribe();
  }, [conn, refreshing]);

  const onRefresh = React.useCallback(() => {
    checkConnection(callback => {
      if (callback) {
        setConn(true);
      } else {
        setConn(false);
      }
    });
    setRefreshing(true);

    wait(200).then(() => setRefreshing(false));
  }, []);

  const ProfileNav = () => {
    props.navigation.navigate('Profile');
  };
  if (conn) {
    return (
      <>
        <HeaderNav onpress={ProfileNav} />
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            name="Contact"
            component={Contact}
            options={{
              tabBarLabel: () => <Text style={{ display: 'none' }} />,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="contacts" size={25} color="#189A8A" />
              )
            }}
          />
          {/* <BottomTabs.Screen tabBarVisible = {false}  name="Chat" component={ChatScreen} options={{
            tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name='chat-bubble-outline' size={25} color='#189A8A' />
            )
          }} /> */}
          <BottomTabs.Screen
            name="Maps"
            component={Maps}
            options={{
              tabBarVisible: false,
              tabBarLabel: () => <Text style={{ display: 'none' }} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="google-maps"
                  size={25}
                  color="#189A8A"
                />
              )
            }}
          />
        </BottomTabs.Navigator>
      </>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#189A8A"
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
          />
        }
      >
        <View style={styles.noConnection}>
          <Image
            style={{ height: 250, marginBottom: 10 }}
            source={require('../Assets/svg/nosignal.png')}
            resizeMode="contain"
          />
          <Text style={styles.Text}>
            Seems like your internet is disconnected,
          </Text>
          <Text style={styles.Text}>
            Try to connect your internet, then refresh this page
          </Text>
        </View>
      </ScrollView>
    );
  }
};
const styles = StyleSheet.create({
  noConnection: {
    flex: 1,
    height: Dimensions.get("window").height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  Text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  return {
    profile: state.Profile
  };
};

export default connect(
  mapStateToProps,
  { getDataUser, getUserPos }
)(BottomStack);
