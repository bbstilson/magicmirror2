import DraggableWidget from '../../../components/widget/DraggableWidget.js';

import ItemType from '../../../constants/ItemType.js';
import Widget from '../../../models/Widget.js';
import { updateWidgetPosition } from '../../../redux/modules/widgets.js';

import type { WidgetPosition } from '../../../models/Widget.js';
import type { UpdateWidgetPosition } from '../../../redux/modules/widgets.js';
import type { Map } from 'immutable';

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
import React, { Component } from 'react';

type Props = {|
  width: number,
  height: number,
  updateWidgetPosition?: (Widget, WidgetPosition) => UpdateWidgetPosition,
  active?: Map<string, Widget>,
  connectDropTarget?: ConnectDropTarget,
|};

class DraggableMirror extends Component<Props> {
  renderWidget = (widget: Widget) => {
    const { width, height } = this.props;

    return (
      <DraggableWidget
        key={widget.name}
        widget={widget}
        dimensions={{ width, height }}
      />
    );
  }

  render() {
    const { width, height, connectDropTarget, active } = this.props;

    return connectDropTarget && connectDropTarget(
      <div style={{ width, height }}>
        <div className="draggable-mirror" style={{ height }}>
          {active && active.map(this.renderWidget).toList()}
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
    { updateWidgetPosition }: Props,
    monitor: DropTargetMonitor,
    component: DraggableMirror | null,
  ) {
    if (!component) {
      return null;
    }

    const delta: { x: number, y: number } = monitor.getDifferenceFromInitialOffset();
    const { widget } = monitor.getItem();
    const { left, top } = widget.getPosition();

    updateWidgetPosition && updateWidgetPosition(widget, {
      left: Math.round(left + delta.x),
      top: Math.round(top + delta.y),
    });
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
