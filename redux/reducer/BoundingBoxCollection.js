import {
    REMOVEBOUNDINGBOX, UPDATEBOUNDINGBOX,
    HANDLEMOUSEUP, HANDLERESIZE, HANDLESAVETOCLOUD
} from '../action/actionConstant'
import FAWAI_ip, { option,test_ip } from '../../main_config'
const state = []
for (let a = 0; a < 50; a++) {
    state.push([])
}
const BoundingBoxCollection = (state = Array.from(Array(50), () => []), { type, payload }) => {
    let NewState = [...state];
    switch (type) {
        case HANDLERESIZE:
            console.log("Handling resize")
            return NewState
        case REMOVEBOUNDINGBOX:
            NewState[payload.currentFrameIndex].splice(payload.currentBoundingBoxIndex, 1)
            return NewState
        case UPDATEBOUNDINGBOX:
            NewState[payload.currentFrameIndex].splice(payload.currentBoundingBoxIndex, 1, {
                x: payload.x,
                y: payload.y,
                drawX: payload.drawX,
                drawY: payload.drawY,
                width: payload.width,
                height: payload.height,
                category: payload.category,
            })
            return NewState
        case HANDLEMOUSEUP:
            NewState[payload.currentFrameIndex][payload.currentBoundingBoxIndex] = {
                x: payload.x,
                y: payload.y,
                width: payload.width,
                height: payload.height,
                BoudingBox: payload.BoudingBox,
                category: payload.category,
                drawX: payload.drawX,
                drawY: payload.drawY
            }
            return NewState
        case HANDLESAVETOCLOUD:
            const { _id, _taskID, sequence } = payload
            const annotation = JSON.stringify(NewState)
            const SynchronouseAnnotation_UI = new XMLHttpRequest()
            SynchronouseAnnotation_UI.open("POST", `${FAWAI_ip}${option.sendAnnotation}`)
            SynchronouseAnnotation_UI.onreadystatechange = function () {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(this);
                }
            };
            SynchronouseAnnotation_UI.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            SynchronouseAnnotation_UI.setRequestHeader("Authorization", "bdta")
            SynchronouseAnnotation_UI.withCredentials = true
            SynchronouseAnnotation_UI.send(
                `data=${annotation}&_id=${_taskID}&index=${sequence}`
            );
            return NewState
        default:
    }
    return state
}
export default BoundingBoxCollection
