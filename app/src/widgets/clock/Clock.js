import moment from 'moment';
import * as React from 'react';

import './Clock.css';

type Props = {};
type State = {|
  now: number
|};

export default class Clock extends React.Component<Props, State> {
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
