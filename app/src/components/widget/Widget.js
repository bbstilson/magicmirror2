import WidgetButton, { WidgetButtonType } from './WidgetButton.js';

import { addWidget, removeWidget } from '../../redux/modules/widgets.js';
import WidgetModel from '../../models/Widget.js';

import { connect } from 'react-redux';
import * as React from 'react';

import './Widget.css';

import type { AppState } from '../../redux/modules/index.js';
import type { AddWidget, RemoveWidget, PositionsType } from '../../redux/modules/widgets.js';

type Props = {|
  widget: WidgetModel,
  addWidget: (id: number) => AddWidget,
  removeWidget: (id: number) => RemoveWidget,
  positions: PositionsType,
  expanded: boolean,
|};

class Widget extends React.Component<Props> {
  addWidget = (): void => {
    this.props.addWidget(this.props.widget.id);
  }

  removeWidget = (): void => {
    this.props.removeWidget(this.props.widget.id);
  }

  render() {
    const { widget, positions, expanded } = this.props;
    const { id, name, description } = widget;
    const isActive = positions.get(id).active;

    return (
      <div className="widget__container">
        <div className="flex--row--center flex--space-between">
          <h3>{name}</h3>
          <div>
            <WidgetButton
              type={WidgetButtonType.ADD}
              active={isActive}
              onClick={this.addWidget}
            >
              Add
            </WidgetButton>
            <WidgetButton
              type={WidgetButtonType.REMOVE}
              active={isActive}
              onClick={this.removeWidget}
            >
              Remove
            </WidgetButton>
          </div>
        </div>
        {expanded && <p className="widget__description">{description}</p>}
      </div>
    );
  }
}

function mapStateToProps({
  ui: { expanded },
  widgets: { positions }
}: AppState) {
  return {
    positions,
    expanded,
  };
}

const mapDispatchToProps = {
  addWidget,
  removeWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
