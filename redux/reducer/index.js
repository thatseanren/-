
import ImageArray from "./ImageArray";
import GeneralReducer from "./GeneralReducer";
import BoundingBoxCollection from "./BoundingBoxCollection"
import Polyline from './PolyLine'

export default (state = {}, action) => {

    const newState = {
        ImageArray: ImageArray(state.ImageArray, action),
        GeneralReducer: GeneralReducer(state.GeneralReducer, action),
        BoundingBoxCollection:BoundingBoxCollection(state.BoundingBoxCollection, action),
        Polyline: Polyline(state.Polyline, action)
    }

    return newState; 
}



