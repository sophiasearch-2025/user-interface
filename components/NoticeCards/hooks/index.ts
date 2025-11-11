// Exportaciones de todos los archivos de hooks
export {
  convertUnitToPx,
  convertPxToUnit,
  convertDateToStr
} from './conversions';

export {
  getFrameDimensions,
  getContentDimensions,
  applyEffectiveLimits,
  type FrameDimensions,
  type ContentDimensions,
} from './measurements';

export {
  calculateCoverHeight,
  calculateVisibilityFactor,
  shouldShowCover,
  calculateDynamicLines,
  type CoverConfig,
} from './calculations';

export {
  calculateOptimalScale,
  applyContentScale,
  calculateButtonScale,
} from './scaling';

export {
  performAllCalculations,
  type LayoutCalculationResults,
  type CoverConfig as LayoutCoverConfig,
} from './layout';

export {
  useNoticeCardLogic
} from './useNoticeCardLogic'