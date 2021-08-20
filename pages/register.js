import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Link from 'next/link';
import headerstyle from'../styles/header.module.css';
import Router  from 'next/router';
import server, { option } from "../main_config";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DataSet from "../styles/DataSet.module.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(
    {
    MuiInputBaseRoot: {
        borderColor: "0",
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
    },
    { classNamePrefix: "pureCSS" }
  );
// const classes = useStyles();
export default class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
        };
      }

    
      componentDidMount () {
       
    
      }
        // const classes = useStyles();
    render() {

    return (
      <div className={DataSet.v_application_wrap}>
        <div className={DataSet.v_content}>
            <div className={DataSet.v_content_wrap}>
                <div style={{width:"100%",height:"100%"}}>
                    <div className={DataSet.page_desktop}>
                      <div>
                        <div className={DataSet.login_home}>
                            <div style={{padding:"48px 0px 25px"}}>
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <img style={{height:"48px"}} src="/logoT.png" />
                                </div>
                            </div>
                            <div className={DataSet.sign_in_desktop}>
                                <div className={DataSet.login_title}>
                                    注册
                                </div>
                                <div style={{display:"flex",justifyContent:"center",marginBottom:"30px"}}>
                                  <span style={{fontSize:"12px"}}>注册账号以访问<span style={{color:"#5a3cff",letterSpacing:"1px",marginLeft:"3px"}}>数据集</span></span>
                                </div>
                                <div style={{marginTop:"30px"}}>
                                  <TextField
                                      label="手机号"
                                      style={{border:"0px"}}
                                      value={this.state.username}
                                      className={DataSet.login_input}
                                      onChange={(e) => {
                                          this.setState({
                                              username: e.target.value
                                          });
                                      }}
                                      variant="outlined"
                                      >
                                  </TextField>
                                </div>
                                <div style={{marginTop:"30px"}}>
                                  <TextField
                                      label="用户名"
                                      style={{border:"0px"}}
                                      value={this.state.username}
                                      className={DataSet.login_input}
                                      onChange={(e) => {
                                          this.setState({
                                              username: e.target.value
                                          });
                                      }}
                                      variant="outlined"
                                      >
                                  </TextField>
                                </div>
                                <div style={{marginTop:"30px"}}>
                                  <TextField
                                      label="密码"
                                      style={{border:"0px"}}
                                      value={this.state.password}
                                      className={DataSet.login_input}
                                      type="password"
                                      onChange={(e) => {
                                          this.setState({
                                              password: e.target.value
                                          });
                                      }}
                                      variant="outlined"
                                      >
                                  </TextField>
                                </div>
                                <div style={{marginTop:"30px"}}>
                                  <TextField
                                      label="验证码"
                                      style={{border:"0px"}}
                                      value={this.state.username}
                                      className={DataSet.login_input}
                                      onChange={(e) => {
                                          this.setState({
                                              username: e.target.value
                                          });
                                      }}
                                      variant="outlined"
                                      >
                                  </TextField>
                                </div>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{width:"100%",marginTop:"30px",height:"56px",fontWeight: "600",fontSize: "16px",marginBottom:"20px"}}
                                  onClick={() => {
                                    handleCreate();
                                    setShow(false);
                                  }}
                                >
                                  {"注册"}
                                </Button>
 
                            </div>
                        </div>
                        <div style={{float:"right"}}>
                          <div style={{display: "flex",justifyContent:"space-around",alignContent:"center",marginTop:"12px"}}>
                            <div style={{display:"flex"}}>
                              <div className={DataSet.login_span}>隐私政策</div>
                              <div className={DataSet.login_span}>服务协议</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
  