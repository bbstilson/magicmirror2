import Module from '../../models/Module.js';

import './Today.css';

import moment from 'moment';
import React from 'react';

export const TodayModule = new Module(
  "Today",
  "Displays the current day and date.",
  { height: 10, width: 3, square: false },
  { height: 15, width: 1.5, square: false }
);

export default () => (
  <p className="today__text">{moment().format("dddd, MMMM Do YYYY")}</p>
);
