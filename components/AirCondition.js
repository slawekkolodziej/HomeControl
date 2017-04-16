import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Switch,
  Slider,
  SegmentedControlIOS,
  Text
} from 'react-native';

export class AirCondition extends Component {
  modifyAc( key, value ) {
    this.setState({
      ac: {
        ...this.state.ac,
        [key]: value
      }
    });
  }

  render () {
    const {
      fan,
      mode,
      state,
      temperature,
    } = this.props;

    const isAcEnabled = state === 'on';

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
          value={ temperature }
          disabled={ !isAcEnabled }
          onValueChange={ value => this.modifyAc( 'temperature', value ) }
        />
        <SegmentedControlIOS
          disabled={ !isAcEnabled }
          values={ acModes }
          selectedIndex={ acModes.indexOf(mode) }
          onValueChange={ value => this.modifyAc( 'mode', value ) }
        />

        <Text>
          Config:{ `\n` }
          state: { `${state}\n` }
          mode: { `${mode}\n` }
          temperature: { `${temperature}\n` }
          fan: { fan }
        </Text>
      </View>
    )
  }
}

function mapStateToProps( state ) {
  return {
    state: state.airCondition.state,
    mode: state.airCondition.mode,
    temperature: state.airCondition.temperature,
    fan: state.airCondition.fan,
  };
}

export default connect(
  mapStateToProps
)(AirCondition);
