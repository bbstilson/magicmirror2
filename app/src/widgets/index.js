import Calendar from './calendar/Calendar.js';
import Clock from './clock/Clock.js';
import Compliments from './compliments/Compliments.js';
import CurrentWeather from './current_weather/CurrentWeather.js';
import NewsFeed from './news_feed/NewsFeed.js';
import Today from './today/Today.js';
import WeatherForecast from './weather_forecast/WeatherForecast.js';

import Immutable from 'immutable';

// These are loaded into the database at start up. They are keyed off of their widget_name.
// See: ./server/widgets.js
export const Widgets = Immutable.Map({
  calendar: Calendar,
  clock: Clock,
  compliments: Compliments,
  currentWeather: CurrentWeather,
  newsFeed: NewsFeed,
  today: Today,
  weatherForecast: WeatherForecast,
});
