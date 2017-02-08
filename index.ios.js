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
