import Ratio from '../../components/layout/Ratio.js';
import DraggableMirror from './draggable/DraggableMirror.js';
import StaticMirror from './static/StaticMirror.js';

import RenderContext from '../../constants/RenderContext.js';
import type { RenderContextType } from '../../constants/RenderContext.js';
import './MagicMirror.css';

import React from 'react';

type Props = {|
  renderContext: RenderContextType
|};

const MagicMirror = ({ renderContext }: Props) => (
  <div className="magicmirror flex--row--center full-height">
    <Ratio x={1} y={2}>
      {({ width, height }) => {
        const props = { width, height };

        if (renderContext === RenderContext.DRAGGABLE_VIEW) {
          return <DraggableMirror {...props} />;
        }
        return <StaticMirror {...props} />;
      }}
    </Ratio>
  </div>
);

MagicMirror.defaultProps = {
  renderContext: RenderContext.DRAGGABLE_VIEW
};

export default MagicMirror;
