import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid'
import Divider from "@mui/material/Divider"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grow from "@mui/material/Grow";
import ButtonBase from "@mui/material/ButtonBase"
import TextField from "@mui/material/TextField"
import makeStyles from '@mui/styles/makeStyles';
// import Button from "@mui/material/Button"
import CreateIcon from '@mui/icons-material/Create';
import MouseIcon from '@mui/icons-material/Mouse';
import { connect } from 'react-redux'

import { createUpdateBoudingBoxAction } from '../../redux/action/BoundingBoxAction'
import { createSetDrawmodeAction } from '../../redux/action/GeneralReducerAction'
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '6ch',
            // height: "3ch",
        },
        '& input': {
            padding: "4px"
        },
        '& .Grid-Container': {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column"
        }
    },
    margin: {
        marginTop: "5px"
        , marginBottom: "5px"
    }
}))
const mapStatesToProps = (state) => ({
    currentFrameIndex: state.GeneralReducer.currentFrameIndex
    , currentBoundingBoxIndex: state.GeneralReducer.currentBoundingBoxIndex
    , BoundingBoxCollection: state.BoundingBoxCollection,
    currentSelectedBoundingBoxIndex: state.GeneralReducer.currentSelectedBoundingBoxIndex

})
const mapDispatchToProps = (dispatch) => ({
    SetDrawmode: (bool) => { dispatch(createSetDrawmodeAction(bool)); }
})
export default connect(mapStatesToProps, mapDispatchToProps)(PageRight)
function PageRight(props) {
    const [showPosition, setShowPosition] = React.useState(true)
    const classes = useStyles()
 
    const x = props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex] == undefined ? 0 : props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex]['x']
    const y = props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex] == undefined ? 0 : props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex]['y']
    const width = props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex] == undefined ? 0 : props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex]['width']
    const height = props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex] == undefined ? 0 : props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex]['height']
    const Categories = props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex] == undefined ? 0 : props.BoundingBoxCollection[props.currentFrameIndex][props.currentSelectedBoundingBoxIndex]['Categories']
    return (
        <Grid item container className={"PageRight"} style={{
            flexDirection: "column",
            width: "18vw",
            paddingLeft: "10px",
            paddingRight: "10px"
        }}>
            <Grid container item justifyContent="space-evenly" className={classes.margin} >
                <ButtonBase
                    id="draw"
                    color={"grey"}
                    icon
                    onClick={() => { props.SetDrawmode(true) }}
                >
                    <CreateIcon />
                </ButtonBase>
                <ButtonBase
                    id="mouse"
                    color={"grey"}
                    icon
                    onClick={() => { props.SetDrawmode(false) }}
                >
                    <MouseIcon />
                </ButtonBase>
            </Grid>
            <Divider component="div" style={{ width: "auto", }} />
            <ButtonBase disableRipple onClick={() => { setShowPosition(!showPosition); }}>
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <span style={{ marginTop: "10px", marginBottom: "10px", fontWeight: '550' }}> BoundingBox
                    </span>
                    {showPosition ? <RemoveIcon /> : <AddIcon />}
                </Grid>
            </ButtonBase>
            {showPosition && <Grow in={showPosition}>
                <Grid container direction="column" style={{ padding: '20px' }}>
                    <form className={classes.root}>
                        <div className="Grid-Container">
                            <Grid container item alignItems="center" justifyContent="space-between" style={{ width: "232px" }} >
                                <span> Position</span>
                            </Grid>
                            <TextField
                                value={y}
                                style={{ alignSelf: "center" }}
                                label="T" type="number" variant="outlined" InputLabelProps={{
                                    shrink: true,
                                }} />
                            <Grid container item justifyContent="space-between" alignItems="center" flexWrap="nowrap"
                                style={{ margin: '0px auto', width: "180px" }}>
                                <TextField
                                    value={x}
                                    label="L" type="number" variant="outlined" InputLabelProps={{
                                        shrink: true,
                                    }} />
                                <div style={{
                                    width: "47px", height: "47px", display: "inline-block",
                                    border: "1px solid rgba(0, 0, 0, 0.87)", borderRadius: "4px", overflow: "hidden", padding: "12px"
                                }}>
                                    <span>
                                    </span>
                                    <div style={{ width: "22px", height: "22px", display: "inline-block", background: "grey", borderRadius: "2px" }}>
                                    </div>
                                </div>
                                <TextField
                                    // value={parseInt(image.style.width) - x - width}
                                    label="R" type="number" variant="outlined" InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <TextField
                                // value={bottom}
                                style={{ alignSelf: "center" }}
                                label="B" type="number" variant="outlined" InputLabelProps={{
                                    shrink: true,
                                }} />
                            <Grid container item justifyContent="space-between" alignItems="center">   <span> Width</span> <TextField
                                value={width}
                                label="" type="number" variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /></Grid>
                            <Grid container item justifyContent="space-between" alignItems="center">
                                <span> Height</span>
                                <TextField
                                    value={height}
                                    onChange={(event) => {
                                       
                                    }}
                                    label="" type="number" variant="outlined" InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid container item justifyContent="space-between" alignItems="center">
                                <span> Overlapping</span>
                                <TextField
                                    label="" type="number" variant="outlined" InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </div>
                    </form>
                </Grid>
            </Grow>}
        </Grid >
    );

}