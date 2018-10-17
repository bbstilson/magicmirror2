import { EndPoint } from '../../constants/Api.js';
import ForecastDay from './ForecastDay.js';

import './WeatherForecast.css';

import axios from 'axios';
import { connect } from 'react-redux';
import Loading from 'react-simple-loading';
import * as React from 'react';

import type { AppState } from '../../redux/modules/index.js';

export type Forecast = {|
  icon: string,
  time: number,
  temperatureMin: number,
  temperatureMax: number
|};

type Props = {
  latitude: number,
  longitude: number,
  error: boolean,
  isFetching: boolean,
};

type State = {|
  loading: boolean,
  data: Array<Forecast>
|};

const FOUR_HOURS = (4 * 60 * 60 * 1000);

class WeatherForecast extends React.Component<Props, State> {
  weatherInterval: IntervalID;

  state = {
    loading: true,
    data: [],
  };

  fetchWeather = () => {
    this.setState({ loading: true }, () => {
      const { latitude, longitude } = this.props;

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

    if (!this.props.isFetching) {
      this.fetchWeather();
    }
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
  }

  componentWillReceiveProps({ isFetching }: Props) {
    // Coordinates have been fetched.
    if (this.props.isFetching && !isFetching) {
      this.fetchWeather();
    }
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

function mapStateToProps({
  weather: { latitude, longitude, isFetching, error }
}: AppState) {
  return {
    isFetching,
    error,
    latitude,
    longitude,
  };
}

export default connect(mapStateToProps)(WeatherForecast);
