import HalfPane from '../../components/layout/HalfPane.js';
import { DraggableMirror } from '../magic_mirror/index.js';
import WidgetPicker from '../widget_picker/WidgetPicker.js';

import { toggleWidgetInfo } from '../../redux/modules/ui.js';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';

import magicmirrorIcon from '../../assets/magicmirror.png';
import infoIcon from '../../assets/information.png';
import './Dashboard.css';

type Props = {|
  toggleWidgetInfo: boolean,
|};

const Dashboard = ({ toggleWidgetInfo, active, lastPositionSave }: Props) => {
  return (
    <div className="dashboard flex--row--center">
      <div className="navigation-icon__container">
        <Link to="/">
          <img
            className="navigation-icon__icon"
            src={magicmirrorIcon}
            alt="Link to MagicMirror."
          />
        </Link>
        <img
          className="navigation-icon__icon"
          src={infoIcon}
          alt="Display widget information."
          onClick={toggleWidgetInfo}
        />
      </div>
      <HalfPane border>
        <WidgetPicker />
      </HalfPane>
      <HalfPane>
        <DraggableMirror />
      </HalfPane>
    </div>
  );
}

export default connect(() => ({}), { toggleWidgetInfo })(Dashboard);
