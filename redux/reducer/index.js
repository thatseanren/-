
import ImageArray from "./ImageArray";
import GeneralReducer from "./GeneralReducer";
import BoundingBoxCollection from "./BoundingBoxCollection"
// export const store = createStore(reducer)

export default (state = {}, action) => {

    const newState = {
        ImageArray: ImageArray(state.ImageArray, action),
        GeneralReducer: GeneralReducer(state.GeneralReducer, action),
        BoundingBoxCollection:BoundingBoxCollection(state.BoundingBoxCollection, action)
    }

    return newState; 
}



