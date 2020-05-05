import React from 'react';
import { View } from 'react-native';
import Styles from './Styles/Styles';
import Timer from './Components/Timer';

export default class App extends React.Component {
  render() {
    return (
      <View style={Styles.appContainer}>
        <Timer />
      </View>
    );
  }
}
