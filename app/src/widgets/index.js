import Calendar from './calendar/Calendar.js';
import Clock from './clock/Clock.js';
import Compliments from './compliments/Compliments.js';
import CurrentWeather from './weather/CurrentWeather.js';
import HourlyForecast from './weather/HourlyForecast.js';
import NewsFeed from './news_feed/NewsFeed.js';
import Today from './today/Today.js';
import WeatherForecast from './weather/WeatherForecast.js';

// These are loaded into the database at start up. They are keyed off of their `name`.
// See: ./server/widgets.js
export function getWidgetToDisplay(name: string) {
  switch(name) {
    case 'Calendar': return Calendar;
    case 'Clock': return Clock;
    case 'Compliments': return Compliments;
    case 'Current Weather': return CurrentWeather;
    case 'Hourly Forecast': return HourlyForecast;
    case 'News Feed': return NewsFeed;
    case 'Today': return Today;
    case 'Weather Forecast': return WeatherForecast;
    default: {
      console.error('Attempted to render a widget that did not match:', name);
      return null;
    }
  }
}
