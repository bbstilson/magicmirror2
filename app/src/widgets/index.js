import Calendar, { CalendarWidget } from './calendar/Calendar.js';
import Clock, { ClockWidget } from './clock/Clock.js';
import Compliments, { ComplimentsWidget } from './compliments/Compliments.js';
import CurrentWeather, { CurrentWeatherWidget } from './current_weather/CurrentWeather.js';
import NewsFeed, { NewsFeedWidget } from './news_feed/NewsFeed.js';
import Today, { TodayWidget } from './today/Today.js';
import WeatherForecast, { WeatherForecastWidget } from './weather_forecast/WeatherForecast.js';

import Immutable from 'immutable';

export const WidgetModels = Immutable.List.of(
  CalendarWidget,
  ClockWidget,
  ComplimentsWidget,
  CurrentWeatherWidget,
  NewsFeedWidget,
  TodayWidget,
  WeatherForecastWidget,
);

export const Widgets = Immutable.Map({
  [CalendarWidget.name]:        Calendar,
  [ClockWidget.name]:           Clock,
  [ComplimentsWidget.name]:     Compliments,
  [CurrentWeatherWidget.name]:  CurrentWeather,
  [NewsFeedWidget.name]:        NewsFeed,
  [TodayWidget.name]:           Today,
  [WeatherForecastWidget.name]: WeatherForecast,
});
