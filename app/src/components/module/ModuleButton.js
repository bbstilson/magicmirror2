import './ModuleButton.css';

import * as React from 'react';
import classnames from 'classnames';

export const ModuleButtonType = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

type Props = {
  onClick: Function, // fix this... (e: Event) => any?
  children: React.Node,
  primary?: boolean,
  active: boolean,
  type: $Keys<typeof ModuleButtonType>
}

type Args = {
  primary?: boolean,
  active: boolean,
  type: $Keys<typeof ModuleButtonType>
}

function getClasses({ primary, active, type } : Args): string {
  const isAdd = !active && type === ModuleButtonType.ADD;
  const isRemove = active && type === ModuleButtonType.REMOVE;
  const isDefault = (
    (active && type === ModuleButtonType.ADD) ||
    (!active && type === ModuleButtonType.REMOVE)
  );

  return classnames("btn",
    { 'btn--primary': primary },
    { 'btn--add': isAdd },
    { 'btn--remove': isRemove },
    { 'btn--default': isDefault }
  );
}

const ModuleButton = ({ onClick, children, primary, type, active }: Props) => (
  <button
    className={getClasses({ primary, active, type })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default ModuleButton;
