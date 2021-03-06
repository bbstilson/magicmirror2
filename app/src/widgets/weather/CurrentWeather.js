import { EndPoint } from '../../constants/Api.js';

import './CurrentWeather.css';

import axios from 'axios';
import { connect } from 'react-redux';
import Loading from 'react-simple-loading';
import * as React from 'react';
import Skycon from 'react-skycons';

import type { AppState } from '../../redux/modules/index.js';

const FIFTEEN_MINUTES = (15 * 60 * 1000);

type Props = {
  latitude: number,
  longitude: number,
  error: boolean,
  isFetching: boolean,
};

type State = {|
  loading: boolean,
  icon: string,
  temperature: number,
  summary: string,
|};

class CurrentWeather extends React.Component<Props, State> {
  weatherInterval: IntervalID;

  state = {
    loading: true,
    icon: '',
    temperature: 0,
    summary: '',
  };

  fetchWeather = () => {
    this.setState({ loading: true }, () => {
      const { latitude, longitude } = this.props;

      axios.get(`${EndPoint.CURRENT_WEATHER}?lat=${latitude}&lon=${longitude}`)
        .then(({ data }) => {
          const { icon, temperature, summary } = data;

          this.setState({
            summary,
            temperature,
            icon: icon.replace(/-/g, '_').toUpperCase(), // format icons for Skycons
            loading: false,
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

export default connect(mapStateToProps)(CurrentWeather);
