import * as Constant from "../action/actionConstant";

export default function GeneralReducer(state = {
    currentFrameIndex: 0,
    currentBoundingBoxIndex: 0,
    currentSelectedBoundingBoxIndex: 0,
    currentDrawMode: false,
    currentCategory: 0,
}, action) {
    let NewState = {...state}
    switch (action.type) {
        case Constant.NEXT_FRAME:
            return {
                ...state,
                currentFrameIndex: state.currentFrameIndex + 1
            }
        case Constant.PREVIOUS_FRAME:
            if (state.currentFrameIndex === 0) {
                return {
                    ...state, currentFrameIndex: 0,
                }
            } else {
                return { ...state, currentFrameIndex: state.currentFrameIndex - 1 }
            }
        case Constant.SETSELECTEDBOUNDINGBOX:
            return { ...state, currentSelectedBoundingBoxIndex: action.payload }
        case Constant.SETDRAWMODE:
            return { ...state, currentDrawMode: action.payload }
        case Constant.SETCURRENTBOUNDINGBOX:
            return { ...state, currentBoundingBoxIndex: action.payload }
        case Constant.SETCURRENTCATEGORY:
            return { ...state, currentCategory: action.payload.category }
        default:
            return NewState;
    }
}