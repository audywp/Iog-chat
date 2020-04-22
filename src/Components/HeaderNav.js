import React, { Component } from 'react';
import { Text } from 'react-native';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          <Thumbnail small source={this.props.source} />
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button
            onPress={this.isLogout}
            transparent
          >
            <AntDesign color={'white'} size={20} name="plus" />
          </Button>
        </Right>
      </Endas>
    );
  }
}

export default Header;
