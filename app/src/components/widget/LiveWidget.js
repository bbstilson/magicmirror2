import Widget from '../../models/Widget.js';
import { positionAndDimensionsToStyles } from '../../utils/styles.js';

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
  const computedHeight = size.calculateHeightFrom(height);
  const styles = positionAndDimensionsToStyles({
    width: size.square ? computedHeight : size.calculateWidthFrom(width),
    height: computedHeight,
  });

  return (
    <div
        className="live-widget__container flex--column--center"
        style={styles}>
      <span className="live-widget__name">{name}</span>
    </div>
  );
};

export default LiveWidget;
