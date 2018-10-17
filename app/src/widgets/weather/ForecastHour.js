import moment from 'moment';
import * as React from 'react';
import Skycon from 'react-skycons';

import type { ForecastHourType } from './HourlyForecast.js';

export default class ForecastHour extends React.Component<ForecastHourType> {
  render() {
    const { icon, time, precipProbability, temperature } = this.props;

    return (
      <tr>
        <td className="hourly-forecast__data hour">{moment.unix(time).format('h A')}</td>
        <td className="hourly-forecast__data hourly-forecast__icon">
          <Skycon icon={icon} color="white" />
        </td>
        <td className="hourly-forecast__data">{parseInt(precipProbability, 10)}%</td>
        <td className="hourly-forecast__data">{parseInt(temperature, 10)}°</td>
      </tr>
    );
  }
}
