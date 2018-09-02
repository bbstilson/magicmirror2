import './WidgetButton.css';

import * as React from 'react';
import classnames from 'classnames';

export const WidgetButtonType = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

type Props = {|
  onClick: Function, // fix this... (e: Event) => any?
  children: React.Node,
  primary?: boolean,
  active: boolean,
  type: $Keys<typeof WidgetButtonType>
|};

type Args = {|
  primary?: boolean,
  active: boolean,
  type: $Keys<typeof WidgetButtonType>
|};

function getClasses({ primary, active, type } : Args): string {
  const isAdd = !active && type === WidgetButtonType.ADD;
  const isRemove = active && type === WidgetButtonType.REMOVE;
  const isDefault = (
    (active && type === WidgetButtonType.ADD) ||
    (!active && type === WidgetButtonType.REMOVE)
  );

  return classnames("btn",
    { 'btn--primary': primary },
    { 'btn--add': isAdd },
    { 'btn--remove': isRemove },
    { 'btn--default': isDefault }
  );
}

const WidgetButton = ({ onClick, children, primary, type, active }: Props) => (
  <button
    className={getClasses({ primary, active, type })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default WidgetButton;
