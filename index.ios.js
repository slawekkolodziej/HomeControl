/**
 * HomeControl app
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Slider,
  Switch,
  SegmentedControlIOS,
  Button
} from 'react-native';

import { getSignedUrl } from 'aws-signing-utils';
import AWSCognito from 'react-native-aws-cognito';
import AWSConfig from './aws.json';

export default class HomeControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ac: {
        state: 'on',
        mode: 'auto',
        temperature: 22,
        fan: 0
      }
    };
  }

  componentDidMount() {
    console.log(AWSCognito);
    AWSCognito.setUserPool(
      AWSConfig.region,
      AWSConfig.identityPoolId, // Federated identity pool id
      AWSConfig.clientId, // App client ID
      AWSConfig.secret, // App client secret - leave this undefined if your app doens't use secret
      AWSConfig.userPoolId // user pool ID
    );

    AWSCognito.getSession(AWSConfig.email, AWSConfig.password)
      .then( tokens => {
        console.log('tokens:', tokens);
        return tokens;
      } )
      .then( () => AWSCognito.getCredentials(AWSConfig.email) )
      .then( (credentials) => {
        console.log('Temporary credentials:');
        console.log('accessKey', credentials.accessKey);
        console.log('secretKey', credentials.secretKey);
        console.log('sessionKey', credentials.sessionKey);

        const endpointUrl = getSignedUrl({
          method: 'GET',
          protocol: 'wss',
          canonicalUri: '/mqtt',
          service: 'iotdevicegateway',
          region: AWSConfig.region,
          secretKey: credentials.secretKey,
          accessKey: credentials.accessKey,
          sessionKey: credentials.sessionKey,
          host: AWSConfig.endpointAddress,
        });

        console.log("Signed AWS IoT url: ", endpointUrl)
      } )
      .catch( err => console.error('Error: ', err) )
  }

  modifyAc( key, value ) {
    this.setState({
      ac: {
        ...this.state.ac,
        [key]: value
      }
    });
  }

  render() {
    const { ac } = this.state;

    const isAcEnabled = ac.state === 'on';

    const acModes = [
      'auto',
      'cooling',
      'dehumidification',
      'heating',
      'fan'
    ];

    return (
      <View style={ styles.container }>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <View style={ styles.headerContainer }>
          <Text style={ styles.header }>
            HomeControl
          </Text>
        </View>

        <View style={ styles.bodyContainer }>
          <Switch
            onValueChange={ value => this.modifyAc( 'state', value ? 'on' : 'off' )}
            value={ isAcEnabled } />
          <Slider
            step={ 1 }
            minimumValue={ 18 }
            maximumValue={ 30 }
            value={ ac.temperature }
            disabled={ !isAcEnabled }
            onValueChange={ value => this.modifyAc( 'temperature', value ) }
          />
          <SegmentedControlIOS
          disabled={ !isAcEnabled }
            values={ acModes }
            selectedIndex={ acModes.indexOf(ac.mode) }
            onValueChange={ value => this.modifyAc( 'mode', value ) }
          />

          <Text>
            Config:{ `\n` }
            state: { `${ac.state}\n` }
            mode: { `${ac.mode}\n` }
            temperature: { `${ac.temperature}\n` }
            fan: { ac.fan }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#333',
    flexBasis: 60
  },
  header: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 15
  },
  bodyContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ccc',
    flex: 1
  }
});

AppRegistry.registerComponent('HomeControl', () => HomeControl);
