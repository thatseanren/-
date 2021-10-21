import Head from "next/head";
import Image from "next/image";
import Header from "./header.js";
import FilterSection from "../component/FilterSection.js";
import React from "react";
import ReactDOM from "react-dom";
import DataSet from "../styles/DataSet.module.css";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dialog from "@material-ui/core/Dialog";
import {
  FormLabel,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from "@material-ui/core";
import clsx from "clsx";
import GroupCell from "../component/GroupCell";
import Button from "@material-ui/core/Button";
import { HomeState } from "./index";
import Uploadd from "./upload";
import axios from "axios";
import server, { option } from "../main_config";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
export default class My extends React.Component<
  {},
  HomeState & { focusFn: number }
> {

  constructor(props) {
    super(props);
    this.state = {
      DataSetList: [],
      dataName:'', //数据集名称
      dataTags:'', //数据集名称
      dataTasks:'', //数据集格式
      dataCategory:'', //数据集标注类型
      dataDescription:'', //数据集描述
      dataUserName:'', //数据集创建者
      dataSection:'', //路段信息
      dataWeather:'', //天气信息
      dataWayType:'', //道路类型
      dataEgoType:'', //主车行为
      searchShow:'none',//搜索显示
      focusFn: 0,
      pages: [],
      tags: "",
      show:false,
      tasks: "",
      pagesIndex: 1,
      valueName: "",
      data: [
        {
          title: "场景标签",
          arr: ["4", "5"],
        },
        {
          title: "数据格式",
          arr: ["4", "5"],
        },
        // {
        //   title: "应用场景",
        //   arr: ["4", "5"],
        // },
        // {
        //   title: "自定义标签",
        //   arr: ["4", "5"],
        // },
      ],
    };
  }

  focusFn = (value) => {
    this.setState({
      focusFn: 1,
    });
  };

  search = value => {
    var qs = require('qs');  
    axios.post(server + 'get_dataset_list?limit=1page=1',qs.stringify({
        'keywords':this.state.dataName,  //数据集名称
        'tags':this.state.dataTags,  //数据集标签
        'tasks':this.state.dataTasks,  //数据集类型
        'category':this.state.dataCategory,  //标注类型
        'description':this.state.dataDescription,  //数据集简介
        'user_name':this.state.dataUserName, //上传者
        'section':this.state.dataSection,//路段信息字段
        'weather':this.state.dataWeather,//天气信息字段
        'way_type':this.state.dataWayType,//道路行为字段
        'ego_type':this.state.dataEgoType,//主车行为字段
        'accessibility':'private',
        'limit':'18',
        'page':value,
    }))
    .then((res) => {
        console.log(res)
        if (res.status === 200 // && !(console.log(`${server}${option.dataset}`), 0) 
          ) {
          this.setState({ DataSetList: res.data.data });
          var count = parseInt(res.data.count / 18 + 1);
          var numb = [];
          for (let i = 1; i <= count; i++) {
            numb.push(i);
          }
          this.setState({
            pages: numb,
          });
        } else {
          console.log(`${server}${option.dataset} mulfunctioning`);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // console.log("按下了Enter键");
      // this.fetchDataSetList(1);
    }
  };
  ononBlur = (value) => {
    this.setState({
      focusFn: 0,
    });
  };
  getChildrenMsg = (result, msg, ind) => {
    // console.log(result, msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
    var ms = ["", ""];
    ms[ind] = msg;
    if (ind === 0) {
      this.setState(
        {
          tags: msg,
        },
        function () {
          this.fetchDataSetList(1);
        }
      );
    } else {
      this.setState(
        {
          tasks: msg,
        },
        function () {
          this.fetchDataSetList(1);
        }
      );
    }
  };
  fetchDataSetList = (value, tags?, tasks?) => {
    //展开文章内容
    var tag = tags ? tags : this.state.tags;
    console.log(this.state.tags);
    var tas = tasks ? tasks : this.state.tasks;
    axios
      .get(
        //http://10.78.4.88:888/get_dataset_list?limit=18&page=1&keywords=&tags=&tasks=&accessibility=private
        `${server}${option.dataset}` +"?limit=18&page=" +value +"&keywords=" + this.state.valueName +
          "&tags=" + tag + "&tasks=" + tas + "&accessibility=private"
      )
      .then((res) => {
        console.log("Component <myDataset /> -> GET:",res)
        if (res.status === 200 // && !(console.log(`${server}${option.dataset}`), 0) 
          ) {
          this.setState({ DataSetList: res.data.data });
          var count = parseInt(res.data.count / 15 + 1);
          var numb = [];
          for (let i = 1; i <= count; i++) {
            numb.push(i);
          }
          this.setState({
            pages: numb,
          });
        } else {
          console.log(`${server}${option.dataset} mulfunctioning`);
        }
      })
      .catch(function (error) { 
        console.log(error);
      });
  };
  getDatas(msg){
    //把子组件传递过来的值赋给this.state中的属性
    this.setState({
      show: msg,
    });
  }
  componentDidMount() {
    this.fetchDataSetList(1);
    axios
      .get(server + "get_dataset_info?accessibility=private", {})
      .then((response) => {
        console.log("Component <myDataset /> -> GET:",response)
        response.data.data;
        var setdata = this.state.data;
        let tags = JSON.stringify(response.data.data.tags)
        tags = JSON.parse(tags);
        let tasks = JSON.stringify(response.data.data.tasks)
        tasks = JSON.parse(tasks);
        setdata[0].arr = tags;
        setdata[1].arr = tasks;
        console.log(setdata)
        this.setState({
          data: setdata,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Dialog open={this.state.show} aria-labelledby="simple-dialog-title">
          <DialogTitle onClose={() => {}}> 生成数据集 </DialogTitle>
          <DialogContent>
            <Uploadd getdata={this.getDatas.bind(this)} />
          </DialogContent>
        </Dialog>
        <Header />
        
        <div className={DataSet.home}>
          <div className={DataSet.title} style={{padding:'0px'}}>
            <div  style={{overflow:'hidden',padding: '30px 0 20px 0'}}>
              <div style={{float:'left'}}>我的数据集</div>
              <div onClick={
                () => this.setState({
                  searchShow:this.state.searchShow === 'none' ? 'block' : 'none',
                })
              } style={{cursor:'pointer',float:'left',marginLeft: '20px',background: '#336bd4',padding: '3px 10px',fontSize: '14px',borderRadius: '5px',color:' #fff'}}>
                数据筛选
              </div>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => this.setState({
                  show:true
                })}
                style={{float:'right',marginTop:'-6px'}}
              >
                上传数据集
              </Button>
            </div>
            <div style={{display:this.state.searchShow,marginBottom:'10px',overflow:'hidden'}}>
        <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="数据集名称"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataName:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="数据集标签(用逗号分隔)"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataTags:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="数据集格式(用逗号分隔)"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataTasks:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="数据集标注类型"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataCategory:e.target.value
                  })}
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="数据集描述"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataDescription:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="创建人"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataUserName:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="路段信息"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataSection:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="天气"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataWeather:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="道路类型"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataWayType:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="主车行为"
                  margin="normal"
                  onChange={(e) => this.setState({
                    dataEgoType:e.target.value
                  })}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <Button
          style={{margin:'10px 0px'}}
            variant="contained"
            onClick={() => this.search(1)}
            size="large"
            color="primary"
          >
            搜索
          </Button>
        </div>
          </div>
          <div className={DataSet.listContainer}>
            <div className={clsx(DataSet.filterContainer)}>
              {/* <div className={DataSet.search}>
                <input
                  placeholder="搜索数据集"
                  className={
                    this.state.focusFn === 0 ? DataSet.inp : DataSet.blue
                  }
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={this.state.valueName}
                  onChange={(e) => {
                    this.setState({
                      valueName: e.target.value,
                    });
                  }}
                  onFocus={this.focusFn}
                  onBlur={this.ononBlur}
                />
                <div className={DataSet.iconse}>
                  <SearchIcon
                    className={
                      this.state.focusFn === 0 ? DataSet.sear : DataSet.searblue
                    }
                  />
                </div>
              </div> */}
              <div className={DataSet.leftContent} style={{marginTop:'0px'}}>
                <FilterSection
                  data={this.state.data}
                  parent={this}
                  father={"mydataset"}
                />
              </div>
            </div>
            <div style={{ width: "937px" }}>
              <GroupCell data={this.state.DataSetList} accessibility={"private"} />
              <div className={styles.pages}>
                <div
                  className={styles.pagesLable}
                  onClick={() => {
                    if (this.state.pagesIndex > 0) {
                      this.setState({
                        pagesIndex: this.state.pagesIndex - 1,
                      });
                      this.fetchDataSetList(this.state.pagesIndex - 1);
                    }
                  }}
                >
                  <ArrowBackIosIcon style={{ fontSize: 12 }} />
                </div>
                {this.state.pages ? (
                  this.state.pages.map((item, index) => {
                    return (
                      <div
                        className={
                          this.state.pagesIndex === item
                            ? styles.pagesLableStyle
                            : styles.pagesLable
                        }
                        onClick={() => {
                          this.setState({
                            pagesIndex: item,
                          });
                          this.fetchDataSetList(item);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.pagesLable}>1</div>
                )}

                <div
                  className={styles.pagesLable}
                  onClick={() => {
                    if (this.state.pagesIndex < this.state.pages.length) {
                      this.setState({
                        pagesIndex: this.state.pagesIndex + 1,
                      });
                      this.fetchDataSetList(this.state.pagesIndex + 1);
                    }
                  }}
                >
                  <ArrowForwardIosIcon style={{ fontSize: 12 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
