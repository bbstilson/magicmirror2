import Widget from '../../models/Widget.js';

import './LiveWidget.css';

import React from 'react';

type Props = {|
  widget: Widget,
  dimensions: {|
    width: number,
    height: number,
  |}
|};

const LiveWidget = ({ widget, dimensions: { width, height }}: Props) => {
  const { name, size } = widget;
  const styles = {
    width: size.calculateWidth(width),
    height: size.calculateHeight(height),
  };

  return (
    <div
        className="live-widget__container flex--column--center"
        style={styles}>
      <span className="live-widget__name">{name}</span>
    </div>
  );
};

export default LiveWidget;
