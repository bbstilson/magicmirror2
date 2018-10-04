import WidgetButton, { WidgetButtonType } from './WidgetButton.js';

import { addWidget, removeWidget } from '../../redux/modules/widgets.js';
import WidgetModel from '../../models/Widget.js';

import './Widget.css';

import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import React, { Component } from 'react';

type Props = {|
  widget: WidgetModel,
  addWidget: Function, // fix us... (widget: Widget) => any?
  removeWidget: Function, // fix us... (widget: Widget) => any?
  active: Immutable.Map<string, WidgetModel>,
  expanded: boolean,
|};

class Widget extends Component<Props> {
  addWidget = (widget: WidgetModel): void => {
    this.props.addWidget(this.props.widget);
  }

  removeWidget = (widget: WidgetModel): void => {
    this.props.removeWidget(this.props.widget);
  }

  render() {
    const { widget, active, expanded } = this.props;
    const { name, description } = widget;
    const isActive = active.has(name);

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

function mapStateToProps({ ui, widgets: { active }}) {
  return {
    expanded: ui.expanded,
    active: active
  };
}

const mapDispatchToProps = {
  addWidget,
  removeWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
