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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { getDataProfile } from '../Redux/Actions/User/Profile'

const mapStateToProps = state => {
  return {
    profile: state.Profile,
    register: state.Register
  }
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { uri: 'https://firebasestorage.googleapis.com/v0/b/iogchat-b5496.appspot.com/o/chatapp.png?alt=media&token=9a588acc-d2eb-4203-8ae2-6581922d5199' },
    };

  }
  async componentDidMount() {
    try {
      await this.props.getDataProfile(
        this.props.register.phone,
        callback => {
          if (callback) {
            this.setState({
              image: { uri: this.props.profile.user.data.picture },
              name:
                this.props.profile.user && this.props.profile.user.data.name,
              status:
                this.props.profile.user && this.props.profile.user.data.status,
            });
          } else {
            this.setState({
              name: auth().currentUser.displayName === null ? 'Anonymous' : auth().currentUser.displayName,
              status: 'Available',
              btnTitle: 'Create'
            });
          }
          if (!this.props.isLoading) {
            this.setState({
              loading: true,
              placeholder: true,
            });
          }
        }
      );
      if (this.props.isLoading) {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Endas
        style={{
          backgroundColor: '#189A8A'
        }}
      >
        <Left>
          <TouchableOpacity onPress={this.props.onPress}>
            <Thumbnail small source={this.props.profile.user !== null ? { uri: this.props.profile.user.data.picture } : this.state.image} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{this.props.profile.user !== null ? this.props.profile.user.data.name : 'Anonymous'}</Title>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={this.props.onpress}
            transparent
          >
            <AntDesign color={'white'} size={20} name="plus" />
          </TouchableOpacity>
        </Right>
      </Endas>
    );
  }
}

export default connect(mapStateToProps, { getDataProfile })(Header);
