/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
  SegmentedControlIOS
} from 'react-native';

import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';

AWS.config.region = 'eu-west-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: conf.AWS_POOL_ID
});

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
    this.mqttClient = AWSMqtt.connect({
      WebSocket: WebSocket,
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: conf.MQTT_ENDPOINT,
      clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)), // clientId to register with MQTT broker. Need to be unique per client
    });
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
