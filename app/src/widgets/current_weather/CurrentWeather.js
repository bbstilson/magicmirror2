import { EndPoint } from '../../constants/Api.js';
import Widget from '../../models/Widget.js';
import WidgetDimension from '../../models/WidgetDimension.js';

import './CurrentWeather.css';

import axios from 'axios';
import Loading from 'react-simple-loading';
import React, { Component } from 'react';
import Skycon from 'react-skycons';

export const CurrentWeatherWidget = new Widget({
  name: 'Current Weather',
  description: 'Displays the current weather, which includes the temperature and an icon to display the current conditions.',
  size: WidgetDimension({ height: 8, square: true })
});

const FIFTEEN_MINUTES = (15 * 60 * 1000);

const DEFAULT_STATE = {
  loading: true,
  icon: '',
  temperature: 0,
  summary: 'Error'
};

type Props = {};
type State = {|
  loading: boolean,
  icon: string,
  temperature: number,
  summary: string
|};

export default class CurrentWeather extends Component<Props, State> {
  weatherInterval: IntervalID;

  state = DEFAULT_STATE

  fetchWeather = () => {
    this.setState(DEFAULT_STATE);

    // TODO: make these lat and long dynamic.
    axios.get(`${EndPoint.CURRENT_WEATHER}?lat=${37.8267}&lon=${-122.4233}`)
      .then(({ data }) => {
        const { icon, temperature, summary } = data;

        this.setState({
          icon: icon.replace(/-/g, '_').toUpperCase(), // format icons for Skycons
          temperature,
          summary,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          ...DEFAULT_STATE,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.weatherInterval = setInterval(this.fetchWeather, FIFTEEN_MINUTES);
    this.fetchWeather();
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
  }

  render() {
    const { loading, icon, temperature, summary } = this.state;

    return (
      <div>
        {loading
          ? <Loading color="#fff" stroke="2px" />
          : (
            <div className="flex--column--center current-weather">
              <div className="flex--row--center current-weather__desc">
                {/* TODO: FIX THIS SHIT */}
                <div className="current-weather__icon">
                  <Skycon icon={icon} color="white" />
                </div>
                <p className="current-weather__temp">{parseInt(temperature, 10)}°</p>
              </div>
              <p>{summary}</p>
            </div>
          )
        }
      </div>
    );
  }
}
