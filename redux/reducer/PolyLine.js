import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,
  POLYLINEHANDLEKEYDOWN,
  POLYLINEHANDLEMOUSEMOVE,
} from "../action/actionConstant";
const defaultState = {
  state: "IDLE",
  points: Array.from(Array(50), () => []),
  selected: null,
  on_change_point: null,
  offset: [0, 0],
  moving: false,
};
/*
    @param: we have a two dimensional array, eachPolyline[ eachpoint[ ] ]
    we listen on mouseDown, if the state==="IDLE" create a new POLYLINE by points.push then switch state = "DRAW_ON_GOING", 
    if the state === "DRAW_ON_GOING" then we push the points into _UNFINISHED_ POLYLINE BY points[points.length - 1].push[payload.x, payload.y]   
*/
const Polyline = (state = defaultState, { type, payload }) => {
  //   let NewState = { ...state }; using spread operation to make a duplication of the state will not be permited, since spread operator only copy the address of the object, points from previous state will be copied to the new  state
  let NewState = JSON.parse(JSON.stringify(state));

  switch (type) {
    case POLYLINESWITCHSTATE:
      return { ...NewState, ...{ state: payload } };
    case POLYLINEHANDLEMOUSEDOWN:
      const { currentFrameIndex } = payload;
      //when we change the points of NewState,
      if (payload.event.shiftKey === true && payload.event.button === 2) {
        NewState.offset[0] = event.offsetX;
        NewState.offset[1] = event.offsetY;
        NewState.moving = true;
      } else {
        if (NewState.state === "IDLE") {
          let is_near_any_polyline = util_input_is_near_any_polyline(
            NewState.points[currentFrameIndex],
            payload.event.offsetX / payload.size[0],
            payload.event.offsetY / payload.size[1]
          );
          if (Object.keys(is_near_any_polyline).length) {
            NewState.state = "ON_Selected";
            NewState.selected = parseInt(Object.keys(is_near_any_polyline)[0]);
          } else {
            NewState.points[currentFrameIndex][
              NewState.points[currentFrameIndex].length
            ] = [
              [
                payload.event.offsetX / payload.size[0],
                payload.event.offsetY / payload.size[1],
                payload.currentCategory,
              ],
            ];
            NewState.state = "DRAW_ON_GOING";
          }
        } else if (NewState.state === "DRAW_ON_GOING") {
          if (
            util_input_is_near_first_user_input_point(
              NewState.points[currentFrameIndex][
                NewState.points[currentFrameIndex].length - 1
              ],
              payload.event.offsetX / payload.size[0],
              payload.event.offsetY / payload.size[1]
            )
          ) {
            NewState.points[currentFrameIndex][
              NewState.points[currentFrameIndex].length - 1
            ].push([
              payload.event.offsetX / payload.size[0],
              payload.event.offsetY / payload.size[1],
            ]);
            // console.log("util_input_is_near_first_user_input_point");
            NewState.state = "IDLE";
          } else {
            NewState.points[currentFrameIndex][
              NewState.points[currentFrameIndex].length - 1
            ].push([
              payload.event.offsetX / payload.size[0],
              payload.event.offsetY / payload.size[1],
            ]);
          }
        } else if (NewState.state === "ON_Selected") {
          let is_still_the_same_selected = util_input_is_near_any_point(
            NewState.points[currentFrameIndex][NewState.selected],
            payload.event.offsetX / payload.size[0],
            payload.event.offsetY / payload.size[1]
          );
          if (is_still_the_same_selected) {
            NewState.state = "ON_Changing_Selected";
            NewState.on_change_point = is_still_the_same_selected[1];
          } else {
            NewState.state = "IDLE";
          }
        }
      }
      return NewState;
    case POLYLINEHANDLEMOUSEUP:
      if (
        payload.event.shiftKey === true &&
        payload.event.button === 2 &&
        NewState.moving === true
      ) {
        NewState.moving = false;
      } else {
        if (NewState.state === "ON_Changing_Selected") {
          let temp =
            NewState.points[payload.currentFrameIndex][NewState.selected][
              NewState.on_change_point
            ].splice(0);
          temp[0] = payload.event.offsetX / payload.size[0];
          temp[1] = payload.event.offsetY / payload.size[1];
          NewState.points[payload.currentFrameIndex][NewState.selected][
            NewState.on_change_point
          ] = temp;
          NewState.state = "ON_Selected";
        }
      }
      return NewState;
    case POLYLINEHANDLEMOUSEMOVE:
      if (
        payload.event.shiftKey === true &&
        payload.event.buttons === 2 &&
        NewState.moving === true
      ) {
        let ele = document.querySelector("#canvasCombo");
        let left = parseInt(ele.style.left);
        let top = parseInt(ele.style.top);
        ele.style.left = left + event.offsetX - NewState.offset[0] + "px";
        ele.style.top = top + event.offsetY - NewState.offset[1] + "px";
        NewState.offset = [event.offsetX, event.offsetY];
      } else {
        if (NewState.state === "ON_Changing_Selected") {
          let temp =
            NewState.points[payload.currentFrameIndex][NewState.selected][
              NewState.on_change_point
            ].splice(0);
          temp[0] = payload.event.offsetX / payload.size[0];
          temp[1] = payload.event.offsetY / payload.size[1];
          NewState.points[payload.currentFrameIndex][NewState.selected][
            NewState.on_change_point
          ] = temp;
        }
      }
      return NewState;
    case POLYLINEHANDLEKEYDOWN:
      if (payload.event.code === "Enter") {
        NewState.state = "IDLE";
      }
      if (payload.event.key === "Backspace" || payload.event.key === "Delete") {
        payload.event.preventDefault();
        if (NewState.selected !== null) {
          NewState.points[payload.currentFrameIndex].splice(
            NewState.selected,
            1
          );
          NewState.state = "IDLE";
        }
      }
      return NewState;
  }
  return NewState;
};

export default Polyline;

const util_input_is_near_first_user_input_point = (NewState, cx, cy) => {
  var n = NewState.length;
  if (n > 2) {
    var dx = Math.abs(cx - NewState[0][0]);
    var dy = Math.abs(cy - NewState[0][1]);
    // console.log(
    //   "Comparing if util_input_is_near_first_user_input_point\n",
    //   cx,
    //   NewState[0][0],
    //   cy,
    //   NewState[0][1]
    // );
    if (dx <= 0.01 && dy <= 0.01) {
      return true;
    }
  }
  return false;
};

const util_input_is_near_any_point = (points, cx, cy) => {
  var n = points.length;
  for (var a = 0; a < n; a++) {
    var dx = Math.abs(cx - points[a][0]);
    var dy = Math.abs(cy - points[a][1]);

    if (dx <= 0.01 && dy <= 0.01) {
      // console.log("near point index: ", a, "差值： ", "x: ", dx, "y:", dy);
      return [true, a];
    }
  }

  return false;
};

const util_input_is_near_any_polyline = (arryOfPolyline, cx, cy) => {
  const result = {};
  arryOfPolyline.forEach((polyline, index) => {
    polyline.forEach((points, ind) => {
      var dx = Math.abs(cx - points[0]);
      var dy = Math.abs(cy - points[1]);
      if (dx <= 0.01 && dy <= 0.01) {
        //This means user has clicked on a point where is from index of Polyline, of ind of that polyline
        result[index] = {
          polyline: index,
          point: ind,
        };
      }
    });
  });
  return result;
};
