import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,
  POLYLINEHANDLEKEYDOWN,
} from "../action/actionConstant";
const defaultState = {
  state: "IDLE",
  points: [],
  selected: null,
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
      console.log(NewState);
      //when we change the points of NewState,
      if (NewState.state === "IDLE") {
        let result = util_input_is_near_any_control_point(
          NewState,
          payload.offsetX,
          payload.offsetY
        );
        if (result) {
          //select
          NewState.selected = result[1];
          NewState.state = "ON_Selected";
        } else {
          NewState.points.push([[payload.offsetX, payload.offsetY]]);
          NewState.state = "DRAW_ON_GOING";
        }
      } else if (NewState.state === "DRAW_ON_GOING") {
        if (
          util_input_is_near_first_user_input_point(
            NewState,
            payload.offsetX,
            payload.offsetY
          )
        ) {
          NewState.points[NewState.points.length - 1].push([
            payload.offsetX,
            payload.offsetY,
          ]);
          NewState.state = "IDLE";
        } else {
          NewState.points[NewState.points.length - 1].push([
            payload.offsetX,
            payload.offsetY,
          ]);
        }
      } else if (NewState.state === "ON_Selected") {
        let result = util_input_is_near_any_control_point(
          NewState,
          payload.offsetX,
          payload.offsetY
        );
        if (result) {
          NewState.selected = result[1];
          NewState.state = "ON_Selected";
          let point = util_input_is_near_any_point(
            NewState.points[result[1]],
            payload.offsetX,
            payload.offsetY
          );
          console.log("onpoint", point);
        } else {
          NewState.state = "IDLE";
        }
      }
      return NewState;
    case POLYLINEHANDLEMOUSEUP:
      return NewState;
    case POLYLINEHANDLEKEYDOWN:
      console.log(payload);
      if (payload.code === "Enter") {
        NewState.state = "IDLE";
      }
      if (payload.key === "Backspace" || payload.key === "Delete") {
        payload.preventDefault();
        if (NewState.selected !== null) {
          NewState.points.splice(NewState.selected, 1);
          NewState.state = "IDLE";
        }
      }
      return NewState;
  }
  return NewState;
};

export default Polyline;

const util_input_is_near_first_user_input_point = (NewState, cx, cy) => {
  var n = NewState.points[NewState.points.length - 1].length;
  if (n >= 2) {
    var dx = Math.abs(cx - NewState.points[NewState.points.length - 1][0][0]);
    var dy = Math.abs(cy - NewState.points[NewState.points.length - 1][0][1]);

    if (dx <= 30 && dy <= 30) {
      return true;
    }
  }
  return false;
};

const util_input_is_near_any_control_point = (NewState, cx, cy) => {
  var n = NewState.points.length;
  for (var a = 0; a < n; a++) {
    var dx = Math.abs(cx - NewState.points[a][0][0]);
    var dy = Math.abs(cy - NewState.points[a][0][1]);
    if (dx <= 30 && dy <= 30) {
      return [true, a];
    }
  }
  return false;
};

const util_input_is_near_any_point = (points, cx, cy) => {
  var n = points.length;
  for (var a = 0; a < n; a++) {
    var dx = Math.abs(cx - points[a][0]);
    var dy = Math.abs(cy - points[a][1]);
    if (dx <= 30 && dy <= 30) {
      return [true, a];
    }
  }
  return false;
};
