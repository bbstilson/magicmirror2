import './Today.css';

import moment from 'moment';
import React from 'react';

export default () => (
  <p className="today__text">{moment().format("dddd, MMMM Do YYYY")}</p>
);
