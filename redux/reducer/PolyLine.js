import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,
  POLYLINEHANDLEKEYDOWN,
  POLYLINEHANDLEMOUSEMOVE
} from "../action/actionConstant";
const defaultState = {
  state: "IDLE",
  points: [],
  selected: null,
  on_change_point: null,
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

      //when we change the points of NewState,
      if (NewState.state === "IDLE") {
        let is_near_any_polyline = util_input_is_near_any_polyline(NewState.points, payload.offsetX, payload.offsetY)
        if (Object.keys(is_near_any_polyline).length) {
          NewState.selected = parseInt(Object.keys(is_near_any_polyline)[0]);
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
        let is_still_the_same_selected = util_input_is_near_any_point(
          NewState.points[NewState.selected],
          payload.offsetX,
          payload.offsetY
        );
        if (is_still_the_same_selected) {
          NewState.state = "ON_Changing_Selected";
          NewState.on_change_point = is_still_the_same_selected[1]
          console.log("onpoint", is_still_the_same_selected[1]);
        } else {
          NewState.state = "IDLE";
        }
      }
      console.log(NewState, NewState.state);
      return NewState;
    case POLYLINEHANDLEMOUSEUP:
      console.log(payload)
      if (NewState.state === "ON_Changing_Selected") {
        NewState.points[NewState.selected][NewState.on_change_point] = [payload.offsetX, payload.offsetY]
        NewState.state = "IDLE";
      }
      return NewState;
    case POLYLINEHANDLEMOUSEMOVE:
      // console.log(1)
      if (NewState.state === "ON_Changing_Selected") {
        NewState.points[NewState.selected][NewState.on_change_point] = [payload.offsetX, payload.offsetY]
      }
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

const util_input_is_near_any_polyline = (arryOfPolyline, cx, cy) => {
  const result = {}
  arryOfPolyline.forEach((polyline, index) => {
    polyline.forEach((points, ind) => {
      var dx = Math.abs(cx - points[0]);
      var dy = Math.abs(cy - points[1]);
      if (dx <= 30 && dy <= 30) {
        //This means user has clicked on a point where is from index of Polyline, of ind of that polyline
        result[index] = {
          polyline: index,
          point: ind,
        }
      }
    })
  })
  return result
}