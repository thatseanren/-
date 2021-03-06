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
  const [titleName, setTitleName] = useState("");
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
    axios.post(server + 'add_company_user',qs.stringify({
      'name':titleName,
      'password':dataSetName
    }))
      .then(function (response) {
      response.data.status === 1 ? setErrorShow(2) : setErrorShow(1)
      setTimeout( () => {
        setErrorShow(3)
      }, 3000);
      setTimeout( () => {
            location.reload()
        }, 1000);
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

      <div style={{ position: "absolute", display: "flex",top:"56px"}}>
        <div style={{position: 'fixed',left:"0px",right:"0px",zIndex:"100000",display:errorshow === 3 ?'none':'block' }}>
          {errorshow === 1 ? 
          <Alert severity="error">
            <AlertTitle>??????</AlertTitle>
            ?????????????????????????????????????????? <strong>error</strong>
          </Alert> :
          <Alert severity="success">
            <AlertTitle>??????</AlertTitle>
            ???????????????????????? <strong>success</strong>
          </Alert>
          }
        </div>
        
        <Dialog aria-labelledby="fork_dialog" open={show} className={"fasd"}>
          <DialogTitle onClose={() => {}}> ???????????? </DialogTitle>
          <DialogContent dividers>
            <p className={classes.p14Gray}>
              ???????????????????????????????????????
            </p>
            <div className={classes.flexDiv}>
            <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  ?????????
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)}>
                  ??????????????????
                </p>
                <TextField
                  label=""
                  value={titleName}
                  onChange={(e) => {
                    setTitleName(e.target.value);
                  }}
                  variant="outlined"
                ></TextField>
              </div>
              <div className={classes.flexDiv}>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: 500 }}>
                  ??????
                </p>
                <p className={clsx(classes.p14Gray, classes.Size12)}>
                  ??????????????????
                </p>
                <TextField
                  label=""
                  value={dataSetName}
                  type="password"
                  onChange={(e) => {
                    setDataSetName(e.target.value);
                  }}
                  variant="outlined"
                ></TextField>
              </div>
              

              <div style={{ marginTop: "10px" }}>
                <p className={clsx(classes.p14Gray, classes.MarginBottom16)}>
                  ??????????????????????????????????????????????????????????????????????????????????????????
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
                  {"????????????"}
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
                  {"??????"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}
