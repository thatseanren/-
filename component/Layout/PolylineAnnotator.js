import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { categories, class_colors } from "./PageLeft";
import {
  createSwtichStateAction,
  createPOLYLINEHandleMouseUpAction,
  createPOLYLINEHandleMouseDownAction,
  createPOLYLINEHandleKeyDownAction,
  createPOLYLINEHandleMouseMoveAction,
} from "../../redux/action/PolyLineAction";
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
});
const keydown_handler = (e) => {
  if (e.key === "n" || e.key === "p") {
    e.preventDefault();
    if (e.key === "n") {
      //
    } else {
      //
    }
  }
  if (e.key === "Backspace" || e.key === "Delete") {
    //
  }

  if (e.key === "a") {
    //
  }
  if (
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    //
  }
  if (e.key === "-") {
  }
  if (e.shiftKey && e.key === "+") {
    // Zoom,
  }
  if (e.shiftKey && e.key === "-") {
    //zoom
  }
  if (e.key === "Escape") {
    //
  }
  if (e.key === "Enter") {
    //
  }
};
const mouseDownHandler = (e) => {
  e.stopPropagation();
  var cx = e.offsetX;
  var cy = e.offsetY;
  console.log("current mouseDown ", cx, cy);

  //   if ("this is IDLE") {
  //     if (e.shiftKey) {
  //       // push coordinate
  //       //set this is ongoing
  //     } else {
  //       // is this mousedown inside a region?
  //     }
  //   }
  //   if ("this is ongoing ") {
  //     var nclick_done = false;
  //     if ("This point is near the first 点") {
  //       nclick_done = true;
  //     } else {
  //       //push coordinate
  //     }
  //   }
  //   if (nclick_done) {
  //     //这个画完了
  //     //清除 coordinate
  //     //恢复IDLE
  //   }
  //   return;
  //   if ("This is selecting rather dreawing") {
  //     // var sel_region_cp = this._creg_is_on_sel_region_cp(cx, cy, this.conf.CONTROL_POINT_CLICK_TOL);
  //     if ("mousedown was on controlpoint of one of the selected regions") {
  //       //this.resize_selected_mid_index = sel_region_cp[0];
  //       //this.resize_control_point_index = sel_region_cp[1];
  //       //设置 REGION_RESIZE_ONGOING0
  //     } else {
  //       //mousedown was not on a control point, two possibilities:
  //       //- inside an already selected region
  //       // -outside a selected region
  //       // * inside another unselected region
  //       // * outside any region
  //       //var mid_list = this._is_point_inside_existing_regions(cx,cy);
  //       if (e.shiftKey) {
  //         //used to select multiple regions or unselect one of existing regions
  //         if ("mid_list.length === 0") {
  //           //outside of a region, hence it could be select regions inside a user drawn area
  //           //push coordinate
  //           //设置 SELECT_ALL_INSIDE_AN_AREA_ONGOING
  //         } else {
  //           //inside a region, hence toggle selection
  //           //this.last_clicked_mid_list = mid_list;
  //           //设置 REGION_SELECT_TOGGLE_ONGOING;
  //         }
  //       } else {
  //         if ("mid_list.length === 0") {
  //           //设置 REGION_UNSELECT_ONGOING
  //         } else {
  //           //var sel_mindex = this._is_point_inside_sel_regions(cx,cy)
  //           if ("sel_mindex === -1") {
  //             //this.last_clicked_mid_list  = mid_list;
  //             //设置 REGION_SELECT_OR_DRAW_POSSIBLE
  //           } else {
  //             // push coordinate
  //             //设置 REGION_MOVE_ONGOING
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return;
};
const mouseUpHandler = (e) => {
  e.stopPropagation();
  var cx = e.offsetX;
  var cy = e.offsetY;

  if ("_VIA_RINPUT_STATE.REGION_DRAW_ONGOING") {
    //设置 REGION_DRAW_NCLICK_ONGOING
    //现实提示
  }
  if ("REGION_MOVE_ONGOING") {
    //PUSH COORDINATE cx,cy
    if ("this._is_user_input_pts_equal") {
      //implies user perform a click operation
      //check if click is on another region
      (" var clicked_mid_list = this._is_point_inside_existing_regions(cx,cy);");
      if ("clicked_mid_list.length") {
        if ("clicked_mid_list[0] === this.last_clicked_mid_list[0]") {
          ("this.creg_select_none()");
          ("this.user_input_pts=[]");
          ("hits._state_set(_VIA_RINPUT_STATE.IDLE)");
        } else {
          //select the new regio
          if (e.shiftKey) {
            (" this._creg_select( clicked_mid_list[0] );");
          } else {
            (" this._creg_select_one( clicked_mid_list[0] );");
          }
          (" this._state_set( _VIA_RINPUT_STATE.REGION_SELECTED );");
        }
        (" this._smetadata_show()");
        ("this._creg_draw_all();");
      }
      ("this.user_input_pts=[]");
    } else {
      ("var cnavas_input_pts = this.user_input_pts.slice(0)");
      ("var cdx = canvas_input_pts[2] - canvas_input_pts[0]");
      ("var cdy = canvas_input_pts[3] - canvas_input_pts[1]");
      ("var mid_list = this.selected_mid_list.slice(0);");
      ("this._metadata_move_region(mid_list, cdx,cdy)");
      if ("enable zoom") {
        ("this.zoom_rshape_ctx.clearRect(0,0,this.zoom_canvas_width, this.zoom_canvas_height)");
      }
      ("this._tmpreg_clear()");
      ("this.user_input_pts= []");
      ("this._state_set(_VIA_RINPUT_STATE.REGION_SELECTED)");
      return;
    }

    if ("this.state_id === _VIA_RINPUT_STATE.REGION_UNSELECT_ONGOING") {
      ("this._creg_select_none");
    }
  }
};
const mouseMoveHandler = (e) => {
  e.stopPropagation();
  var cx = e.offsetX;
  var cy = e.offsetY;
  this.last_cx = cx;
  this.last_cy = cy;
  if (
    this.state_id === _VIA_RINPUT_STATE.REGION_DRAW_ONGOING ||
    this.state_id === _VIA_RINPUT_STATE.REGION_DRAW_NCLICK_ONGOING
  ) {
    this._tmpreg_draw_region(this.va.region_draw_shape, pts);
    return;
  }
  if (this.state_id === _VIA_RINPUT_STATE.REGION_SELECTED) {
    var sel_region_cp = this._creg_is_on_sel_region_cp(
      cx,
      cy,
      this.conf.CONTROL_POINT_CLICK_TOL
    );

    if (sel_region_cp[0] !== -1 && sel_region_cp[1] !== -1) {
      var mindex = sel_region_cp[0];
      var mid = this.selected_mid_list[mindex];
      var cp_index = sel_region_cp[1];
      var shape_id = this.creg[mid][0];

      switch (shape_id) {
        case _VIA_RSHAPE.RECTANGLE:
        case _VIA_RSHAPE.CIRCLE:
        case _VIA_RSHAPE.ELLIPSE:
          switch (cp_index) {
            case 1: // top center
            case 3: // bottom center
              this.input.style.cursor = "row-resize";
              break;
            case 2: // right center
            case 4: // left center
              this.input.style.cursor = "col-resize";
              break;
            case 5: // corner top-right
            case 7: // corner bottom-left
              this.input.style.cursor = "nesw-resize";
              break;
            case 6: // corner bottom-right
            case 8: // corner top-left
              this.input.style.cursor = "nwse-resize";
              break;
          }
          break;
        case _VIA_RSHAPE.EXTREME_RECTANGLE:
        case _VIA_RSHAPE.EXTREME_CIRCLE:
        case _VIA_RSHAPE.POINT:
        case _VIA_RSHAPE.LINE:
        case _VIA_RSHAPE.POLYGON:
        case _VIA_RSHAPE.POLYLINE:
          this.input.style.cursor = "cell";
          break;
      }
    } else {
      this.input.style.cursor = "default";
    }
    return;
  }

  if (this.state_id === _VIA_RINPUT_STATE.REGION_MOVE_ONGOING) {
    this._tmpreg_clear();
    var dx = cx - this.user_input_pts[0];
    var dy = cy - this.user_input_pts[1];
    this._tmpreg_move_sel_regions(dx, dy);
    return;
  }

  if (this.state_id === _VIA_RINPUT_STATE.REGION_RESIZE_ONGOING) {
    this._tmpreg_clear();
    this._tmpreg_move_sel_region_cp(
      this.resize_selected_mid_index,
      this.resize_control_point_index,
      cx,
      cy
    );
    return;
  }
};
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
  } = props;
  const mouseDownWrapper = (event) => {
    mouseDown({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
    });
  };
  const mouseMoveWrapper = (event) => {
    mouseMove({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
    });
  };
  const mouseUpWrapper = (event) => {
    mouseUp({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
    });
  };
  const keyDownWrapper = (event) => {
    keyDown({
      event: event,
      currentCategory: currentCategory,
      currentFrameIndex: currentFrameIndex,
    });
  };
  React.useEffect(() => {
    const Ele = document.querySelector("#image");
    Ele.addEventListener("mousedown", mouseDownWrapper);
    Ele.addEventListener("mousemove", mouseMoveWrapper);
    Ele.addEventListener("mouseup", mouseUpWrapper);
    document.addEventListener("keydown", keyDownWrapper);
    return () => {
      Ele.removeEventListener("mousedown", mouseDownWrapper);
      Ele.removeEventListener("mousemove", mouseMoveWrapper);
      Ele.removeEventListener("mouseup", mouseUpWrapper);
      document.removeEventListener("keydown", keyDownWrapper);
    };
  });
  React.useEffect(() => {
    const ctx = document.querySelector("#POLYLINE").getContext("2d");
    ctx.clearRect(0, 0, 1080, 720);
    ctx.lineWidth = 2;

    points[currentFrameIndex].forEach((POLYGON, index) => {
      ctx.beginPath();
      ctx.fillStyle = index === selected ? "yellow" : "red";
      ctx.arc(POLYGON[0][0], POLYGON[0][1], 5, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(POLYGON[0][0], POLYGON[0][1]);
      for (var a = 1; a < POLYGON.length; a++) {
        ctx.lineTo(POLYGON[a][0], POLYGON[a][1]);
        ctx.moveTo(POLYGON[a][0], POLYGON[a][1]);
      }
      ctx.closePath();
      ctx.strokeStyle =
        index === selected ? "green" : class_colors[POLYGON[0][2]];
      ctx.stroke();
      for (var a = 1; a < POLYGON.length - 1; a++) {
        ctx.beginPath();
        ctx.arc(POLYGON[a][0], POLYGON[a][1], 3, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 3;
      }
      // if (index === selected) {
      //   let region = new Path2D();
      //   region.moveTo(POLYGON[0][0], POLYGON[0][1]);
      //   for (var a = 1; a < POLYGON.length; a++) {
      //     region.lineTo(POLYGON[a][0], POLYGON[a][1]);
      //   }
      //   region.closePath();
      //   var gradient = ctx.createLinearGradient(POLYGON[0][0], POLYGON[0][1], POLYGON[Math.floor(POLYGON.length / 2)][0],POLYGON[Math.floor(POLYGON.length / 2)][1]);
      //   gradient.addColorStop(0, "green");
      //   gradient.addColorStop(0.5, "cyan");
      //   gradient.addColorStop(1, "green");

      //   ctx.fillStyle = gradient;
      //   ctx.fill(region, "evenodd");
      // }
    });
  });
  return (
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
        height: "100%",
      }}
    >
      <div
        style={{ height: "48px", background: "#272a42", width: "100%" }}
      ></div>
      <div position="relative">
        <img
          id="image"
          src={`${props.imageList[props.currentFrameIndex]}`}
          alt="fdsa"
          role="presentation"
          style={{
            width: 1080,
            // maxWidth: `${200}`,
            height: 720,
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
          width={1080}
          height={720}
          style={{ pointerEvents: "none", position: "relative", top: "-720px" }}
        ></canvas>
        {/* {typeof document !== "undefined" && renderBB()} */}
      </div>
    </Grid>
  );
}
export default connect(mapStatesToProps, mapDispatchToProps)(POLYLINE);
