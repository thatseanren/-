import * as ActionConstant from "../action/actionConstant";

export default function GeneralReducer(
  state = {
    currentFrameIndex: 0,
    currentBoundingBoxIndex: 0,
    currentSelectedBoundingBoxIndex: 0,
    currentDrawMode: false,
    currentCategory: 0,
    currentStyle: "POLYLINE",
    scaleFactor: 1,
  },
  action
) {
  let NewState = { ...state };
  switch (action.type) {
    case ActionConstant.NEXT_FRAME:
      return {
        ...state,
        currentFrameIndex: state.currentFrameIndex + 1,
      };
    case ActionConstant.PREVIOUS_FRAME:
      if (state.currentFrameIndex === 0) {
        return {
          ...state,
          currentFrameIndex: 0,
        };
      } else {
        return { ...state, currentFrameIndex: state.currentFrameIndex - 1 };
      }
    case ActionConstant.SETSELECTEDBOUNDINGBOX:
      return { ...state, currentSelectedBoundingBoxIndex: action.payload };
    case ActionConstant.SETDRAWMODE:
      return { ...state, currentDrawMode: action.payload };
    case ActionConstant.SETCURRENTBOUNDINGBOX:
      return { ...state, currentBoundingBoxIndex: action.payload };
    case ActionConstant.SETCURRENTCATEGORY:
      return { ...state, currentCategory: action.payload.category };
    case ActionConstant.SWITCHSTYLE:
      return { ...state, currentStyle: action.payload };
    case ActionConstant.SCALEUP:
      let up = (NewState.scaleFactor += 1 / 2);
      return { ...state, scaleFactor: up >= 2.5 ? 2.5 : up };
    case ActionConstant.SCALEDOWN:
      let temp = (NewState.scaleFactor -= 1 / 2);
      let factor = temp <= 1 / 2 ? 1 / 2 : temp;
      return { ...state, scaleFactor: factor };
    default:
      return NewState;
  }
}
