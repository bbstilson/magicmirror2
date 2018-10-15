import { EndPoint } from '../../constants/Api.js';

import './CurrentWeather.css';

import axios from 'axios';
import Loading from 'react-simple-loading';
import * as React from 'react';
import Skycon from 'react-skycons';

const FIFTEEN_MINUTES = (15 * 60 * 1000);

type Props = {};

type State = {|
  loading: boolean,
  icon: string,
  temperature: number,
  summary: string,
  latitude: number,
  longitude: number,
|};

export default class CurrentWeather extends React.Component<Props, State> {
  weatherInterval: IntervalID;

  state = {
    loading: true,
    icon: '',
    temperature: 0,
    summary: '',
    latitude: 0,
    longitude: 0,
  };

  getCoords = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude }, resolve);
      });
    })
  }

  fetchWeather = () => {
    this.setState({ loading: true }, () => {
      const { latitude, longitude } = this.state;

      axios.get(`${EndPoint.CURRENT_WEATHER}?lat=${latitude}&lon=${longitude}`)
        .then(({ data }) => {
          const { icon, temperature, summary } = data;

          this.setState({
            icon: icon.replace(/-/g, '_').toUpperCase(), // format icons for Skycons
            temperature,
            summary,
            loading: false
          });
        })
        .catch((error) => {
          console.error(error)
          this.setState({
            loading: false,
            summary: 'ERROR'
          });
        });
    });

  }

  componentDidMount() {
    this.weatherInterval = setInterval(this.fetchWeather, FIFTEEN_MINUTES);

    this.getCoords().then(this.fetchWeather);
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
