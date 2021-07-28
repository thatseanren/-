import {
  POLYLINESWITCHSTATE,
  POLYLINEHANDLEMOUSEUP,
  POLYLINEHANDLEMOUSEDOWN,
  POLYLINEHANDLEKEYDOWN,
  POLYLINEHANDLEMOUSEMOVE
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
  payload:payload,
})