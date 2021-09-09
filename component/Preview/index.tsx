import { PinDropSharp } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import server_ip, { option } from "../../main_config";

interface Properties {
  width: number;
  height: number;
  datasetID: string;
}

const Preview = (props: Properties) => {
  const [flies, setFiles] = React.useState(null);
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
  React.useEffect(() => {
    Fetchfiles()
      .then(
        (result) => {
          setFiles(result);
        },
        (result) => {
          console.log(result, "Failed");
        }
      )
      .catch((e) => {
        console.log("catch error, PreviewComponentDidMOunt ", e);
      });
  });
  return <></>;
};

export default connect(null, null)(Preview);
