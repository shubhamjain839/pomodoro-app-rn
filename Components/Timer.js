import React from 'react';
import { Button, View, Text, Vibration } from 'react-native';
import Styles from '../Styles/Styles';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: this.props.time.min,
      sec: this.props.time.sec,
      status: 'Work Time',
      toggle: true,
      pauseToggele: true
    };
  }
  componentDidMount() {
    this.interval = setInterval(this.dec, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  resume = () => {
    this.interval = setInterval(this.dec, 1000);
    this.setState((prev) => ({
      pauseToggele: !prev.pauseToggele
    }));
  };
  pause = () => {
    clearInterval(this.interval);
    this.setState((prev) => ({
      pauseToggele: !prev.pauseToggele
    }));
  };
  checkToggle = () => {
    this.state.toggle
      ? this.setState({
          min: this.props.time.min,
          sec: this.props.time.sec,
          status: 'Work Time',
          toggle: this.state.toggle,
          pauseToggele: this.state.pauseToggele
        })
      : this.setState({
          min: this.props.time.min,
          sec: this.props.time.sec,
          status: 'Break Time',
          toggle: this.state.toggle,
          pauseToggele: this.state.pauseToggele
        });
  };
  dec = () => {
    if (this.state.min === 0 && this.state.sec === 0) {
      Vibration.vibrate([500, 500, 500]);
      this.setState((prevState) => ({
        toggle: !prevState.toggle
      }));
      this.checkToggle();
    } else if (this.state.sec === 0)
      this.setState((prevState) => ({
        min: prevState.min - 1,
        sec: 59
      }));
    else {
      this.setState((prevState) => ({
        sec: prevState.sec - 1
      }));
    }
  };
  render() {
    return (
      <View>
        <Text style={Styles.font}>{this.state.status}</Text>
        <Text style={Styles.font}>
          {this.state.min}:{this.state.sec}
        </Text>
        {this.state.pauseToggele ? (
          <Button title='Pause' onPress={this.pause} />
        ) : (
          <Button title='Resume' onPress={this.resume} />
        )}
      </View>
    );
  }
}
export default class Timer extends React.Component {
  state = {
    time: {
      min: 0,
      sec: 0
    },
    toggle: true
  };

  inctime = () => {
    this.setState({
      time: {
        min: this.state.time.min + 1,
        sec: 0
      },
      toggle: this.state.toggle
    });
  };
  dectime = () => {
    if (this.state.time.min > 0)
      this.setState({
        time: {
          min: this.state.time.min - 1,
          sec: 0
        },
        toggle: this.state.toggle
      });
  };
  toggleChange = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }));
  };
  render() {
    return (
      <View>
        {this.state.toggle ? (
          <View>
            <Text style={Styles.font}>Work Time</Text>
            <Button title='Start' onPress={this.toggleChange} />
            <Text style={Styles.font}>
              {this.state.time.min}:{this.state.time.sec}
            </Text>
            <Button title='Inc Timmer' onPreatss={this.inctime} />
            <Button title='Dec Timmer' onPress={this.dectime} />
          </View>
        ) : (
          <View>
            <Button title='Reset' onPress={this.toggleChange} />
            <Time time={this.state.time} />
          </View>
        )}
      </View>
    );
  }
}
