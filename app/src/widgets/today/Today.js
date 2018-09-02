import Widget from '../../models/Widget.js';

import './Today.css';

import moment from 'moment';
import React from 'react';

export const TodayWidget = new Widget(
  "Today",
  "Displays the current day and date.",
  { height: 15, width: 1.5, square: false }
);

export default () => (
  <p className="today__text">{moment().format("dddd, MMMM Do YYYY")}</p>
);
