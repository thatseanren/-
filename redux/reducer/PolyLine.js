import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,POLYLINEHANDLEKEYDOWN
} from "../action/actionConstant";
const defaultState = {
  state: "IDLE",
  points: [],
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
        NewState.points.push([[payload.offsetX, payload.offsetY]]);
        NewState.state = "DRAW_ON_GOING";
      } else if (NewState.state === "DRAW_ON_GOING") {
        NewState.points[NewState.points.length - 1].push([
          payload.offsetX,
          payload.offsetY,
        ]);
      }
      return NewState;
    case POLYLINEHANDLEMOUSEUP:
      return NewState;
    case POLYLINEHANDLEKEYDOWN:
        console.log(payload)
        if(payload.code === "Enter"){
            NewState.state = "IDLE"
        }
      return NewState;
  }
  return NewState;
};

export default Polyline;
