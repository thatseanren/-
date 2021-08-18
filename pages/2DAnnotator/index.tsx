import React from "react";
import Header from "../header";
import StyleisBox from "../../component/Layout/BoxAnnotator";
import StyleisPolyline from "../../component/Layout/PolylineAnnotator";
import SwitchStyles from "../../component/Layout/SwitchStylesBro";
import Position from "../../component/Layout/PageRight";
import { Provider } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import dataServer, { option } from "../../main_config";
import { connect } from "react-redux";
import DataSet from "../../styles/DataSet.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import store from "../../redux";
import SaveIcon from "@material-ui/icons/Save";
import Router from "next/router";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import IconButton from "@material-ui/core/IconButton";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CreateNextFrame,
  CreatePreviousFrame,
  createScaleupAction,
  createScaledownAction,
  createSetArbitatryFrameAction,
} from "../../redux/action/GeneralReducerAction";
import { createSaveToCloudAction } from "../../redux/action/BoundingBoxAction";
import {
  createPOLYLINEUPLOADAction,
  createResetStateAction,
} from "../../redux/action/PolyLineAction";
import Draggable from "react-draggable";

import Debug from "../../component/debug";
import MobileStepper from "@material-ui/core/MobileStepper";
interface taskInfo {
  taskid: string;
  sequence: number;
  data: string;
}
const useStyles = makeStyles({
  MuiMobileStepperProgress: {
    width: "200%",
    background: "rgba(0,0,0,0)",
    "&:MuiMobileStepper_progress": {
      width: "200%",
    },
  },
  MuiPaper_root: {
    "&:MuiMobileStepper_progress": {
      position: "absolute",
      content: '""',
      display: "block",
      right: 0,
      top: "2px",
      width: "1px",
      height: "10px",
      background: "#000",
      marginRight: "5px",
    },
  },
  MuiMobileStepper_progress: {
    width: "100%",
  },
});
const mapDispatchToProps = (dispatch) => ({
  SaveToCloud_through_redux_store: (taskInfo: taskInfo) => {
    dispatch(createSaveToCloudAction(taskInfo));
  },
  PolylineSaveToCloud_through_redux_store: (taskInfo: taskInfo) => {
    dispatch(createPOLYLINEUPLOADAction(taskInfo));
  },
  nextFrame: () => {
    dispatch(CreateNextFrame());
    dispatch(createResetStateAction());
  },
  previousFrame: () => {
    dispatch(CreatePreviousFrame());
    dispatch(createResetStateAction());
  },
  scaleup: () => {
    dispatch(createScaleupAction());
  },
  scaledown: () => {
    dispatch(createScaledownAction());
  },
  arbitaryFrame: (payload) => {
    console.log("dispatch")
    dispatch(createSetArbitatryFrameAction(payload));
  },
});
const mapStatesToProps = (state) => ({
  entireBoundingBox: state.BoundingBoxCollection,
  currentFrameIndex: state.GeneralReducer.currentFrameIndex,
  currentBoundingBoxIndex: state.GeneralReducer.currentBoundingBoxIndex,
  currentDrawMode: state.GeneralReducer.currentDrawMode,
  currentCategory: state.GeneralReducer.currentCategory,
  currentStyle: state.GeneralReducer.currentStyle,
  scaleFactor: state.GeneralReducer.scaleFactor,
  PolylinePoints: state.Polyline.points,
});
const Guider = (props) => {
  var [tool, setTool] = React.useState("none");
  return (
    <div
      style={{
        position: "relative",
        zIndex: "1000000000",
      }}
    >
      <ErrorOutlineOutlinedIcon
        onMouseOver={() => setTool("block")}
        onMouseOut={() => setTool("none")}
        style={{ color: "#fff", cursor: "pointer" }}
      />
      <div
        style={{
          display: tool,
          background: "#243a58",
          position: "absolute",
          padding: "14px",
          color: "#fff",
          left: "-20px",
          width: "320px",
        }}
      >
        <div
          style={{ overflow: "hidden", fontSize: "14px", marginBottom: "10px" }}
        >
          <div style={{ width: "75px", float: "left" }}>图片缩放：</div>
          <div
            style={{
              float: "left",
              width: "calc(100% - 75px)",
              color: "#a3b8b7",
            }}
          >
            鼠标置于图片处，按住键盘上“Shift”键，滑动滚轮完成缩放
          </div>
        </div>
        <div style={{ overflow: "hidden", fontSize: "14px" }}>
          <div style={{ width: "75px", float: "left" }}>删除标注：</div>
          <div
            style={{
              float: "left",
              width: "calc(100% - 75px)",
              color: "#a3b8b7",
            }}
          >
            鼠标点击要操作的标注，按下“Delete”键删除标注
          </div>
        </div>
      </div>
    </div>
  );
};
const SaveToCloud_through_redud_store_button = connect(
  mapStatesToProps,
  mapDispatchToProps
)(
  ({
    SaveToCloud_through_redux_store,
    _taskID,
    sequence,
    currentStyle,
    PolylineSaveToCloud_through_redux_store,
  }) => {
    return currentStyle === "BOX" ? (
      <Button
        variant="contained"
        color="secondary"
        className={DataSet.sub}
        startIcon={<SaveIcon />}
        onClick={() => {
          SaveToCloud_through_redux_store({
            _taskID: _taskID,
            sequence: sequence,
          });
          Router.push({
            pathname: `/taskdetail/${_taskID}`,
          });
        }}
      >
        保存并退出
      </Button>
    ) : (
      <Button
        variant="contained"
        color="secondary"
        className={DataSet.sub}
        startIcon={<SaveIcon />}
        onClick={() => {
          PolylineSaveToCloud_through_redux_store({
            _taskID: _taskID,
            sequence: sequence,
          });
          Router.push({
            pathname: `/taskdetail/${_taskID}`,
          });
        }}
      >
        保存并退出
      </Button>
    );
  }
);

const StoreWrapper = connect(
  mapStatesToProps,
  null
)((props) => {
  const { imageList, annotationArray, scaleFactor } = props;
  return props.currentStyle === "BOX" ? (
    <StyleisBox
      imageList={imageList}
      annotationArray={annotationArray}
      scaleFactor={scaleFactor}
    />
  ) : (
    <StyleisPolyline
      imageList={imageList}
      annotationArray={annotationArray}
      scaleFactor={scaleFactor}
    />
  );
});
const PreviousFrame = connect(
  null,
  mapDispatchToProps
)(({ previousFrame }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={DataSet.pagenet}
      startIcon={<ArrowBackIosIcon />}
      onClick={() => {
        previousFrame();
      }}
    >
      上一页
    </Button>
  );
});
const NextFrame = connect(
  null,
  mapDispatchToProps
)(({ nextFrame }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={DataSet.pagenet}
      endIcon={<ArrowForwardIosIcon />}
      onClick={() => {
        nextFrame();
      }}
    >
      下一页
    </Button>
  );
});
const CurrentFrame = connect(
  mapStatesToProps,
  null
)((props) => {
  return (
    <div className={DataSet.numb_list}>
      {" "}
      {props.currentFrameIndex + 1} /{" "}
      {props.pageList ? props.pageList.length : 50}
    </div>
  );
});
const ZoomCombo = connect(
  null,
  mapDispatchToProps
)(({ scaleup, scaledown }) => {
  return (
    <div style={{ position: "absolute", bottom: "20px", right: "30px" }}>
      <IconButton
        onClick={() => {
          scaleup();
        }}
      >
        <ZoomInIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          scaledown();
        }}
      >
        <ZoomOutIcon />
      </IconButton>
    </div>
  );
});
const Progressbar = connect(
  mapStatesToProps,
  mapDispatchToProps
)((props) => {
  const classes = useStyles();
  const { pageList, arbitaryFrame } = props;
  var [pageIndex, setPageIndex] = React.useState(1);
  const page = (value) => {
    console.log(value);
    setPageIndex(value);
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "345px",
        left: "50px",
        zIndex: "10000",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          display: "flex",
          width: "100%",
        }}
      >
        {pageList
          ? pageList.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    page(index);
                    arbitaryFrame(index)
  
                  }}
                  style={{
                    flex: "1",
                    cursor: "pointer",
                    zIndex: "10",
                    height: "21px",
                  }}
                  title={index + 1}
                ></div>
              );
            })
          : ""}
      </div>
      <MobileStepper
        variant="progress"
        className={classes.MuiMobileStepperProgress}
        steps={pageList ? pageList.length : 50}
        position="static"
        activeStep={pageIndex}
      />
    </div>
  );
});
export default function Annotator(props) {
  const router = useRouter();
  const { _taskID, sequence } = router.query;
  // console.log("router.query", router.query);
  var [imageArray, setImageArray] = React.useState([]);
  var [pageList, setPageList] = React.useState();
  var [annotationArray, setAnnotationArray] = React.useState([]);

  const concatAddresstoData = (array) => {
    setPageList(array);
    return array.map((value, index) => {
      for (let key in value) {
        value[key] = `${dataServer}${option.getMeterail}${value[key]}`;
      }
      return value;
    });
  };
  React.useEffect(() => {
    const request = () => {
      return new Promise((resolve, reject) => {
        const imageRequest = new XMLHttpRequest();
        imageRequest.open(
          "GET",
          `${dataServer}/${option.getSingleTask}?_id=${_taskID}&index=${sequence}`
        );
        console.log(
          `${dataServer}/${option.getSingleTask}?_id=${_taskID}&index=${sequence}`
        );
        imageRequest.setRequestHeader("Authorization", "bdta");
        imageRequest.withCredentials = true;

        imageRequest.onload = () => {
          const res = JSON.parse(imageRequest.response);
          if (res.status === 1) {
            resolve(res.data);
          } else {
            reject(res.status);
          }
        };
        imageRequest.send();
      });
    };
    request()
      .then(
        (response) => {
          let addressList = concatAddresstoData(response);
          let imageArray = addressList.map((object, index) => {
            return object.jpg;
          });
          let annotationArray = addressList.map((object, index) => {
            return object.json;
          });
          return { imageArray, annotationArray };
        },
        (err) => {
          console.log("Having Problem", err);
        }
      )
      .then((response) => {
        imageArray = response.imageArray;
        setImageArray(imageArray);
        setAnnotationArray(response.annotationArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.query]);
  // console.log(imageArray);
  return (
    <Provider store={store}>
      <Progressbar pageList={pageList} />
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{ position: "absolute", top: "0px", bottom: "0px" }}
      >
        <div className={DataSet.sheet}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <div style={{ flexGrow: "1" }}></div>
            <Guider />
            <CurrentFrame pageList={pageList} />
            <div>
              <SaveToCloud_through_redud_store_button
                _taskID={_taskID}
                sequence={sequence}
              />
            </div>
            <div>
              <PreviousFrame />
            </div>
            <NextFrame />
          </div>
        </div>
        <div style={{ height: "100%", overflow: "hidden" }}>
          <StoreWrapper
            imageList={imageArray}
            annotationArray={annotationArray}
          />
          <SwitchStyles />
          <ZoomCombo />
        </div>
      </Grid>
      {/* <Debug /> */}
    </Provider>
  );
}
