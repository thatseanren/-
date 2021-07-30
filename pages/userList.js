import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import axios from "axios";
import Link from 'next/link';
import headerstyle from'../styles/header.module.css';
import Router  from 'next/router';
import server, { option } from "../main_config";
import Header from "./header.js";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DataSet from "../styles/DataSet.module.css";
import Button from '@material-ui/core/Button';
import '../config';
import ForkDialog from '../component/addUser';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import ForDialogWrapper from "../../component/ForkDialog";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            company_name:"",
            userList:[],
            open:false,
            id:"",
        };
        this.myRef = React.createRef();
      }

    userlist = value => {
        const that=this;
        axios.post(server + 'company_user_list', {})
        .then(function (response) {
            console.log(response)
            that.setState({
                userList:response.data.data,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    deleteAgree = value => {
        this.setState({ 
            open:false
        });
        var qs = require('qs');  
        axios.post(server + 'del_company_user',qs.stringify({
            '_id':value
        }))
        .then((response) => {
            console.log(response)
            if(response.status === 200){
            setTimeout( () => {
                this.userlist()
            }, 2000);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    componentDidMount () {
        const that=this;
        axios.post(server + 'login_status', {})
        .then(function (response) {
            console.log(response)   
            that.setState({
                username:response.data.user.name,
                company_name:response.data.user.company_name,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
       
        this.userlist()
    
    }
    render() {

        

    return (
      <div>
        <Header />
        <ForkDialog Syntec_ref={this.myRef} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            确定要删除该员工?
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => this.setState({
                open:false,
            })} color="primary">
              取消
            </Button>
            <Button onClick={() => this.deleteAgree(this.state.id)} color="primary" autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>
        <div className={DataSet.exmaine_home}>
            <div className={DataSet.msgHeading}>
                <div style={{fontXize: '16px !important',fontWeight: '500'}}>公司员工管理</div>
                <Button size="small" variant="contained" color="primary" onClick={() => this.myRef.current(true)}>
                    添加员工
                </Button>
            </div>
            <div>
            {this.state.userList ? this.state.userList.map((item, index) => {
            return (
                <div className={DataSet.examineList}>
                    <div className={DataSet.msgWrapper}>
                        <div className={DataSet.msgTitle}>
                            <div style={{width:"20px",height:"20px",color:"#fff",background:"rgb(219, 224, 233) none repeat scroll 0% 0%",textAlign:"center",borderRadius:"3px",paddingTop:"2px"}}>
                                <VolumeUpIcon style={{fontSize:16}} />
                            </div>
                            <div className={DataSet.msgTitleText}>
                                【公司名称】{this.state.company_name}
                            </div>
                        </div>
                        <div className={DataSet.msgDetails}>
                            <p>员工名称：{item.name}</p>
                            <p>创建时间：<span style={{fontSize: '12px',color: '#a8b0b7 !important'}}>{item.create_time}</span></p>
                        </div>
                    </div>
                    <div style={{display:this.state.username == item.name ? 'none' : 'block',marginTop: '52px'}}>   
                        <Button onClick={() => this.setState({
                            open:true,
                            id:item._id,
                        })} size="small" variant="contained" style={{marginLeft:"12px"}}>删除该员工</Button>
                    </div>
                </div>
                );
            }): ''}
            </div>
        </div>
      </div>
    )
  }
}
  