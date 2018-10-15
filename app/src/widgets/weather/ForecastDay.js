import moment from 'moment';
import * as React from 'react';
import Skycon from 'react-skycons';

import type { Forecast } from './WeatherForecast.js';

export default class ForecastDay extends React.Component<Forecast> {
  render() {
    const { icon, time, temperatureMin, temperatureMax } = this.props;

    return (
      <tr>
        <td className="weather-forecast__data">{moment.unix(time).format('ddd')}</td>
        <td className="weather-forecast__data weather-forecast__icon">
          <Skycon icon={icon} color="white" />
        </td>
        <td className="weather-forecast__data">{parseInt(temperatureMax, 10)}°</td>
        <td className="weather-forecast__data">{parseInt(temperatureMin, 10)}°</td>
      </tr>
    );
  }
}
