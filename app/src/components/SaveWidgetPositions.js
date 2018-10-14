import { saveWidgetPositions } from '../redux/modules/save_widgets.js';
import { undoWidgetPositionChanges } from '../redux/modules/widgets.js';

import classnames from 'classnames';
import { connect } from 'react-redux';
import * as React from 'react';

import './SaveWidgetPositions.css';

import type { AppState } from '../redux/modules/index.js';
import type { PositionsType, UpdateWidgetPositionChanges } from '../redux/modules/widgets.js';

type Props = {|
  positions: PositionsType,
  lastPositionSave: PositionsType,
  saveWidgetPositions: () => Function,
  undoWidgetPositionChanges: () => UpdateWidgetPositionChanges,
|};

function hasChangedPositions({ positions, lastPositionSave }): boolean {
  // This works in Immutable, but not in Flow. Likely a bug in Immutable flow-types.
  // $FlowFixMe
  return !positions.equals(lastPositionSave);
}

class SaveWidgetPositions extends React.Component<Props> {
  handleSaveClick = (): void => {
    if (hasChangedPositions(this.props)) {
      this.props.saveWidgetPositions();
    }
  }

  handleUndoClick = (): void => {
    if (hasChangedPositions(this.props)) {
      this.props.undoWidgetPositionChanges();
    }
  }

  render() {
    const updatedState = hasChangedPositions(this.props);
    const saveBtnClasses = classnames({
      'btn': true,
      'position-state-btn': true,
      'save-positions': true,
      'save-positions__in-sync': !updatedState
    });
    const undoBtnClasses = classnames({
      'btn': true,
      'position-state-btn': true,
      'undo-changes': true
    });
    return (
      <div className="position-state-buttons">
        <button className={saveBtnClasses} onClick={this.handleSaveClick}>
          {updatedState ? 'Save' : 'Synced!'}
        </button>
        {updatedState && (
          <button className={undoBtnClasses} onClick={this.handleUndoClick}>
            Undo
          </button>
        )}
      </div>
    );
  }
}

function mapStateToProps({
  widgets: { positions, lastPositionSave }
}: AppState) {
  return {
    positions,
    lastPositionSave,
  };
}

const mapDispatchToProps = {
  saveWidgetPositions,
  undoWidgetPositionChanges,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveWidgetPositions);
