import {POLYLINESWITCHSTATE} from './actionConstant'

export const createSwtichStateAction = (state) =>({
    type:POLYLINESWITCHSTATE,
    payload: state
})
