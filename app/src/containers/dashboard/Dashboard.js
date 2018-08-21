import HalfPane from '../../components/layout/HalfPane.js';
import ModulePicker from '../module_picker/ModulePicker.js';

import magicmirrorIcon from '../../assets/magicmirror.png';
import './Dashboard.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="dashboard flex--row--center">
    <div className="navigation-icon__container">
      <Link to="/">
        <img src={magicmirrorIcon} alt={`Link to MagicMirror.`} className="navigation-icon__icon" />
      </Link>
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

export default Dashboard;
