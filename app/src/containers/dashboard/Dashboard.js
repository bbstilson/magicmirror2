import HalfPane from '../../components/layout/HalfPane.js';
import ModulePicker from '../module_picker/ModulePicker.js';

import { toggleModuleInfo } from '../../redux/modules/ui.js';

import magicmirrorIcon from '../../assets/magicmirror.png';
import infoIcon from '../../assets/information.png';
import './Dashboard.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as React from 'react';

type Props = {
  toggleModuleInfo: boolean,
}

const Dashboard = ({ toggleModuleInfo }: Props) => (
  <div className="dashboard flex--row--center">
    <div className="navigation-icon__container">
      <Link to="/">
        <img
          className="navigation-icon__icon"
          src={magicmirrorIcon}
          alt="Link to MagicMirror." />
      </Link>
      <img
        className="navigation-icon__icon"
        src={infoIcon}
        alt="Display module information."
        onClick={toggleModuleInfo} />
    </div>
    <HalfPane border>
      <ModulePicker />
    </HalfPane>
    <HalfPane>
      hello
      {/*<LiveView />*/}
    </HalfPane>
  </div>
);

export default connect(() => ({}), { toggleModuleInfo })(Dashboard);
