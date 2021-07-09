import React, { useState,useEffect  } from "react";
import Header from './header.js';
import Tag from '../styles/DataSet.module.css'
import server_ip from '../main_config';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Link from 'next/link';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import Radio from "@material-ui/core/Radio";
import Router  from 'next/router';
import AlertTitle from '@material-ui/lab';
import {
    FormLabel,
    DialogContent,
    DialogTitle,
    RadioGroup,
  } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl'

export default class Detailed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbIndex: 0,
            dataIndex:"",
            listShow:0,
            dataId:"",
            errorspan:"",
            errorShow:"none",
            dataNmae:"",//数据集名称
            category:"2DBox",
            tag:[],
            dataBoxlist:[],
            type:"none",
            img:"",
            numb:"",
            department:"",
            time:"",
            names:"",
            datavalue:"",

        };
    }
    tarvalue = value => {
        this.setState({
            datavalue :value
        })
        console.log(value)
    }
    next = value => {
        console.log(this.state.BreadcrumbIndex)
        var numb=this.state.BreadcrumbIndex
        console.log(this.state.dataIndex.length);
        var that =this
        if(this.state.BreadcrumbIndex === 0 ){
            if(this.state.dataIndex || this.state.dataIndex === 0){
                numb=this.state.BreadcrumbIndex*1+1
            } else {
                this.error("请选择一个数据集")
            }
        } else if (this.state.BreadcrumbIndex === 1 ){
            if(this.state.dataNmae){
                numb=this.state.BreadcrumbIndex*1+1
            } else {
                this.error("请输入项目名称")
            }
        } else if(this.state.BreadcrumbIndex === 2){
            var qs = require('qs');
            
            axios.post(server_ip + 'add_dtask',qs.stringify({
                '_id':this.state.dataId,
                'name':this.state.dataNmae,
                'type':this.state.category,
                'tags':this.state.tag.toString()
            }))
            .then(function (response) {
                console.log(response)
                if(response.status === 200){
                    that.setState({
                        type :'flex'
                    })
                    var data = response.data.id
                    setTimeout( () => {
                        Router.push({
                            pathname:'./taskdetail/'+data
                        })
                    }, 2000);
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        this.setState({
            BreadcrumbIndex :numb,
            listShow:numb
        })
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.setData()
        }
      }

    error = value => {
        this.setState({
            errorspan :value,
            errorShow:"flex"
        })
        setTimeout( () => {
            this.setState({
                errorShow:"none"
            })
        }, 3000);
    }
    setData = value => {
        const that=this
        axios.get(server_ip + 'get_dataset_list?accessibility=private&keywords='+this.state.datavalue,{})
        .then(function (response) {
            console.log(response)
            that.setState({
                dataBoxlist:response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentDidMount () {

        this.setData()
        

    }
    render() {
        return (
            
            <div className={Tag.tagHome}>
                <Header />
                <Alert style={{display:this.state.type}} severity="success">
                    您的标注任务创建成功 <strong>success</strong>
                </Alert>
                <div className={Tag.taghometop}>
                    <div className={Tag.filehome}>
                        <div style={{overflow:"hidden"}}>
                            <div className={Tag.tgaTitle} style={{float:'left'}}>新建标注项目</div>
                            <div style={{display: 'flex',marginLeft: '168px'}}>
                            <div className={this.state.BreadcrumbIndex === 0 ? Tag.BreadcrumbsListStyle : (this.state.BreadcrumbIndex > 0 ? Tag.BreadcrumbsListGreen : Tag.BreadcrumbsList)}>
                                <div className={Tag.BreadcrumNumb}><span>1</span></div>
                                <div style={{fontSize:"14px"}}>选择标注数据</div>
                                <div className={Tag.stepperDivider}></div>
                            </div>
                            <div className={this.state.BreadcrumbIndex === 1 ? Tag.BreadcrumbsListStyle : (this.state.BreadcrumbIndex > 1 ? Tag.BreadcrumbsListGreen : Tag.BreadcrumbsList)}>
                                <div className={Tag.BreadcrumNumb}><span>2</span></div>
                                <div style={{fontSize:"14px"}}>填写基本信息</div>
                                <div className={Tag.stepperDivider}></div>
                            </div>
                            <div className={Tag.BreadcrumbsList} className={this.state.BreadcrumbIndex === 2 ? Tag.BreadcrumbsListStyle : Tag.BreadcrumbsList}>
                                <div className={Tag.BreadcrumNumb}><span>3</span></div>
                                <div style={{fontSize:"14px"}}>完成</div>
                            </div>

                            </div>
                        </div>
                        <div className={Tag.tagBoxIndex}>
                            <div className={Tag.tagBoxList} style={{overflow: 'hidden',height:"690px",overflowY: 'auto',display:this.state.listShow === 0 ?'block' : 'none'}}>
                                <div className={Tag.tagBoxTitle}>
                                选择数据集
                                </div>
                                <Autocomplete  
                                    style={{width:'300px'}}
                                    freeSolo
                                    size="small"
                                    options={["fdsa", "dfsafsda"]}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="数据集名称"
                                        margin="normal"
                                        onKeyDown={(e)=>this.handleKeyDown(e)}
                                        onChange={(e)=> this.tarvalue(e.target.value)}
                                        defaultValue="44"
                                        variant="outlined"
                                        InputProps={{
                                        endAdornment: <SearchIcon style={{ fontSize: "24px" }} />,
                                        }}
                                    />
                                    )}
                                />
                                <div className={Tag.dataList}>
                                {this.state.dataBoxlist ? this.state.dataBoxlist.map((item,index) =>{
                                     return(
                                    <div className={this.state.dataIndex === index ? clsx(Tag.dataListBox,Tag.boxIndex) : Tag.dataListBox} key={item._id} onClick={() => {
                                        this.setState({
                                            dataIndex :index,
                                            dataId:item._id,
                                            tag:item.tags,
                                            img:server_ip+'download?url='+item.img,
                                            numb:item.num,
                                            department:item.department,
                                            time:item.create_time,
                                            names:item.name
                                        })
                                      }}>
                                        <div className={Tag.boxImg}>
                                            <img className={Tag.boxImgBack} src={item.img ? server_ip+'download?url='+item.img : '/imgqs.jpg'} />
                                            <div style={{position: 'absolute',right:"6px",top:"6px"}}>
                                                {this.state.dataIndex === index ? 
                                                <RadioButtonCheckedRoundedIcon style={{color:"#54ded1",fontSize:24}} /> :
                                                <RadioButtonUncheckedRoundedIcon style={{color:"#fff",fontSize:24}} />
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className={Tag.boxSpanimg}>
                                            <div style={{fontWeight:"600",marginBottom:"10px"}}>
                                            {item.name}
                                            </div>
                                            <div style={{fontSize:"12px"}}>
                                                数量 {item.num}
                                            </div>
                                            <div className={Tag.userName}>
                                                <div style={{display: 'flex',alignItems: 'center'}}> 
                                                    <div style={{borderRadius:"50%",overflow:"hidden",height: '28px'}}>
                                                        <img style={{width:"28px"}} src="/index.png" />
                                                    </div>
                                                    <div style={{marginLeft: '10px',fontWeight: '600'}}>
                                                    {item.department} 
                                                    </div>
                                                </div>
                                                <div style={{color: 'rgb(190, 192, 208)'}}>
                                                {item.create_time}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    )
                                }): ""}
                                </div>
                            </div>
                            <div className={Tag.tagBoxList} style={{height:"600px",display:this.state.listShow === 1 ?'block' : 'none'}}>
                                <div className={Tag.tagBoxTitle}>
                                选择数据集
                                </div>
                                <Autocomplete  
                                    style={{width:'300px'}}
                                    freeSolo
                                    size="small"
                                    options={["fdsa", "dfsafsda"]}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="请输入项目名称"
                                        margin="normal"
                                        onChange={(e)=> {
                                            this.setState({
                                                dataNmae :e.target.value
                                            })
                                        }}
                                        defaultValue="44"
                                        variant="outlined"
                                        InputProps={{
                                        endAdornment: <SearchIcon style={{ fontSize: "24px" }} />,
                                        }}
                                    />
                                    )}
                                />
                                <div className={Tag.tagBoxTitle} style={{marginTop:"30px"}}>
                                    标注类型
                                </div>
                                <div className={Tag.tagType}>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={this.state.category} onClick={() => {
                                        this.setState({
                                            category :event.target.value
                                        })
                                      }}>
                                            <FormControlLabel value="2DBox" control={<Radio />} label="2DBox" />
                                            <FormControlLabel value="3DBox" control={<Radio />} label="3DBox" />
                                            <FormControlLabel value="2D多边形" control={<Radio />} label="Both" />
                                            <FormControlLabel value="Segm" control={<Radio/>} label="Segm" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                
                            </div>
                            <div className={Tag.tagBoxList} style={{height:"600px",display:this.state.listShow === 2 ?'block' : 'none'}}>
                                <div className={Tag.tagBoxTitle}>
                                数据集选择
                                </div>
                                <div className={Tag.dataListBox}>
                                        <div className={Tag.boxImg} style={{width: '300px'}}>
                                            <img className={Tag.boxImgBack} src={this.state.img} />
                                        </div>
                                        <div className={Tag.boxSpanimg} style={{width:"300px"}}>
                                            <div style={{fontWeight:"600",marginBottom:"10px"}}>
                                            {this.state.names}
                                            </div>
                                            <div style={{fontSize:"12px"}}>
                                                数量 {this.state.numb}
                                            </div>
                                            <div className={Tag.userName}>
                                                <div style={{display: 'flex',alignItems: 'center'}}> 
                                                    <div style={{borderRadius:"50%",overflow:"hidden",height: '28px'}}>
                                                        <img style={{width:"28px"}} src="/index.png" />
                                                    </div>
                                                    <div style={{marginLeft: '10px',fontWeight: '600'}}>
                                                    {this.state.department} 
                                                    </div>
                                                </div>
                                                <div style={{color: 'rgb(190, 192, 208)'}}>
                                                {this.state.time}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                
                                <div className={Tag.tagBoxTitle} style={{marginTop:"30px"}}>
                                    标注类型
                                </div>
                                <div style={{display: 'flex',fontSize: '14px',marginBottom: '16px',marginLeft: '24px'}}>
                                    <div style={{flex: '0 0 120px',color: 'rgb(137, 138, 150)',fontWight: 'bold'}}>
                                    项目名称:
                                    </div>
                                    <div style={{flex: '1 1 0%'}}>
                                        {this.state.dataNmae}
                                    </div>
                                </div>
                                <div style={{display: 'flex',fontSize: '14px',marginBottom: '16px',marginLeft: '24px'}}>
                                    <div style={{flex: '0 0 120px',color: 'rgb(137, 138, 150)',fontWight: 'bold'}}>
                                    标注类型:
                                    </div>
                                    <div style={{flex: '1 1 0%'}}>
                                        {this.state.category}
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className={Tag.basicInfoWindow}>
                                {
                                    this.state.BreadcrumbIndex > 0 ?
                                    <Button size="large" style={{width:"100px",marginRight:"20px",color:"#303f9f"}} onClick={() => {
                                        var numb=this.state.BreadcrumbIndex*1-1
                                        this.setState({
                                            BreadcrumbIndex :numb,
                                            listShow:numb
                                        })
                                      }} >{this.state.BreadcrumbIndex === 0 ? "取消" : "上一步"}</Button> :
                                      <Link href="/tools/annotation/">
                                        <a><Button size="large" style={{width:"100px",marginRight:"20px",color:"#303f9f"}} >取消</Button></a>
                                    </Link>
                                      
                                }
                                
                                <Button variant="contained" size="large" color="primary" onClick={() => this.next()} >
                                    {this.state.BreadcrumbIndex === 2 ? "完成" : "下一步"}
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}