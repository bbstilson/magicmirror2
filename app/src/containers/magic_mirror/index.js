import MagicMirror from './MagicMirror.js';

import RenderContext from '../../constants/RenderContext.js';

import React from 'react';

export const DraggableMirror = () => (
  <div className="full flex--column--center">
    <MagicMirror renderContext={RenderContext.DRAGGABLE_VIEW} />
  </div>
);

export const StaticMirror = () => (
  <div className="full">
    <MagicMirror renderContext={RenderContext.STATIC_VIEW} />
  </div>
);
