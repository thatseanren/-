import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import {
  FormLabel,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import server, { option } from "../main_config";
import ShareIcon from '@material-ui/icons/Share';
import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles(
  {
    p14Gray: {
      margin: "0",
      fontSize: "14px",
      color: "#a8b0b7",
      marginBottom: "12px",
    },
    Size12: {
      fontSize: "12px",
    },
    MarginBottom16: {
      marginBottom: "16px",
    },
    flexDiv: {
      display: "flex",
      flexFlow: "column",
    },
    flexMargin: {
      display: "flex",
      flexFlow: "row",
      marginTop: "10px",
    },
  },
  { classNamePrefix: "pureCSS" }
);
interface httpObject {
  dataSetName: string;
  accessibility: string;
}
function ForDialogWrapper(props) {
  return <ForkDialog Syntec_ref={props.Syntec_ref}></ForkDialog>;
}

export default ForDialogWrapper;
export function ForkDialog(props: any): any {
  const classes = useStyles();
  const [show, setShow] = useState<boolean>(false);
  const [dataSetName, setDataSetName] = useState<string>("");
  const [errorshow, setErrorShow] = useState(3);
  const [accessibility, setAccessibility] = useState<string>("Public");
  const handleCreate = () => {
    var qs = require('qs');
    axios.post(server + 'fork_dataset',qs.stringify({
      'name':dataSetName,  //数据集名称
      '_id':show,  //id
      'accessibility':accessibility  //可见范围
    }))
      .then(function (response) {
      console.log(response)
      response.data.status === 1 ? setErrorShow(2) : setErrorShow(1)
      setTimeout( () => {
        setErrorShow(3)
      }, 3000);
          
      })
      .catch(function (error) {
          console.log(error);
    });
  };
  props.Syntec_ref.current = setShow;
  console.log(show)
  return (

      <div style={{ position: "absolute", display: "flex" }}>
        <div style={{position: 'fixed',left:"0px",right:"0px",top: "55px",display:errorshow === 3 ?'none':'block' }}>
          {errorshow === 1 ? 
          <Alert severity="error">
            <AlertTitle>失败</AlertTitle>
            您的数据集分解失败，请重新尝试 <strong>error</strong>
          </Alert> :
          <Alert severity="success">
            <AlertTitle>成功</AlertTitle>
            您的数据集创建成功 <strong>success</strong>
          </Alert>
          }
        </div>

        <Dialog aria-labelledby="fork_dialog" open={show} className={"fasd"}>
          <DialogTitle > Fork数据集 </DialogTitle>
          <DialogContent dividers>
            <p className={classes.p14Gray}>
              通过开发者工具直接管理、使用、读取数据
            </p>
            <p className={classes.p14Gray}>支持通过标签筛选、使用数据</p>
            <p className={classes.p14Gray}>数据在线可视化，实时查看</p>
            <div className={classes.flexDiv}>
              <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  数据集名称
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)}>
                  作为数据集唯一索引
                </p>
                <TextField
                  label=""
                  value={dataSetName}
                  onChange={(e) => {
                    setDataSetName(e.target.value);
                  }}
                  variant="outlined"
                ></TextField>
              </div>
              <div style={{ paddingTop: "20px" }}>
                <FormLabel component="description" children={"可见范围"} />
                <RadioGroup
                  value={accessibility}
                  onChange={(e) => {
                    setAccessibility(e.target.value);
                  }}
                >
                  {" "}
                  <div className={classes.flexMargin}>
                    {" "}
                    <Radio
                      color="primary"
                      value={"Public"}
                      style={{ width: "24px", height: "24px" }}
                    />
                    <PublicIcon style={{ padding: "9px 9px 9px 0" }} />
                    <div style={{ lineHeight: "calc((1.5rem + (9px * 2))/2)" }}>
                      <p style={{ fontSize: "14px", margin: "0" }}>公开</p>
                      <p style={{ fontSize: "12px", margin: "0" }}>
                        任何人都可以搜索，查看，查询和Fork此公开数据集中的所有文件
                      </p>
                    </div>
                  </div>
                  <div className={classes.flexMargin}>
                    {" "}
                    <Radio
                      value={"private"}
                      color="primary"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <PersonIcon style={{ padding: "9px 9px 9px 0" }} />
                    <div style={{ lineHeight: "calc((1.5rem + (9px * 2))/2)" }}>
                      <p style={{ fontSize: "14px", margin: "0" }}>私有</p>
                      <p style={{ fontSize: "12px", margin: "0" }}>
                        您控制谁可以查看，查询和下载此数据集
                      </p>
                    </div>
                  </div>{" "}
                </RadioGroup>
              </div>

              <div style={{ marginTop: "10px" }}>
                <p className={clsx(classes.p14Gray, classes.MarginBottom16)}>
                  确认创建数据集即代表您已阅读并同意平台的用户服务协议和隐私政策
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ alignSelf: "flex-start", marginRight: "10px" }}
                  onClick={() => {
                    handleCreate();
                    setShow(false);
                  }}
                >
                  {"确认创建"}
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  style={{ alignSelf: "flex-start", marginRight: "10px" }}
                  onClick={() => {
                    // handleCreate();
                    setShow(false);
                  }}
                >
                  {"取消"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}
