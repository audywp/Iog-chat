import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Thumbnail,
  Header as Endas,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Button,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    profile: state.Profile
  }
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <Endas
        style={{
          backgroundColor: '#189A8A'
        }}
      >
        <Left>
          <Thumbnail small source={{uri: this.props.profile.user.data && this.props.profile.user.data.picture}} />
        </Left>
        <Body>
          <Title>{this.props.profile.user.data && this.props.profile.user.data.name}</Title>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={this.props.onpress}
            transparent
          >
            <MaterialCommunityIcons color={'white'} size={20} name="dots-vertical" />
          </TouchableOpacity>
        </Right>
      </Endas>
    );
  }
}

export default connect(mapStateToProps) (Header);
