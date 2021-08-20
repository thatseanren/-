import { symbol } from "prop-types";

export const UPDATE_COORDINATES = Symbol("update_coordinate");
export const NEXT_FRAME = Symbol("next_frame");
export const PREVIOUS_FRAME = Symbol("previous_frame");
export const UPDATE_IMAGE_ARRAY = Symbol("update_image_array");
export const SETCURRENTCATEGORY = Symbol("set_current_category");

export const REMOVEBOUNDINGBOX = "remove_bounding_box";
export const UPDATEBOUNDINGBOX = Symbol("update_bounding_box");
export const HANDLEMOUSEUP = Symbol("handle_mouse_up");
export const SETSELECTEDBOUNDINGBOX = Symbol("set_selected_bounding_box");
export const SETDRAWMODE = Symbol("set_drawmode");
export const SETCURRENTBOUNDINGBOX = Symbol("set_current_bounding_box");
export const HANDLERESIZE = Symbol("resize");
export const HANDLESAVETOCLOUD = Symbol("save_to_cloud");
export const SWITCHSTYLE = Symbol("switch_style");

export const POLYLINESWITCHSTATE = Symbol("POLYLINESWITCHSTATE");
export const POLYLINEHANDLEMOUSEUP = Symbol("POLYLINEHANDLEMOUSEUP");
export const POLYLINEHANDLEMOUSEDOWN = Symbol("POLYLINEHANDLEMOUSEDOWN");
export const POLYLINEHANDLEKEYDOWN = Symbol("POLYLINEHANDLEKEYDOWN");
export const POLYLINEHANDLEMOUSEMOVE = Symbol("POLYLINEHANDLEMOUSEMOVE");

export const SCALEUP = Symbol("SCALEUP");
export const SCALEDOWN = Symbol("SCALEDOWN");
export const POLYLINESAVETOCLOUD = Symbol("POLYLINESAVETOCLOU")
export const UPDATEPOINT = Symbol("UpdatePointsAction")
export const RESETSTATE = Symbol("RESETSTATE")
export const IMAGEFINISHLOADING = Symbol("IMAGEFINISHLOADING")
export const SELECTPOLYLINE = Symbol("SELECTPOLYLINE")