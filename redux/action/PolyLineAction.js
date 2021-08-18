import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,
  POLYLINEHANDLEKEYDOWN,
  POLYLINEHANDLEMOUSEMOVE,
  POLYLINESAVETOCLOUD,
  UPDATEPOINT,
  SELECTPOLYLINE,
  RESETSTATE
} from "./actionConstant";

export const createSwtichStateAction = (state) => ({
  type: POLYLINESWITCHSTATE,
  payload: state,
});

export const createPOLYLINEHandleMouseUpAction = (payload) => ({
  type: POLYLINEHANDLEMOUSEUP,
  payload: payload,
});
export const createPOLYLINEHandleMouseDownAction = (payload) => ({
  type: POLYLINEHANDLEMOUSEDOWN,
  payload: payload,
});

export const createPOLYLINEHandleKeyDownAction = (payload) => ({
  type: POLYLINEHANDLEKEYDOWN,
  payload: payload,
});

export const createPOLYLINEHandleMouseMoveAction = (payload) => ({
  type: POLYLINEHANDLEMOUSEMOVE,
  payload: payload,
});

export const createPOLYLINEUPLOADAction = (payload) => ({
  type: POLYLINESAVETOCLOUD,
  payload: payload,
});
export const createUpdatePointsAction = (payload) => ({
  type: UPDATEPOINT,
  payload: payload,
});
export const createResetStateAction = (payload) => ({
  type: RESETSTATE,
  payload: payload,
});
export const createSelectPolylineAction = (payload) => ({
  type: SELECTPOLYLINE,
  payload: payload,
});
