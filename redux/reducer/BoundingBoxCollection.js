import {
  REMOVEBOUNDINGBOX,
  UPDATEBOUNDINGBOX,
  HANDLEMOUSEUP,
  HANDLERESIZE,
  HANDLESAVETOCLOUD,
} from "../action/actionConstant";
import FAWAI_ip, { option, test_ip } from "../../main_config";
class Frame {
  constructor() {
    this.annotation = [];
  }
  setProperty(key, value) {
    this[key] = value;
  }
  removeProperty(key) {
    delete this[key];
  }
}
class Annotation {
    //每一次mouseUP，都创建一个新的Annotation对象。
    //每一次update（从服务器拿到的大盒子对象，）
  constructor(x, y, drawX, drawY, width, height, category) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.category = category;
    this.drawX = drawX;
    this.drawY = drawY;
  }
}
const annotation = (x, y, drawX, drawY, width, height, category) => {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.category = category;
  this.drawX = drawX;
  this.drawY = drawY;
  return this;
};
const state = [];
for (let a = 0; a < 50; a++) {
  state.push([]);
}
const BoundingBoxCollection = (
  state = Array.from(Array(50), () => new Frame()),
  { type, payload }
) => {
  let NewState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case HANDLERESIZE:
      console.log("Handling resize");
      return NewState;
    case REMOVEBOUNDINGBOX:
      NewState[payload.currentFrameIndex].annotation.splice(
        payload.currentBoundingBoxIndex,
        1
      );
      return NewState;
    case UPDATEBOUNDINGBOX:
      NewState[payload.currentFrameIndex].annotation.splice(
        payload.currentBoundingBoxIndex,
        1,
        new Annotation(payload.x,payload.y,payload.drawX,payload.drawY,payload.width, payload.height,payload.category,)
      );
      return NewState;
    case HANDLEMOUSEUP:
      NewState[payload.currentFrameIndex].annotation[payload.currentBoundingBoxIndex] =  new Annotation(payload.x,payload.y,payload.drawX,payload.drawY,payload.width, payload.height,payload.category,)
      return NewState;0
    case HANDLESAVETOCLOUD:
      const { _id, _taskID, sequence } = payload;
      const annotation = JSON.stringify(NewState);
      const SynchronouseAnnotation_UI = new XMLHttpRequest();
      SynchronouseAnnotation_UI.open(
        "POST",
        `${FAWAI_ip}${option.sendAnnotation}`
      );
      SynchronouseAnnotation_UI.onreadystatechange = function () {
        // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log(this);
        }
      };
      SynchronouseAnnotation_UI.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      SynchronouseAnnotation_UI.setRequestHeader("Authorization", "bdta");
      SynchronouseAnnotation_UI.withCredentials = true;
      SynchronouseAnnotation_UI.send(
        `data=${annotation}&_id=${_taskID}&index=${sequence}`
      );
      return NewState;
    default:
  }
  return state;
};
export default BoundingBoxCollection;
