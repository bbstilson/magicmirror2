import { EndPoint } from '../../constants/Api.js';
import ForecastHour from './ForecastHour.js';

import './HourlyForecast.css';

import axios from 'axios';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import Loading from 'react-simple-loading';
import * as React from 'react';

import type { AppState } from '../../redux/modules/index.js';

export type ForecastHourType = {|
  time: number,
  summary: string,
  icon: string,
  precipIntensity: number,
  precipProbability: number,
  temperature: number,
  apparentTemperature: number,
  dewPoint: number,
  humidity: number,
  pressure: number,
  windSpeed: number,
  windBearing: number,
  cloudCover: number,
  uvIndex: number,
  visibility: number,
|};

type Props = {
  latitude: number,
  longitude: number,
  isFetching: boolean,
  error: boolean,
};

type State = {|
  loading: boolean,
  data: Immutable.List<ForecastHourType>
|};

const ONE_HOUR = (1 * 60 * 60 * 1000);
const HOURS_TO_DISPLAY = 8;

class HourlyForecast extends React.Component<Props, State> {

  weatherInterval: IntervalID;

  state = {
    loading: true,
    data: Immutable.List(),
  };

  fetchWeather = () => {
    this.setState({ loading: true }, () => {
      const { latitude, longitude } = this.props;

      axios.get(`${EndPoint.HOURLY_FORECAST}?lat=${latitude}&lon=${longitude}`)
        .then(({ data }) => {
          const fixedData = data.data.map(({ icon, ...rest }) => ({
            icon: icon.replace(/-/g, '_').toUpperCase(), // format icons for Skycons
            ...rest
          }));

          this.setState({
            loading: false,
            data: Immutable.List(fixedData).take(HOURS_TO_DISPLAY),
          });
        })
        .catch((err) => {
          this.setState({
            data: Immutable.List(),
            loading: false
          });
        });
    });
  }

  componentDidMount() {
    this.weatherInterval = setInterval(this.fetchWeather, ONE_HOUR);

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
      <table className="hourly-forecast">
        <tbody>
          {data.map((hour) => (
            <ForecastHour key={hour.time} {...hour} />
          ))}
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

export default connect(mapStateToProps)(HourlyForecast);
