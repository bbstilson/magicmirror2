import Module from '../../models/Module';

import './Clock.css';

import moment from 'moment';
import React, { Component } from 'react';

export const ClockModule = new Module(
  "Clock",
  "Displays the current time.",
  { width: 6, height: 10, square: false },
  { width: 4, height: 15, square: false }
);

type Props = {}
type State = {
  now: number
}

export default class Clock extends Component<Props, State> {
  clockInterval: IntervalID;

  state = {
    now: Date.now()
  }

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      this.setState({
        now: Date.now()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  render() {
    return (
      <p className="clock-module">
        {moment(this.state.now).format('h:mm:ss A')}
      </p>
    );
  }
}
