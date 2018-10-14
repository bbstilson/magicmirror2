import WidgetPosition from '../../models/WidgetPosition.js';

import classnames from 'classnames';
import * as React from 'react';

import './StaticWidget.css';

type Props = {|
  component: any, // TODO: fix this... React.Node should be right type but flow is _very_ upset
  displayWidgetBorders: boolean,
  position: WidgetPosition,
|};

const StaticWidget = ({ component: Component, position, displayWidgetBorders }: Props) => {
  const classes = classnames({
    'static-widget': true,
    'static-widget--bordered': displayWidgetBorders
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
