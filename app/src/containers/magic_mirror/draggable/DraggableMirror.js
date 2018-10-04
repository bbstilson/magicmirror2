import DraggableWidget from '../../../components/widget/DraggableWidget.js';

import ItemType from '../../../constants/ItemType.js';
import Position from '../../../models/Position.js';
import Widget from '../../../models/Widget.js';
import { updateWidgetPosition } from '../../../redux/modules/widgets.js';

import type { UpdateWidgetPosition } from '../../../redux/modules/widgets.js';
import type { PositionRecord } from '../../../models/Position.js';
import type { WidgetPositionRecord } from '../../../models/WidgetPosition.js';

import './DraggableMirror.css';

import { connect } from 'react-redux';
import {
  ConnectDropTarget,
  DragDropContext,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as Immutable from 'immutable';
import React, { Component } from 'react';

type Props = {|
  width: number,
  height: number,
  updateWidgetPosition?: (Widget, PositionRecord) => UpdateWidgetPosition,
  active?: Immutable.Map<string, WidgetPositionRecord>,
  connectDropTarget?: ConnectDropTarget,
|};

class DraggableMirror extends Component<Props> {
  render(): React$Node {
    const { width, height, connectDropTarget, active } = this.props;

    if (!connectDropTarget) {
      return null;
    }

    return connectDropTarget(
      <div style={{ width, height }}>
        <div className="draggable-mirror" style={{ height }}>
          {active && active.map((widgetPosition: WidgetPositionRecord) => {
            const { widget, position } = widgetPosition;

            return (
              <DraggableWidget
                key={widget.name}
                widget={widget}
                position={position}
                dimensions={{ width, height }}
              />
            );
          }).toList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ widgets: { active }}) {
  return {
    active,
  };
}

const mirrorTarget = {
  drop(
    { updateWidgetPosition, active }: Props,
    monitor: DropTargetMonitor,
    component: DraggableMirror | null,
  ) {
    if (!component) {
      return null;
    }

    if (!active) {
      return null;
    }

    const delta: { x: number, y: number } = monitor.getDifferenceFromInitialOffset();
    const { widget } = monitor.getItem();
    const { left, top } = active.get(widget.name).position;

    updateWidgetPosition && updateWidgetPosition(widget, Position({
      left: Math.round(left + delta.x),
      top: Math.round(top + delta.y),
    }));
  },
};

function connector (connect: DropTargetConnector) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export default connect(mapStateToProps, { updateWidgetPosition })(
  DragDropContext(HTML5Backend)(
    DropTarget(ItemType.LIVE_WIDGET, mirrorTarget, connector)(
      DraggableMirror
    )
  )
);
