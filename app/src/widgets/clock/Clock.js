import Position from '../../models/Position.js';
import Widget from '../../models/Widget.js';

import './Clock.css';

import moment from 'moment';
import React, { Component } from 'react';

export const ClockWidget = new Widget({
  name: 'Clock',
  description: 'Displays the current time.',
  size: Position({ width: 4, height: 15, square: false })
});

type Props = {};
type State = {|
  now: number
|};

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
      <p className="clock-widget">
        {moment(this.state.now).format('h:mm:ss A')}
      </p>
    );
  }
}
