import { saveWidgetPositions } from '../redux/modules/widgets.js';

import classnames from 'classnames';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as React from 'react';

import './SaveWidgetPositions.css';

import type { WidgetPositionRecord } from '../models/WidgetPosition.js';

type Props = {|
  saveWidgetPositions: Function,
  active: Immutable.Map<string, WidgetPositionRecord>,
  lastPositionSave: Immutable.Map<string, WidgetPositionRecord>,
|};

class SaveWidgetPositions extends React.Component<Props> {
  hasChangedPositions = (): boolean => {
    const { active, lastPositionSave } = this.props;
    // This doesn't work in flow, but works in Immutable...
    // $FlowFixMe
    return !active.equals(lastPositionSave);
  }

  handleSaveClick = (): void => {
    if (this.hasChangedPositions()) {
      const { saveWidgetPositions, active } = this.props;
      saveWidgetPositions(active.toIndexedSeq());
    }
  }

  handleUndoClick = (): void => {
    if (this.hasChangedPositions()) {
      console.log('undoing changes!');
      // this.props.undoWidgetPositionChanges();
    }
  }

  render() {
    const hasChangedPositions = this.hasChangedPositions();
    const saveBtnClasses = classnames({
      'btn': true,
      'position-state-btn': true,
      'save-positions': true,
      'save-positions__in-sync': !hasChangedPositions
    });
    const undoBtnClasses = classnames({
      'btn': true,
      'position-state-btn': true,
      'undo-changes': true
    });
    return (
      <div className="position-state-buttons">
        <button className={saveBtnClasses} onClick={this.handleSaveClick}>
          {hasChangedPositions ? 'Save' : 'Synced!'}
        </button>
        {hasChangedPositions && (
          <button className={undoBtnClasses} onClick={this.handleUndoClick}>
            Undo
          </button>
        )}
      </div>
    );
  }
}

function mapStateToProps({ widgets: { active, lastPositionSave }}) {
  return {
    active,
    lastPositionSave,
  };
}

export default connect(mapStateToProps, { saveWidgetPositions })(SaveWidgetPositions);
