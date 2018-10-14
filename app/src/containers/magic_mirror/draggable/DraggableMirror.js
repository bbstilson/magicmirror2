import DraggableWidget from '../../../components/widget/DraggableWidget.js';

import ItemType from '../../../constants/ItemType.js';
import Position from '../../../models/Position.js';
import { updateWidgetPosition } from '../../../redux/modules/widgets.js';

import { connect } from 'react-redux';
import {
  ConnectDropTarget,
  DragDropContext,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as React from 'react';

import './DraggableMirror.css';

import type { AppState } from '../../../redux/modules/index.js';
import type { PositionsType, UpdateWidgetPosition } from '../../../redux/modules/widgets.js';
import type { PositionRecord } from '../../../models/Position.js';

type Props = {|
  width: number,
  height: number,
  updateWidgetPosition: (id: number, position: PositionRecord) => UpdateWidgetPosition,
  positions: PositionsType,
  connectDropTarget: ConnectDropTarget,
|};

class DraggableMirror extends React.Component<Props> {
  render(): React$Node {
    const { width, height, connectDropTarget, positions } = this.props;

    return connectDropTarget(
      <div style={{ width, height }}>
        <div className="draggable-mirror" style={{ height }}>
          {positions
              .valueSeq()
              .filter(({ active }) => active)
              .map(({ widget, position }) => (
                <DraggableWidget
                  key={widget.id}
                  widget={widget}
                  position={position}
                  dimensions={{ width, height }}
                />
              ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ widgets: { positions }}: AppState) {
  return {
    positions,
  };
}

const mirrorTarget = {
  drop(
    { updateWidgetPosition, positions }: Props,
    monitor: DropTargetMonitor,
    component: DraggableMirror | null,
  ) {
    const delta: { x: number, y: number } = monitor.getDifferenceFromInitialOffset();
    const { widget } = monitor.getItem();
    const { left, top } = positions.get(widget.id).position;

    updateWidgetPosition && updateWidgetPosition(widget.id, Position({
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
