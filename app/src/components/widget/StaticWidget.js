import './StaticWidget.css';

import classnames from 'classnames';
import * as React from 'react';

type Props = {|
  component: React.ComponentType<any>,
  displayModuleBorders?: boolean
|};

const StaticWidget = ({ component: Component, displayModuleBorders }: Props) => (
  <div
    className={classnames('static-component', {
      'static-component--bordered': displayModuleBorders
    })}
  >
    <Component />
  </div>
);

export default StaticWidget;
