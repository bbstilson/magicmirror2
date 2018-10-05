import Widget from '../../models/Widget.js';
import WidgetDimension from '../../models/WidgetDimension.js';

import './Today.css';

import moment from 'moment';
import React from 'react';

export const TodayWidget = new Widget({
  name: 'Today',
  description: 'Displays the current day and date.',
  size: WidgetDimension({ height: 15, width: 1.5, square: false })
});

export default () => (
  <p className="today__text">{moment().format("dddd, MMMM Do YYYY")}</p>
);
