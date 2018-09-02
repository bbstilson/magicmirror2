const RenderContext = {
  DRAGGABLE_VIEW: 'DRAGGABLE_VIEW',
  STATIC_VIEW: 'STATIC_VIEW',
}

export type RenderContextType = $Keys<typeof RenderContext>

export default RenderContext;

