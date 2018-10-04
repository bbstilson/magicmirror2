import Position from '../../models/Position.js';
import Widget from '../../models/Widget.js';

import './Today.css';

import moment from 'moment';
import React from 'react';

export const TodayWidget = new Widget({
  name: 'Today',
  description: 'Displays the current day and date.',
  size: Position({ height: 15, width: 1.5, square: false })
});

export default () => (
  <p className="today__text">{moment().format("dddd, MMMM Do YYYY")}</p>
);
