import ItemType from '../../constants/ItemType.js';
import LiveWidget from './LiveWidget.js';

import { ConnectDragPreview, ConnectDragSource, DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import React, { Component } from 'react';

import type { PositionRecord } from '../../models/Position.js';
import type Widget from '../../models/Widget.js';

type Props = {
  widget: Widget,
  position: PositionRecord,
  dimensions: {|
    width: number,
    height: number,
  |},
  connectDragSource?: ConnectDragSource,
  connectDragPreview?: ConnectDragPreview,
  isDragging?: boolean,
};

function getStyles(props: Props) {
  const { isDragging, position: { top, left }} = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

class DraggableWidget extends Component<Props> {
  componentDidMount() {
    const { connectDragPreview } = this.props;

    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview && connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  render() {
    const { connectDragSource, dimensions, widget } = this.props;

    if (!connectDragSource) {
      return null;
    }
    
    return connectDragSource(
      <div style={getStyles(this.props)}>
        <LiveWidget
            widget={widget}
            dimensions={dimensions}
        />
      </div>
    );
  }
}

const source = {
  beginDrag(props: Props) {
    return props;
  },
};

const connect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

export default DragSource(ItemType.LIVE_WIDGET, source, connect)(DraggableWidget);
