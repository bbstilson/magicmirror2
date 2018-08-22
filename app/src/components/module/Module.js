import ModuleButton, { ModuleButtonType } from './ModuleButton.js';

import { addModule, removeModule } from '../../redux/modules/modules.js';

import ModuleModel from '../../models/Module.js';

import './Module.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Map } from 'immutable';

type Props = {
  module: ModuleModel,
  addModule: Function, // fix us... (module: Module) => any?
  removeModule: Function, // fix us... (module: Module) => any?
  active: Map<string, ModuleModel>,
  expanded: boolean,
}

class Module extends Component<Props> {
  addModule = (mod: ModuleModel): void => {
    this.props.addModule(this.props.module);
  }

  removeModule = (mod: ModuleModel): void => {
    this.props.removeModule(this.props.module);
  }

  render() {
    const { module, active, expanded } = this.props;
    const { name, description } = module;
    const isActive = active.has(name);

    return (
      <div className="module__container">
        <div className="flex--row--center flex--space-between">
          <h3>{name}</h3>
          <div>
            <ModuleButton
              type={ModuleButtonType.ADD}
              active={isActive}
              onClick={this.addModule}
            >
              Add
            </ModuleButton>
            <ModuleButton
              type={ModuleButtonType.REMOVE}
              active={isActive}
              onClick={this.removeModule}
            >
              Remove
            </ModuleButton>
          </div>
        </div>
        {expanded && <p className="module__description">{description}</p>}
      </div>
    );
  }
}

function mapStateToProps({ ui, modules: { active }}) {
  return {
    expanded: ui.expanded,
    active: active
  };
}

const mapDispatchToProps = {
  addModule,
  removeModule
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
