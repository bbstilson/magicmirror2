import WidgetPosition from '../../models/WidgetPosition.js';

import classnames from 'classnames';
import * as React from 'react';

import './StaticWidget.css';

type Props = {|
  component: React.ComponentType<any>,
  displayModuleBorders?: boolean,
  position: WidgetPosition,
|};

const StaticWidget = ({ component: Component, position, displayModuleBorders }: Props) => {
  const classes = classnames({
    'static-widget': true,
    'static-widget--bordered': displayModuleBorders
  });
  return (
    <div
      style={position}
      className={classes}
    >
      <Component />
    </div>
  );
}

export default StaticWidget;
