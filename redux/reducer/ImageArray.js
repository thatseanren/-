import * as ActionConstant from '../action/actionConstant'

const ImageArray = (state =[], { type, payload }) => {
    switch (type) {
        case ActionConstant.UPDATE_IMAGE_ARRAY:
            return payload
        default:
            return state
    }
}

export default ImageArray