import { EndPoint } from '../../constants/Api.js';
import ForecastDay from './ForecastDay.js';
import { getCoords } from './weather_forecast_utils.js';

import './WeatherForecast.css';

import axios from 'axios';
import Loading from 'react-simple-loading';
import * as React from 'react';

export type Forecast = {|
  icon: string,
  time: number,
  temperatureMin: number,
  temperatureMax: number
|};

type Props = {};

type State = {|
  latitude: number,
  longitude: number,
  loading: boolean,
  data: Array<Forecast>
|};

const FOUR_HOURS = (4 * 60 * 60 * 1000);

export default class WeatherForecast extends React.Component<Props, State> {
  weatherInterval: IntervalID;

  state = {
    loading: true,
    data: [],
    latitude: 0,
    longitude: 0,
  };

  fetchWeather = () => {
    this.setState({ loading: true }, () => {
      const { latitude, longitude } = this.state;

      axios.get(`${EndPoint.WEATHER_FORECAST}?lat=${latitude}&lon=${longitude}`)
        .then(({ data }) => {
          this.setState({
            loading: false,
            data: data.data.map(({ icon, ...rest }) => ({
              icon: icon.replace(/-/g, '_').toUpperCase(), // format icons for Skycons
              ...rest
            })),
          });
        })
        .catch((err) => {
          this.setState({
            data: [],
            loading: false
          });
        });
    });
  }

  componentDidMount() {
    this.weatherInterval = setInterval(this.fetchWeather, FOUR_HOURS);

    getCoords()
      .then((coords) => {
        this.setState(coords, this.fetchWeather);
      });
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
  }

  render() {
    const { loading, data } = this.state;

    if (loading) {
      return <Loading color='#fff' stroke='2px' />;
    }

    return (
      <table className="weather-forecast">
        <tbody>
          {data.map((forecast) => 
            <ForecastDay key={forecast.time} {...forecast} />
          )}
        </tbody>
      </table>
    );
  }
}
