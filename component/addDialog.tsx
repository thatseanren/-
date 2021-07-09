import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import {
  FormLabel,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl'
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
import qs from 'qs';
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
      marginTop: '11px',
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
  const [show, setShow] = useState(false);
  const [dataSetName, setDataSetName] = useState("");
  const [description, setDscription] = useState("");
  const [datalist, setDataList] = useState();
  const [errorshow, setErrorShow] = useState(3);
  const [category, setCategory] = React.useState('female');
  const [accessibility, setAccessibility] = useState<string>("public");
  const handleCreate = () => {
    // const obj: httpObject = {
    //   dataSetName: dataSetName,
    //   accessibility: accessibility,
    // };
    // axios.get(`${server}${option.forkDataSet}`);
    var qs = require('qs');
    axios.post(server + 'add_dataset',qs.stringify({
      'tags':show.tag,
      'name':show.data_name||"",
      'description':dataSetName,
      'category':category,
      'ids':show.operation.substring(10,show.operation.length),
      'tasks':description,
      'accessibility':accessibility
    }))
      .then(function (response) {
      response.data.status === 1 ? setErrorShow(2) : setErrorShow(1)
      setTimeout( () => {
        setErrorShow(3)
      }, 3000);
          
      })
      .catch(function (error) {
          console.log(error);
    });
  };
  const error = (event) => {
    setCategory(event.target.value);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  props.Syntec_ref.current = setShow;
  console.log(show)
  
  return (

      <div style={{ position: "absolute", display: "flex" }}>
        <div style={{position: 'fixed',left:"0px",right:"0px",display:errorshow === 3 ?'none':'block' }}>
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
          <DialogTitle onClose={() => {}}> 添加数据集 </DialogTitle>
          <DialogContent dividers>
            <p className={classes.p14Gray}>
              通过开发者工具直接管理、使用、读取数据
            </p>
            <p className={classes.p14Gray}>支持通过标签筛选、使用数据</p>
            <p className={classes.p14Gray}>数据在线可视化，实时查看</p>
            <div className={classes.flexDiv}>
              <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  数据集简介
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)}>
                  简单介绍一下
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
              <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  数据格式
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)}>
                  数据集文件格式
                </p>
                <TextField
                  label=""
                  value={description}
                  onChange={(e) => {
                    setDscription(e.target.value);
                  }}
                  variant="outlined"
                ></TextField>
              </div>
              <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  数据类别
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)} style={{margin: '0px'}}>
                  数据类别
                </p>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={category} onChange={handleChange}>
                    <FormControlLabel value="2dBox" control={<Radio />} label="2DBox" />
                    <FormControlLabel value="3dBox" control={<Radio />} label="3DBox" />
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                    <FormControlLabel value="Segm" control={<Radio />} label="Segm" />
                </RadioGroup>
                </FormControl>
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
                      value={"public"}
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
