import ForecastDay from './ForecastDay.js';

import Widget from '../../models/Widget.js';
import { EndPoint } from '../../constants/Api.js';

import './WeatherForecast.css';

import React, { Component } from 'react';
import Loading from 'react-simple-loading';
import axios from 'axios';

export const WeatherForecastWidget = new Widget(
  "Weather Forecast",
  "Displays the weather forecast for the coming week, including an an icon to display the current conditions, the minimum temperature and the maximum temperature.",
  { width: 2, height: 4, square: false }
);

const FOUR_HOURS = (4 * 60 * 60 * 1000);
const DEFAULT_STATE = {
  loading: true,
  data: []
};

export type Forecast = {|
  icon: string,
  time: number,
  temperatureMin: number,
  temperatureMax: number
|};
type Props = {};
type State = {|
  loading: boolean,
  data: Array<Forecast>
|};


export default class WeatherForecast extends Component<Props, State> {
  weatherInterval: IntervalID;

  state = DEFAULT_STATE

  fetchWeather = () => {
    this.setState(DEFAULT_STATE);

    // TODO: make these dynamic
    axios.get(`${EndPoint.WEATHER_FORECAST}?lat=${37.8267}&lon=${-122.4233}`)
      .then(({ data }) => {
        this.setState({ data: data.data, loading: false });
      })
      .catch((err) => {
        this.setState({
          ...DEFAULT_STATE,
          loading: false
        });
      });
  }

  componentDidMount() {
    // Set up the timer.
    this.weatherInterval = setInterval(this.fetchWeather, FOUR_HOURS);

    // Fetch the weather forecast.
    this.fetchWeather();
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