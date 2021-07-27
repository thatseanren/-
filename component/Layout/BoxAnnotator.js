import React from 'react'
import Grid from '@material-ui/core/Grid'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CreateNextFrame, CreatePreviousFrame, createSetSelectedBoundingBoxAction, createSetDrawmodeAction, SetCurrentBoundingBoxIndexAction } from '../../redux/action/GeneralReducerAction'
import { createHandleMouseUpAction, createUpdateBoudingBoxAction } from '../../redux/action/BoundingBoxAction';
import BoundingBox from '../BoundingBox'
import { categories, class_colors } from './PageLeft'
const mapStatesToProps = (state) =>
({
    entireBoundingBox: state.BoundingBoxCollection,
    currentFrameIndex: state.GeneralReducer.currentFrameIndex,
    currentBoundingBoxIndex: state.GeneralReducer.currentBoundingBoxIndex,
    currentDrawMode: state.GeneralReducer.currentDrawMode,
    currentCategory: state.GeneralReducer.currentCategory,
    currentStyle: state.GeneralReducer.currentStyle
})
const mapDispatchToProps = (dispatch) => ({
    nextFrame: () => { dispatch(CreateNextFrame()) },
    previousFrame: () => { dispatch(CreatePreviousFrame()) },
    SetDrawmode: (bool) => { dispatch(createSetDrawmodeAction(bool)) },
    handleMouseUp: (event) => { dispatch(createHandleMouseUpAction(event)) },
    setCurrentBoundingBoxIndex: (index) => { dispatch(SetCurrentBoundingBoxIndexAction(index)) },
    updateBoundingBox: (payload) => { dispatch(createUpdateBoudingBoxAction(payload)) }
})
function MidPage(props) {
    var [offsetXY,] = React.useState([])
    var [clientXY,] = React.useState([])
    const HandleMouseDown = (event) => {
        offsetXY = [event.offsetX, event.offsetY]
        clientXY = [event.clientX, event.clientY]
    }
    const HandleMouseUp = (event) => {
        // console.log("event")
        if (event.offsetX > offsetXY[0] && event.offsetY > offsetXY[1]) {
            props.handleMouseUp({
                currentFrameIndex: props.currentFrameIndex,
                currentBoundingBoxIndex: props.entireBoundingBox[props.currentFrameIndex].length,
                width: event.offsetX - offsetXY[0],
                height: event.offsetY - offsetXY[1],
                category: props.currentCategory,
                x: offsetXY[0],
                y: offsetXY[1],
                drawX: clientXY[0],
                drawY: clientXY[1]
            })
        }
        //drawing from bottomLeft to topRight
        else if (event.offsetX > offsetXY[0] && event.offsetY < offsetXY[1]) {
            // console.log('bottomLeft to topRight',)
            props.handleMouseUp({
                currentFrameIndex: props.currentFrameIndex,
                currentBoundingBoxIndex: props.entireBoundingBox[props.currentFrameIndex].length,
                width: event.offsetX - offsetXY[0],
                height: offsetXY[1] - event.offsetY,
                category: props.currentCategory,
                x: offsetXY[0],
                y: event.offsetY,
                drawX: clientXY[0],
                drawY: event.clientY
            })

        }
        //drawing from topRight to bottomLeft
        else if (event.offsetX < offsetXY[0] && event.offsetY > offsetXY[1]) {
            // console.log("drawing from topRight to bottomLeft")
            props.handleMouseUp({
                currentFrameIndex: props.currentFrameIndex,
                currentBoundingBoxIndex: props.entireBoundingBox[props.currentFrameIndex].length,
                width: offsetXY[0] - event.offsetX,
                height: event.offsetY - offsetXY[1],
                category: props.currentCategory,
                x: event.offsetX,
                y: offsetXY[1],
                drawX: event.clientX,
                drawY: clientXY[1]
            })

        }
        //drawing from bottomRight to TopLeft
        else if (event.offsetX < offsetXY[0] && event.offsetY < offsetXY[1]) {
            // console.log("drawing from bottomRight to TopLeft")
            props.handleMouseUp({
                currentFrameIndex: props.currentFrameIndex,
                currentBoundingBoxIndex: props.entireBoundingBox[props.currentFrameIndex].length,
                width: offsetXY[0] - event.offsetX,
                height: offsetXY[1] - event.offsetY,
                category: props.currentCategory,
                x: event.offsetX,
                y: event.offsetY,
                drawX: event.clientX,
                drawY: event.clientY
            })

        }

    }
    const renderBB = () => {
        const imageElement = document.querySelector('#image')
        const offsetVX = imageElement ? imageElement.offsetLeft : 0
        const offsetVY = imageElement ? imageElement.offsetTop : 0
        return props.entireBoundingBox[props.currentFrameIndex].map((value, index) => {
            return < BoundingBox
                backdropFilter="opacity(0.5)"
                backgroundColor="transparent"
                cursor="pointer"
                color={class_colors[value.category]}
                border={`3px solid ${class_colors[value.category]}`}
                position="absolute"
                left={offsetVX + value.x}
                top={offsetVY + value.y}
                display="inline-block"
                width={value.width}
                height={value.height}
                currentBoundingBoxIndex={index} />
        })
    }

    React.useEffect(() => {

        console.log("BOundingBOX-Re-render!")
        // props.setCurrentBoundingBoxIndex(props.entireBoundingBox[props.current_frame].length)
        document.querySelector('#image').addEventListener("mousedown", HandleMouseDown)
        document.querySelector('#image').addEventListener("mouseup", HandleMouseUp)
        return () => {
            document.querySelector('#image').removeEventListener("mousedown", HandleMouseDown)
            document.querySelector('#image').removeEventListener("mouseup", HandleMouseUp)
        }
    })
    React.useEffect(() => {
        const request = (url) => {
            return new Promise((resolve, reject) => {
                const req = new XMLHttpRequest();
                req.open('GET', url);
                req.setRequestHeader("Authorization", "bdta");
                req.withCredentials = true;
                req.onload = (response) => {
                    if (response.currentTarget.status === 200) {
                        resolve(response.currentTarget.response);
                    } else if (response.currentTarget.status === 404) {
                        reject(response.currentTarget.responseURL);
                    }
                };
                req.send()
            })
        }
        props.annotationArray.forEach((value, index) => {
            request(value)
                .then(
                    response => {
                        console.log('successfull', "Frame", index, JSON.parse(response));
                        JSON.parse(response).forEach((BBvalue, BBindex) => {
                            props.updateBoundingBox({
                                currentFrameIndex: index,
                                currentBoundingBoxIndex:BBindex,
                                x: BBvalue.x,
                                y: BBvalue.y,
                                drawX: BBvalue.drawX,
                                drawY: BBvalue.drawY,
                                width: BBvalue.width,
                                height: BBvalue.height,
                                category: BBvalue.category,
                        })
                        })    
                    },
                    err => { console.log('fail', "Frame", index) })
                .catch(
                    err => { }
                )
        })
    }, [props.annotationArray])
    if (props.currentStyle === "BOX"){
        return (
            <Grid item container wrap="nowrap" direction="column" alignItems="center" justify="center"
                style={{ background: "#000", justifyContent: "flex-start", height: "100%" }}>
                <div style={{ height: "48px", background: "#272a42", width: "100%" }}>
    
                </div>
                <div position="relative">
                    <img
                        id="image"
                        src={
                            `${props.imageList[props.currentFrameIndex]}`
                        }
                        alt="fdsa"
                        role="presentation"
                        style={{
                            width: 1080,
                            // maxWidth: `${200}`,
                            height: 720,
                            maxHeight: `${3000}`,
                            display: "block"
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()
                        }}
                        draggable={false}
                        onContextMenu={event => {
                            event.preventDefault()
                        }}
                    />
                    {typeof document !== "undefined" && renderBB()}
                    x
                </div>
                <div className={"changeFrame"} style={{
                    width: "20%",
                    float: "left",
                    display: "flex",
                    justifyContent: "center",
                    color: "#1976d3",
                    marginTop: "10px"
                }}
                >
                    {/* <div style={{ width: "30px", height: "30px", cursor: "pointer", background: "#e3e5e4", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}>
                    <Button onClick={props.previousFrame}> < ChevronLeftIcon style={{ fontSize: "18" }} /></Button>
                </div>
                <div style={{
                    margin: "0px 20px",
                    fontSize: "14px",
                    lineHeight: "30px"
                }}>
                    {props.currentFrameIndex + 1}/50
                </div>
                <div style={{ width: "30px", height: "30px", cursor: "pointer", background: "#e3e5e4", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}>
                    <Button onClick={props.nextFrame}>  < ChevronRightIcon style={{ fontSize: "18" }} />
    
                    </Button></div> */}
                </div>
            </Grid>)
    }else{
        return null
    }
    
}
export default connect(mapStatesToProps, mapDispatchToProps)(MidPage)