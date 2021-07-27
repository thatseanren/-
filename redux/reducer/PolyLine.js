import { POLYLINESWITCHSTATE } from "../action/actionConstant";
const defaultState = {
  state: "IDLE",
  points: [],
};

const Polyline = (state = defaultState, { type, payload }) => {
  let NewState = {...state};
  switch (type) {
    case POLYLINESWITCHSTATE:
      return { ...NewState, ...{ state: payload } };
  }
  return NewState;
};

export default Polyline;
