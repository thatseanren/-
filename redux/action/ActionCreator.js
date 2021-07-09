import * as action_constant from './actionConstant'
export default createUpdateCoordinates = (xyz) => ({
    type: action_constant.UPDATE_COORDINATES,
    payload: xyz
})
