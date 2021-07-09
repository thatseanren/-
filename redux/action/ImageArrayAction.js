import * as ActionConstant from './actionConstant'
const CreateSetImageArrayAction = (array) => ({
    type: ActionConstant.UPDATE_IMAGE_ARRAY,
    payload: array
})
export default CreateSetImageArrayAction