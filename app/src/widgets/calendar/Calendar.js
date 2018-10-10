import './Calendar.css';

import React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';

function createWeeks(now) {
  const start = now.startOf('month');
  const month = now.month();

  // potentially 6 "weeks" in a month
  return [0,0,0,0,0,0]
    .map((_) => {
      // 7 days per week
      return [0,0,0,0,0,0,0]
        .map((_, idx) => {
          if (idx === start.day()) {
            if (start.month() === month) {
              const date = start.date();
              start.add(1, 'd');
              return date;
            } else {
              // There are days in the week left, but they're not part of this month, e.g., 31st
              // is on a Tuesday, we still need to add enough days.
              return null;
            }
          } else {
            // There are days in the week before this month has started, e.g., Monday is the 31st
            // of last month, and this month starts on a Tuesday.
            // prevWeek.subtract(1, 'd');
            // return prevWeek.date();
            return null;
          }
        });
    });
}

const DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ONE_MINUTE = (1000 * 60);
const MIDNIGHT = "0:00:00";

type Props = {};
type State = {|
  now: moment
|};

export default class Calendar extends Component<Props, State> {
  dayInterval: IntervalID;

  state = {
    now: moment(new Date())
  }

  componentDidMount() {
    this.dayInterval = setInterval(() => {
      const now = moment(new Date());

      if (now.format('H:mm:ss') === MIDNIGHT) {
        this.setState({ now });
      }
    }, ONE_MINUTE);
  }

  componentWillUnmount() {
    clearInterval(this.dayInterval);
  }

  render () {
    const { now } = this.state;
    const today = now.date();
    const weeks = createWeeks(now);
    const month = now.subtract(1, 'M').format('MMMM');

    return (
      <table className="calendar">
        <tbody>
          <tr className="calendar__month"><td colSpan={7}>{month}</td></tr>
          <tr className="calendar__header">
            {DAYS_OF_THE_WEEK.map((day) => (
              <td className='calendar__cell' key={day}>{day}</td>
            ))}
          </tr>
            {weeks.map((week, idx) => (
              <tr key={idx}>{
                week.map((day, wIdx) => (
                  <td
                    className={classnames('calendar__cell', { 'active': today === day })}
                    key={`${day === null ? 'null' : day}-${wIdx}`}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}
