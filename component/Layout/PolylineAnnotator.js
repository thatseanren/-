import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { categories, class_colors } from "./SwitchStylesBro";
import {
  createSwtichStateAction,
  createPOLYLINEHandleMouseUpAction,
  createPOLYLINEHandleMouseDownAction,
  createPOLYLINEHandleKeyDownAction,
  createPOLYLINEHandleMouseMoveAction,
  createUpdatePointsAction,
} from "../../redux/action/PolyLineAction";
import {
  createScaleupAction,
  createScaledownAction,
} from "../../redux/action/GeneralReducerAction";
const mapStatesToProps = (state) => ({
  currentStyle: state.GeneralReducer.currentStyle,
  state: state.Polyline.state,
  points: state.Polyline.points,
  selected: state.Polyline.selected,
  currentCategory: state.GeneralReducer.currentCategory,
  currentFrameIndex: state.GeneralReducer.currentFrameIndex,
});
const mapDispatchToProps = (Dispatch) => ({
  swtichState: (event) => {
    Dispatch(createSwtichStateAction(event));
  },
  mouseUp: (event) => {
    Dispatch(createPOLYLINEHandleMouseUpAction(event));
  },
  mouseDown: (payload) => {
    Dispatch(createPOLYLINEHandleMouseDownAction(payload));
  },
  mouseMove: (event) => {
    Dispatch(createPOLYLINEHandleMouseMoveAction(event));
  },
  keyDown: (event) => {
    Dispatch(createPOLYLINEHandleKeyDownAction(event));
  },
  ScaleUp: (event) => {
    Dispatch(createScaleupAction(event));
  },
  ScaleDown: (event) => {
    Dispatch(createScaledownAction(event));
  },
  updatePoints: (jsonArray) => {
    Dispatch(createUpdatePointsAction(jsonArray));
  },
});

function POLYLINE(props) {
  const {
    currentStyle,
    switchState,
    state,
    points,
    keyDown,
    mouseUp,
    mouseDown,
    selected,
    mouseMove,
    currentCategory,
    currentFrameIndex,
    scaleFactor,
    ScaleUp,
    ScaleDown,
    annotationArray,
    updatePoints,
  } = props;
  const mouseDownWrapper = (event) => {
    mouseDown({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
      size: [1080 * scaleFactor, 720 * scaleFactor],
    });
  };
  const mouseMoveWrapper = (event) => {
    mouseMove({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
      size: [1080 * scaleFactor, 720 * scaleFactor],
    });
  };
  const mouseUpWrapper = (event) => {
    mouseUp({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
      size: [1080 * scaleFactor, 720 * scaleFactor],
    });
  };
  const keyDownWrapper = (event) => {
    keyDown({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
      size: [1080 * scaleFactor, 720 * scaleFactor],
    });
  };
  const onWheelWrapper = (event) => {
    // event.preventDefault()
    if (event.shiftKey === true) {
      if (event.deltaY > 0) {
        ScaleUp();
      } else {
        ScaleDown();
      }
    }
  };
  React.useEffect(() => {
    const Ele = document.querySelector("#image");
    Ele.addEventListener("mousedown", mouseDownWrapper);
    Ele.addEventListener("mousemove", mouseMoveWrapper);
    Ele.addEventListener("mouseup", mouseUpWrapper);
    document.addEventListener("keydown", keyDownWrapper);
    Ele.addEventListener("wheel", onWheelWrapper, { passive: true });
    return () => {
      Ele.removeEventListener("mousedown", mouseDownWrapper);
      Ele.removeEventListener("mousemove", mouseMoveWrapper);
      Ele.removeEventListener("mouseup", mouseUpWrapper);
      document.removeEventListener("keydown", keyDownWrapper);
      Ele.removeEventListener("wheel", onWheelWrapper);
    };
  });
  React.useEffect(() => {
    const requestJson = (url) =>
      new Promise((resolve, reject) => {
        let requestJson = new XMLHttpRequest();
        requestJson.open("GET", url);
        requestJson.setRequestHeader("Authorization", "bdta");
        requestJson.withCredentials = true;
        requestJson.onload = (responseObject) => {
          if (responseObject.currentTarget.status === 200) {
            resolve(JSON.parse(responseObject.currentTarget.response));
          } else if (responseObject.currentTarget.status === 404) {
            resolve(
              `${responseObject.currentTarget.responseURL} is ${responseObject.currentTarget.status}`
            );
          }
        };
        requestJson.send();
      });
      let PromiseArray = annotationArray.map((val, ind) => {
        return requestJson(val);
      });
      let newPoints = Array.from(Array(50), () => []);
      (async function () {
        await Promise.all(PromiseArray).then((value) => {
          console.log(value);
          value.forEach((val, index) => {
            console.log(val);
            if (typeof val == "object") {
              newPoints[index] = val;
            }
          });
          updatePoints(newPoints);
        });
       
      })();
    
  }, [annotationArray]);
  React.useEffect(() => {
    const ctx = document.querySelector("#POLYLINE").getContext("2d");
    ctx.clearRect(0, 0, 1080 * scaleFactor, 720 * scaleFactor);
    ctx.lineWidth = 2;

    points[currentFrameIndex].forEach((POLYGON, index) => {
      ctx.beginPath();
      ctx.fillStyle = index === selected ? "yellow" : "red";
      ctx.arc(
        POLYGON[0][0] * 1080 * scaleFactor,
        POLYGON[0][1] * 720 * scaleFactor,
        5,
        0,
        2 * Math.PI,
        false
      );
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(
        POLYGON[0][0] * 1080 * scaleFactor,
        POLYGON[0][1] * 720 * scaleFactor
      );
      for (var a = 1; a < POLYGON.length; a++) {
        ctx.lineTo(
          POLYGON[a][0] * 1080 * scaleFactor,
          POLYGON[a][1] * 720 * scaleFactor
        );
        ctx.moveTo(
          POLYGON[a][0] * 1080 * scaleFactor,
          POLYGON[a][1] * 720 * scaleFactor
        );
      }
      ctx.closePath();
      ctx.strokeStyle =
        index === selected ? "green" : class_colors[POLYGON[0][2]];
      ctx.stroke();
      for (var a = 1; a < POLYGON.length - 1; a++) {
        ctx.beginPath();
        ctx.arc(
          POLYGON[a][0] * 1080 * scaleFactor,
          POLYGON[a][1] * 720 * scaleFactor,
          3,
          0,
          2 * Math.PI,
          false
        );
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 3;
      }
    });
  });
  return (
    <div style={{ height: "100%", float: "left", width: "calc(100% - 315px)" }}>
      <div
        style={{ height: "48px", background: "#272a42", width: "100%" }}
      ></div>
      <Grid
        item
        container
        wrap="nowrap"
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          background: "#000",
          justifyContent: "flex-start",
          height: "calc(100% - 48px)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div id="canvasCombo" style={{ position: "relative", left: 0, top: 0 }}>
          <img
            id="image"
            src={`${props.imageList[props.currentFrameIndex]}`}
            alt="fdsa"
            role="presentation"
            style={{
              width: 1080 * scaleFactor,
              // maxWidth: `${200}`,
              height: 720 * scaleFactor,
              maxHeight: `${3000}`,
              display: "block",
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            draggable={false}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          />
          <canvas
            id="POLYLINE"
            width={1080 * scaleFactor}
            height={720 * scaleFactor}
            style={{ pointerEvents: "none", position: "absolute", top: "0px" }}
          ></canvas>
          {/* {typeof document !== "undefined" && renderBB()} */}
        </div>
      </Grid>
    </div>
  );
}
export default connect(mapStatesToProps, mapDispatchToProps)(POLYLINE);
