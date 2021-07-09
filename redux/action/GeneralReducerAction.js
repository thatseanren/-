import * as ActionConstant from './actionConstant'
export const CreateNextFrame = () => ({
    type: ActionConstant.NEXT_FRAME
})
export const CreatePreviousFrame = () => ({
    type: ActionConstant.PREVIOUS_FRAME
})
export const createSetSelectedBoundingBoxAction = (selectedIndex) => ({
    type: ActionConstant.SETSELECTEDBOUNDINGBOX,
    payload: selectedIndex
})
export const createSetDrawmodeAction = (boolean) => ({
    type: ActionConstant.SETDRAWMODE,
     payload: boolean
})
export const SetCurrentBoundingBoxIndexAction = (index) => ({
    type: ActionConstant.SETCURRENTBOUNDINGBOX,
    payload:index
})
export const createSetCurrentCategoryAction = (info) => ({
    type: ActionConstant.SETCURRENTCATEGORY,
    payload: info
})
