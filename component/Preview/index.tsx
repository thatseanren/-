import { PinDropSharp } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import server_ip, { option } from "../../main_config";
import dynamic from "next/dynamic";
interface Properties {
  width: number;
  height: number;
  datasetID: string;
}
export const Preview = (props: Properties) => {
  const [files, setFiles] = React.useState(null);
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
          res(filelists.data);
        } else {
          rej(e.currentTarget.status);
        }
      });
      httpReq.send();
    });
  const getUrl = (frame, key) => {
    return files[frame][key];
  };

  React.useEffect(() => {
    
    Fetchfiles()
      .then(
        (result) => {
          console.log("<Preview /> line 40", result);
          setFiles(result);
        },
        (result) => {
          console.log(result, "Failed");
        }
      )
      .catch((e) => {
        console.log("catch error, PreviewComponentDidMOunt ", e);
      });
  }, [props.datasetID]);
  return <>  </>;
};
