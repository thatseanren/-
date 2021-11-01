import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import axios from "axios";
import Link from 'next/link';
import headerstyle from'../styles/header.module.css';
import Router  from 'next/router';
import server, { option } from "../main_config";
import Header from "./header.js";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import DataSet from "../styles/DataSet.module.css";
import '../config';
import Alert from '@mui/material/Alert';
import Radio from "@mui/material/Radio";
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import {
  FormLabel,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from "@mui/material";
import 'antd/dist/antd.css';
import { UploadOutlined,InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import TextField from "@mui/material/TextField";
import { func, object } from 'prop-types';
// import ForDialogWrapper from "../../component/ForkDialog";


export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          dataname:'',//数据名称
          dataintroduce:'',//数据集介绍
          dataformat:'',//数据格式
          tgaName:'',//数据集标签搜索d
          datacategory:'2dBox',//数据类别
          tagList:[],//全部数据标签
          tagIndex:[],//已选数据标签
          searchTag:[],//标签搜索结果
          section:'',//路段信息字段
          weather:'',//天气信息字段
          way_type:'',//道路行为字段
          ego_type:'',//主车行为字段
          errorspan: '',
          errorShow: "none",
          file:'',//数据上传
          severity:'',//提示类型
      };
    }
    tarvalue = value => {
        this.setState({
          dataname :value
        })
    }

    submit = value => {
      const list = this.state.tagList
      const that = this
      let listIndex = []
      list.map(function(item,index){
        if(item[Object.keys(item)]){
          listIndex.push(Object.keys(item)[0])
        }
      });
      // console.log(listIndex.join(','))
      var qs = require('qs');  
      axios.post(server + 'add_dataset_file',qs.stringify({
          'file':this.state.file,  //文件上传
          'name':this.state.dataname,  //数据集名称
          'tags':this.state.tagIndex.join(','),  //数据集标签
          'tasks':this.state.dataformat,  //数据集类型（2D/3D）
          'category':this.state.datacategory,  //数据集格式
          'description':this.state.dataintroduce, //数据集简介
          'section':this.state.section,//路段信息字段
          'weather':this.state.weather,//天气信息字段
          'way_type':this.state.way_type,//道路行为字段
          'ego_type':this.state.ego_type,//主车行为字段
      }))
      .then((response) => {
        console.log(response)
          if(response.data.status == 0){
            that.error(response.data.info,'error')
          } else {
            this.props.getdata(false);
            that.error(response.data.info,'success')
            
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }
    
    error = (value,c) => {
      this.setState({
        errorspan: value,
        errorShow: "flex",
        severity:c,
      });
      setTimeout(() => {
        this.setState({
          errorShow: "none",
        });
      }, 3000);
    };
    handleChange = (event) => {
      this.setState({
        datacategory :event.target.value
      })
    };
    handleRadio = (a,event,c) => {
      let temp = JSON.stringify(this.state.tagList)
      temp = JSON.parse(temp)
      temp[a][c] = event.target.checked
      this.setState({
        tagList:temp
      })
      // this.forceUpdate();
    }
    SearchTag = value => {  //标签搜索
      var taglist = this.state.tagList
      var list = []
      for(let i = 0 ; i< taglist.length;i++){
        if(taglist[i].match(value)) {
          list.push(taglist[i])
        }
      }
      value == '' ? list = [] : ''
      this.setState({
        searchTag:list
      })
    }

    tagchecked = value => {
      var tagIndex = this.state.tagIndex
      var tagType = 0
      console.log(tagIndex)
      if(tagIndex.length>0){
        for(let i = 0;i<tagIndex.length;i++){
          if(tagIndex[i] == value){
            tagType = 1;
            tagIndex.splice(i,1);
          }
        }
        if(tagType == 0){
          tagIndex.push(value)
        }
      } else {
        tagIndex.push(value)
      }
      console.log(tagIndex)
      this.setState({
        tagIndex:tagIndex
      })

    }

    componentDidMount () {
      const that = this
      var qs = require('qs');
      axios.post(server + 'get_record_tag_list',qs.stringify({
          'tga_name':that.state.tgaName,
      }))
      .then((response) => {
          console.log(response.data.data)
          var tagList = [];
          var tag = response.data.data
          tag.map(function(k,v){
            var o = {};
            // o[k.tag] = false
            tagList.push(k.tag) 
          })
          that.setState({
            tagList:tagList,
          })

      })
      .catch(function (error) {
          console.log(error);
      });
    }
    render() {
      const { Dragger } = Upload;
      const that = this
      const props = {
        name: 'file',
        multiple: true,
        maxCount:1,
        action: server + 'dataset_upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            that.setState({
              file:info.file.response.result,
            })
            console.log(info.file.response.result);
          }
          if (status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
          } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
          }
        },
        beforeUpload: file => {
          var point = file.name.lastIndexOf(".");  
          var type = file.name.substr(point);  
          if(type!='.zip'&&type!='.rar'){
            message.error('请上传压缩包格式文件');
            return Upload.LIST_IGNORE;
          }
          var time = new Date();//单次上传向上提交时间
          var click_timestap = time.getTime();
          file['timestap']=click_timestap
          return file;
        },
        // beforeUpload(file) {
        //   Upload.LIST_IGNORE;
        //   var point = file.name.lastIndexOf(".");  
        //   var type = file.name.substr(point);  
        //   if(type!='.zip'&&type!='.rar'){
        //     return false;
        //   }
        //   var time = new Date();//单次上传向上提交时间
        //   var click_timestap = time.getTime();
        //   file['timestap']=click_timestap
        //   return file;
        // },
        onDrop(e) {
          console.log(e);
        },
      };
        

    return (
      <div className={DataSet.exmaine_home} style={{width:'420px',marginTop:'0px',background:'#fff'}}>
        {/* <Header /> */}
        <Alert style={{ display: this.state.errorShow,top:'0px',position:'fixed',zIndex:'10000000',left:'0px',right:'0px' }} severity={this.state.severity}>
          {this.state.errorspan} <strong>{this.state.severity}</strong>
        </Alert>
        <div >
        <div className={DataSet.uptitle}>数据上传</div>
          <Dragger {...props} percent style={{border:'0px',height:'450px',border:'1px solid #ebebeb',background:"#ffffff"}}>
              
              <div style={{margin:'60px 0px'}}>
                <p className="ant-upload-drag-icon">
                {/* <InboxOutlined /> */}
                <div style={{width:'150px',height:'150px',borderRadius:'5px',background:"rgb(200, 200, 200) none repeat scroll 0% 0%",margin:'0px auto', boxShadow:'0px 0px 7px 0px #c9c4c4'}}>
                </div>
                </p>
                <p className="ant-upload-text">通过简单的拖拽，从本地上传你的文件</p>
              </div>
              
          </Dragger>
        </div>
        <div className={DataSet.uphome} style={{marginTop: '60px'}}>
          <div className={DataSet.uptitle}>数据集信息</div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>数据集名称</div>
            <div className={DataSet.upRight}>
            <Autocomplete  
                style={{width:'100%'}}
                freeSolo
                size="small"
                options={[]}
                renderInput={(paramsdd) => (
                <TextField
                    {...paramsdd}
                    label="数据集名称"
                    margin="normal"
                    onChange={(e)=> this.tarvalue(e.target.value)}
                    defaultValue="44"
                    variant="outlined" 
                />
                )}
            />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>数据集简介</div>
            <div className={DataSet.upRight}>
            <Autocomplete  
                style={{width:'100%'}}
                freeSolo
                size="small"
                options={[]}
                renderInput={(paramsdd) => (
                <TextField
                    {...paramsdd}
                    label="数据集简介"
                    margin="normal"
                    onChange={(e)=> this.setState({
                      dataintroduce:e.target.value
                    })}
                    defaultValue="44"
                    variant="outlined"
                    
                />
                )}  
            />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>数据格式</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="数据格式"
                      margin="normal"
                      onChange={(e)=> this.setState({
                        dataformat:e.target.value
                      })}
                      defaultValue="44"
                      variant="outlined"
                  />
                  )}  
              />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>标注类型</div>
            <div className={DataSet.upRight}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={this.state.datacategory} onChange={this.handleChange}>
                  <FormControlLabel value="2dBox" control={<Radio />} label="2DBox" />
                  <FormControlLabel value="3dBox" control={<Radio />} label="3DBox" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>路段</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="输入当前路段"
                      margin="normal"
                      onChange={(e)=> this.setState({
                        section:e.target.value
                      })}
                      defaultValue="44"
                      variant="outlined"
                  />
                  )}  
              />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>天气</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="输入天气信息"
                      margin="normal"
                      onChange={(e)=> this.setState({
                        weather:e.target.value
                      })}
                      defaultValue="44"
                      variant="outlined"
                  />
                  )}  
              />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>道路类型</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="直行道，弯道，路口等"
                      margin="normal"
                      onChange={(e)=> this.setState({
                        way_type:e.target.value
                      })}
                      defaultValue="44"
                      variant="outlined"
                  />
                  )}  
              />
            </div>
          </div>
          <div className={DataSet.upList}>
            <div className={DataSet.upLeft}>主车行为</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="直路直行，直路变道，路口直行等"
                      margin="normal"
                      onChange={(e)=> this.setState({
                        ego_type:e.target.value
                      })}
                      defaultValue="44"
                      variant="outlined"
                  />
                  )}  
              />
            </div>
          </div>
          <div className={DataSet.upList} style={{overflow: 'inherit'}}>
            <div className={DataSet.upLeft}>数据标签</div>
            <div className={DataSet.upRight}>
              <Autocomplete
                  style={{width:'100%'}}
                  freeSolo
                  size="small"
                  options={[]}
                  renderInput={(paramsdd) => (
                  <TextField
                      {...paramsdd}
                      label="搜索数据集标签"
                      margin="normal"
                      onChange={(e) => this.SearchTag(e.target.value)}
                      defaultValue="44"
                      variant="outlined"
                      InputProps={{
                        endAdornment: <SearchIcon  style={{ fontSize: "24px",cursor:'pointer' }} />,
                      }}
                  />
                  )}  
              />
              <div className={DataSet.taghome}>
                {
                  this.state.searchTag.map((item,index) => {
                    return (
                      <div className={DataSet.tagBox} onClick={() => this.tagchecked(item)}>
                        {item}
                      </div>
                    );
                })}
              </div>
            </div>
            <div>
              <div>已选数据标签</div>
              <div style={{overflow:'hidden',marginTop:'10px',minHeight: '36px'}}>
                {
                  this.state.tagIndex.map((item,index) => {
                  return (
                    <div className={DataSet.checkedClick} onClick={() => this.tagchecked(item)}>{item}</div>
                    );
                })}
              </div>
            </div>
            {/* <FormGroup row>
              {this.state.tagList.map((item,index) => {
                return (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={item[Object.keys(item)]}
                        onChange={(e) => this.handleRadio(index,e,Object.keys(item))}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={Object.keys(item)}
                  />
                );
              })}
              
            </FormGroup> */}
          </div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{marginBottom:'30px'}}
            onClick={() => this.submit()}
          >
            保存数据集
          </Button>
          <Button
            variant="text"
            color="primary"
            style={{ alignSelf: "flex-start", marginLeft: "10px",marginTop:'-24px' }}
            onClick={() => {
              // handleCreate();
              this.props.getdata(false);
            }}
          >
            {"取消"}
          </Button>

        </div>
      </div>
    )
  }
}
  