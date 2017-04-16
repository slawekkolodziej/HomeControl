import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AirCondition from './AirCondition';

export class App extends Component {
  render () {
    return (
      <View>
        <Text>
          Home control
        </Text>

        <AirCondition />
      </View>
    )
  }
}

export default App;