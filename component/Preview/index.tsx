import React from "react";
import server_ip, { option } from "../../main_config";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
interface Properties {
  width: number;
  height: number;
  datasetID: string;
}
export const Preview = (props: Properties) => {
  const [files, setFiles] = React.useState(null);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const Fetchfiles = () =>
    new Promise((res, rej) => {
      let httpReq = new XMLHttpRequest();
      httpReq.open(
        "get",
        server_ip + option.datasetFiles + "?_id=" + props.datasetID
      );
      httpReq.withCredentials = true;
      httpReq.setRequestHeader("Authorization", "bdta");
      httpReq.addEventListener("load", (e) => {
        if (e.currentTarget.status === 200) {
          let filelists = JSON.parse(e.currentTarget.responseText);
          res(filelists);
        } else {
          rej(e.currentTarget.status);
        }
      });
      httpReq.send();
    });

  const getUrl = (frame, key) => {
    return files[frame][key];
  };
  const makeDownloadURL = (path) => `${server_ip}download?url=${path}`;
  const MakePCD = (url) => {
    const pcd = useLoader(PCDLoader, getUrl(currentFrame, "pcd"));
    return <primitive object={pcd}></primitive>;
  };
  const makeJPG = (url) => {};
  const makeBox = (url) => {};
  const changeFrame = (arg) => {
    if (arg === "+") {
      if (currentFrame < 49) {
        setCurrentFrame(currentFrame + 1);
      }
    }
    if (arg === "-") {
      if (currentFrame >= 0) {
        setCurrentFrame(currentFrame - 1);
      }
    }
    if (typeof arg === "number") {
      if (arg >= 0 && arg <= 49) {
        setCurrentFrame(arg);
      } else {
        null;
      }
    }
  };
  const dynamicLoad = async () => {
    const a = await import("raphael");
    const Raphael = a.default;
  };
  React.useEffect(() => {
    // var paper = Raphael(30,30,30,30)
    dynamicLoad();
    Fetchfiles()
      .then(
        (result) => {
          let file = result.map((frame) => {
            return {
              json: makeDownloadURL(frame.json),
              pcd: makeDownloadURL(frame.pcd),
              jpg: makeDownloadURL(frame.jpg),
            };
          });
          setFiles(file);
        },
        (result) => {
          console.log(result, "Failed");
        }
      )
      .catch((e) => {
        console.log("catch error, PreviewComponentDidMOunt ", e);
      });
  }, [props.datasetID]);
  return (
    <div>
      {" "}
      <IconButton
        onClick={() => {
          changeFrame("+");
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
      {currentFrame}
      <Canvas> {files !== null && <MakePCD />}</Canvas>
      <IconButton
        onClick={() => {
          changeFrame("-");
        }}
      >
        {" "}
        <ArrowBackIcon />
      </IconButton>{" "}
    </div>
  );
};

export default connect(null, null)(Preview);
