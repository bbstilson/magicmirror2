import moment from 'moment';
import * as React from 'react';

import './Clock.css';

type Props = {};
type State = {|
  now: string
|};

const MOMENT_FORMAT = 'h:mm A';
const ONE_SECOND = 1000;

export default class Clock extends React.Component<Props, State> {
  clockInterval: IntervalID;

  state = {
    now: moment(Date.now()).format(MOMENT_FORMAT)
  };

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      this.setState({
        now: moment(Date.now()).format(MOMENT_FORMAT)
      });
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  render() {
    return (
      <p className="clock-widget">
        {this.state.now}
      </p>
    );
  }
}
