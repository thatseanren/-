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

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"Adcccmin",
        };
      }

    
      componentDidMount () {
       
    
        }
    render() {

        

    return (
      <div>
        <Header />
        <div className={DataSet.exmaine_home}>
            <div className={DataSet.msgHeading}>
                <div style={{fontXize: '16px !important',fontWeight: '500'}}>数据集审核</div>
            </div>
            <div>
                <div className={DataSet.examineList}>
                    <div className={DataSet.msgWrapper}>
                        <div className={DataSet.msgTitle}>
                            <div style={{width:"20px",height:"20px",color:"#fff",background:"rgb(219, 224, 233) none repeat scroll 0% 0%",textAlign:"center",borderRadius:"3px",paddingTop:"2px"}}>
                                <VolumeUpIcon style={{fontSize:16}} />
                            </div>
                            <div className={DataSet.msgTitleText}>
                                【数据集项目】项目审核通知
                            </div>
                        </div>
                        <div className={DataSet.msgDetails}>
                            <p>创建人：Admin</p>
                            <p>项目名称：5555</p>
                            <p>创建时间：<span style={{fontSize: '12px',color: '#a8b0b7 !important'}}>2021-04-23 10:01</span></p>
                        </div>
                    </div>
                    <div style={{marginTop: '82px'}}>
                        <Button size="small" variant="contained">拒绝</Button>
                        <Button size="small" variant="contained" color="primary" style={{marginLeft:"12px"}}>
                            通过
                        </Button>
                    </div>
                </div>
                <div className={DataSet.examineList}>
                    <div className={DataSet.msgWrapper}>
                        <div className={DataSet.msgTitle}>
                            <div style={{width:"20px",height:"20px",color:"#fff",background:"rgb(219, 224, 233) none repeat scroll 0% 0%",textAlign:"center",borderRadius:"3px",paddingTop:"2px"}}>
                                <VolumeUpIcon style={{fontSize:16}} />
                            </div>
                            <div className={DataSet.msgTitleText}>
                                【数据集项目】项目审核通知
                            </div>
                        </div>
                        <div className={DataSet.msgDetails}>
                            <p>创建人：Admin</p>
                            <p>项目名称：5555</p>
                            <p>创建时间：<span style={{fontSize: '12px',color: '#a8b0b7 !important'}}>2021-04-23 10:01</span></p>
                        </div>
                    </div>
                    <div style={{marginTop: '82px'}}>
                        <Button size="small" variant="contained">拒绝</Button>
                        <Button size="small" variant="contained" color="primary" style={{marginLeft:"12px"}}>
                            通过
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
  