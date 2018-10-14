import { EndPoint } from '../../constants/Api.js';
import ForecastDay from './ForecastDay.js';

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

  getCoords = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('got coords: ', position.coords);

        this.setState({ latitude, longitude }, resolve);
      });
    })
  }

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
    // Set up the timer.
    this.weatherInterval = setInterval(this.fetchWeather, FOUR_HOURS);

    // Fetch the weather forecast.
    this.getCoords().then(this.fetchWeather);
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div>
        {loading
          ? <Loading color="#fff" stroke="2px" />
          : (
            <table className="weather-forecast">
              <tbody>
                {data.map((forecast) => 
                  <ForecastDay key={forecast.time} {...forecast} />
                )}
              </tbody>
            </table>
          )
        }
      </div>
    );
  }
}
