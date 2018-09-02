import './HalfPane.css';

import * as React from 'react';
import classnames from 'classnames';

type Props = {|
  children: React.Node,
  border?: boolean
|};

const HalfPane = ({ children, border } : Props) => (
  <div className={classnames('halfpane', { 'halfpane--border': border })}>
    {children}
  </div>
);

export default HalfPane;
