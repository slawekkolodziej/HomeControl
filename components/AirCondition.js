import React, { Component } from 'react';
import {
  View,
  Switch,
  Slider,
  SegmentedControlIOS,
  Text
} from 'react-native';

export class AirCondition extends Component {
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

  render () {
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
      <View>
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
    )
  }
}

export default AirCondition;