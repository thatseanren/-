import React from "react";
import { connect } from "react-redux";
import { createRemoveBoudingBoxAction, createUpdateBoudingBoxAction } from "../../redux/action/BoundingBoxAction";
import { createSetSelectedBoundingBoxAction } from "../../redux/action/GeneralReducerAction";
import { categories } from "../Layout/PageLeft";
const mapDispatchToProps = (dispatch) => ({
    removeBoundingBox: (currentFrameIndex, currentBoundingBoxIndex) => {
        dispatch(
            createRemoveBoudingBoxAction(currentFrameIndex, currentBoundingBoxIndex)
        );
    },
    setSelectedBoundingBox: (selectedBoxIndex) => {
        dispatch(createSetSelectedBoundingBoxAction(selectedBoxIndex));
    },
    updateBoundingBox: (payload) => { dispatch(createUpdateBoudingBoxAction(payload)) }
});
const mapStateToProps = (state) => ({
    BoundingBoxCollection:
        state.BoundingBoxCollection,
    currentFrameIndex:
        state.GeneralReducer.currentFrameIndex,
    currentSelectedBoundingBoxIndex:
        state.GeneralReducer.currentSelectedBoundingBoxIndex,
});

function BoundingBox(props) {
    const {
        currentFrameIndex,
        currentBoundingBoxIndex,
        removeBoundingBox,
        setSelectedBoundingBox,
        BoundingBoxCollection,
        currentSelectedBoundingBoxIndex,
        updateBoundingBox
    } = props;
    console.log("currentSelectedBoundingBoxIndex", currentSelectedBoundingBoxIndex)
    console.log("currentBoundingBoxIndex", currentBoundingBoxIndex)
    var inlineStyle =
        currentBoundingBoxIndex == currentSelectedBoundingBoxIndex
            ? {
                ...props,

                boxShadow: `0px 0px 5px 3px ${props.color}`,
            }
            : {
                ...props,
            };
    var DragStart = {
        x: undefined,
        y: undefined
    }
    const UpdateBoundingBoxBy = () => { };
    return (
        <>
            {/* <span
                style={{
                    fontSize: "small",
                }}
            >
                {" "}
                {
                    categories[
                    BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex][
                    "category"
                    ]
                    ]
                }{" "}
            </span>{" "} */}
            <div
                draggable={true}
                style={inlineStyle}
                onDrag={(event) => {
                    // console.log(event)
                }}
                onDragStart={(event) => {
                    console.log('drag start at x: ', DragStart.x = event.clientX || event.clientX)
                    console.log('drag start at y: ', DragStart.y = event.clientY || event.clientY)
                    setTimeout(() => event.target.style.display = "none", 0)

                }}
                onDragEnd={(event) => {
                    
                    const movedX = Math.abs(DragStart.x - event.clientX)
                    const movedY = Math.abs(DragStart.y - event.clientY)
                    console.log('moved distanceX ', movedX)
                    console.log('moved distanceY ', movedY)
                    setSelectedBoundingBox(currentBoundingBoxIndex);
                    if (event.clientX > DragStart.x && event.clientY > DragStart.y) {
                        console.log('from TopLeft to BottonRight', "x", DragStart.x, "y", DragStart.y)
                        updateBoundingBox({
                            currentFrameIndex: currentFrameIndex,
                            currentBoundingBoxIndex: currentBoundingBoxIndex,
                            x: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].x + movedX,
                            y: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].y + movedY,
                            drawX: props.left + movedX,
                            drawY: props.top + movedY,
                            category: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex]["category"],
                            height: props.height,
                            width: props.width
                        })
                    }
                    //drawing from bottomLeft to topRight
                    else if (event.clientX > DragStart.x && event.clientY < DragStart.y) {
                        console.log('bottomLeft to topRight',)
                        updateBoundingBox({
                            currentFrameIndex: currentFrameIndex,
                            currentBoundingBoxIndex: currentBoundingBoxIndex,
                            height: props.height,
                            width: props.width,
                            category: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex]["category"],
                            x: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].x + movedX,
                            y: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].y - movedY,
                            drawX: props.left + movedX,
                            drawY: props.top - movedY,
                        })
                    }
                    //drawing from topRight to bottomLeft
                    else if (event.clientX < DragStart.x && event.clientY > DragStart.y) {
                        console.log("drawing from topRight to bottomLeft")
                        updateBoundingBox({
                            currentFrameIndex: currentFrameIndex,
                            currentBoundingBoxIndex: currentBoundingBoxIndex,
                            height: props.height,
                            width: props.width,
                            category: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex]["category"],
                            x: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].x - movedX,
                            y: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].y + movedY,
                            drawX: props.left - movedX,
                            drawY: props.top + movedY,
                        })
                    }
                    //drawing from bottomRight to TopLeft
                    else if (event.clientX < DragStart.x && event.clientY < DragStart.y) {
                        console.log("drawing from bottomRight to TopLeft")
                        updateBoundingBox({
                            currentFrameIndex: currentFrameIndex,
                            currentBoundingBoxIndex: currentBoundingBoxIndex,
                            height: props.height,
                            width: props.width,
                            category: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex]["category"],
                            x: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].x - movedX,
                            y: BoundingBoxCollection[currentFrameIndex][currentBoundingBoxIndex].y - movedY,
                            drawX: props.left - movedX,
                            drawY: props.top - movedY,
                        })
                    }
                    event.target.style.display = "block"
                }}
                // onMouseEnter={(event) => { console.log(event.target.style.boxShadow = `0px 0px 3px 1px ${props.color}`) }}
                // onMouseLeave={(event) => { event.target.style.boxShadow = "" }}
                onClick={(e) => {
                    console.log("onclick is called");
                    setSelectedBoundingBox(currentBoundingBoxIndex);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    console.log(
                        "remove",
                        `BoundingBoxCollection[${currentFrameIndex}][${currentBoundingBoxIndex}]`
                    );
                    removeBoundingBox({
                        currentFrameIndex: currentFrameIndex,
                        currentBoundingBoxIndex: currentBoundingBoxIndex,
                    });
                }}
            ></div>{" "}
        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(BoundingBox);
