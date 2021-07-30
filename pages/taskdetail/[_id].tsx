import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Header from "../header.js";
import Button from "@material-ui/core/Button";
import Tag from "../../styles/DataSet.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { ServerResponse } from "http";
import Alert from "@material-ui/lab/Alert";
import Link from "next/link";
import Cookies from 'js-cookie';
import {
  RadioGroup,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Router from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import '../../config';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import ip, { option, annotation } from "../../main_config";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import qs from "qs";
export default function DetailsWrapper(props) {
  const route = useRouter();
  const { _id } = route.query;
  console.log(_id);
  // return <TagDetails {...props} TaskId={_id} />;
  return <TagDetails {...props} TaskId={_id} />;
}
DetailsWrapper.getInitialProps = (appContext) => {
  return { _id: appContext.query._id };
};

class TagDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openlist: 0,
      data: {},
      numb: "",
      userType:"",
      open: false,
      submitopen:false,
      done: "",
      adminId:"",
      age:"",
      type: "none",
      category:"admin",
      nameshow:"none",
      span:"",
      checkindex:[],
      speed:[],
      dtaskUserList:[],//可标注成员
      wholeUser:[],//全部成员
      userList:[],
      companyList:[], //标注公司列表
      companyShow:"none",
      companyIndex:'',//当前标注公司
      category:"",
      cheklist:[
        {checked:true,name:"admin"},{checked:true,name:"steam"}
      ],
    };
  }

  company = value => {  //添加标注公司列表
    var qs = require('qs');
    const that = this
    axios.post(ip + 'get_company_list',qs.stringify({
        'category':'标注公司'
    }))
    .then(function (response) {
        console.log(response)
        that.setState({
          companyList:response.data.data
        })
    })
    .catch(function (error) {
        console.log(error);
    });

  }

  componentDidMount() {
    // this.userlist()
    
    this.setState({
      userType:localStorage.getItem('login')
    })

    axios
      .get(`${ip}${option.getTaskList}?_id=${this.props.TaskId}`)
      .then((res) => {
        console.log(res.data.data);
        let arr = [];
        let speed = [];
        for(let i = 0;i<res.data.data[0].split;i++) {
          arr.push(res.data.data[0].user_list[i])
          let span;
          if(res.data.data[0].flag_list[i] == 0){
            span = '未审核'
          } else if(res.data.data[0].flag_list[i] == 1){
            span = '待审核'
          } else if(res.data.data[0].flag_list[i] == -1){
            span = '驳回'
          } else if(res.data.data[0].flag_list[i] == 2){
            span = '审核通过'
          }
          speed.push(span)
        }
        this.setState({ 
          data: res.data.data[0], 
          done: res.data.data[0].done,
          companyIndex:res.data.data[0].mark_company,
          age:arr,
          speed:speed,
          dtaskUserList:res.data.data[0].users
        });
      });
      this.userlist()  //添加成员列表
      this.company()  //添加标注公司列表
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  deleteData = () => {
    this.setState({
      open: true,
    });
  };
  nameChange = (b,event: React.ChangeEvent<{ value: unknown }>) => {
    let arr = this.state.checkindex
    arr[b].chkebox = event.target.checked
    console.log(arr);
    this.setState({
      checkindex:arr,
      category:event.target.value,
    })
  };
  handleChange = (a,event: React.ChangeEvent<{ value: unknown }>) => {
    let ages = this.state.age;
    console.log(event.target.value as string);
    ages[a]=event.target.value as string
    this.setState({
      age: ages
    });

    var qs = require('qs');
    axios.post(ip + 'edit_onetask_user',qs.stringify({
        '_id':this.props.TaskId,
        'user':event.target.value as string,
        'index':a
    }))
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    // setAge(event.target.value as string);
  };
  submit = value => { //提交标注任务
    var qs = require('qs');
    axios.post(ip + 'set_dtask_flag',qs.stringify({
        '_id':this.props.TaskId,
        'flag':1
    }))
    .then(function (response) {
      console.log(response);
      if (res.status === 200) {
        this.setState({
          type: "flex",
          span:"您的标注任务提交成功"
        });
        setTimeout(() => {
          Router.push({
            pathname: ".././tools/annotation",
          });
        }, 2000);
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  companyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      companyIndex: event.target.value as string
    });

    var qs = require('qs');
    axios.post(ip + 'set_dtask_company',qs.stringify({
        '_id':this.props.TaskId,
        'company':event.target.value as string
    }))
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    // setAge(event.target.value as string);
  };

  setSnetask = value => { //子任务提交审核
    const that = this
    axios.post(ip + 'set_onetask_flag',qs.stringify({
      '_id':this.props.TaskId,
      'index':value,
      'flag':1
    }))
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  userlist = value => {
    const that=this;
    axios.post(ip + 'company_user_list', {})
    .then(function (response) {
        console.log(response)
        const data = response.data.data
        const dtaskUserList = that.state.dtaskUserList;
        let arr = [];
        let userList = [];
        let type;
        for(let i=0;i<data.length;i++){
          if(data[i].type != 'admin'){
            if(JSON.stringify(dtaskUserList).match(data[i]._id)){
              type = true;
            } else {
              type = false;
            }
            arr.push({
              'name':data[i].name,
              'id':data[i]._id,
              'chkebox':type
            })
          } else {
            that.setState({
              adminId:data[i]._id,
            })
          }
          if(JSON.stringify(dtaskUserList).match(data[i]._id)){
            userList.push({
              'name':data[i].name,
              '_id':data[i]._id,
            })
          }
        }
        console.log(arr);
        that.setState({
          checkindex:arr,
          cheklist:response.data.data,
          dtaskUserList:userList
        }, () => {
          console.log('加载完成')
        });

    })
    .catch(function (error) {
        console.log(error);
    });
  }

  deleteAgree = () => {
    this.setState({
      open: false,
    });
    axios.get(`${ip}del_dtask?_id=${this.props.TaskId}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          type: "flex",
          span:"您的标注任务删除成功"
        });
        setTimeout(() => {
          Router.push({
            pathname: ".././tools/annotation",
          });
        }, 2000);
      }
    });
  };

  addcompany = value => { //添加标注公司
    const that = this
    axios.post(ip + 'set_dtask_company',qs.stringify({
      '_id':this.props.TaskId,
      'company':this.state.category
    }))
    .then(function (response) {
      console.log(response)
      that.setState({
        companyShow:'none'
      })
    })
    .catch(function (error) {
        console.log(error);
    });

  }

  radioChange = (event) => {  //标注公司列表
    this.setState({
      category:event.target.value
    })
    console.log(event.target.value);
  };

  dtaskUser = value => {  //确认添加成员
    var qs = require('qs');
    let arr = [];
    const that = this;
    const checkindex = this.state.checkindex;
    for(let i=0;i<checkindex.length;i++){
      if(i == 0)arr.push(this.state.adminId)
      if(checkindex[i].chkebox){
        arr.push(checkindex[i].id)
      }
    }
    console.log(this.props.TaskId);
    console.log(arr.join(','));
    axios.post(ip + 'edit_dtask_user',qs.stringify({
        '_id':this.props.TaskId,
        'users':arr.join(',')
    }))
    .then(function (response) {
      if(response.data.status == 1){
        let add = [];
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<that.state.cheklist.length;j++){
            if(that.state.cheklist[j]._id == arr[i]){
              add.push(that.state.cheklist[j]);
            }
          }
        }
        that.setState({
          nameshow:'none',
          dtaskUserList:add
        })
        that.setState({
          nameshow:'none',
          dtaskUserList:add
        }, () => {
          console.log(that.state.dtaskUserList);
          console.log('加载完成')
        });
        that.SequenceRow();

      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  SequenceRow = () => {
    let list = [];
    for (let a = 0; a < this.state.data.split; a++) {
      list.push(
        <div className={Tag.tableList}>
          <div style={{ flex: "2 1 0%" }}>{a + 1}</div>
          <div style={{ flex: "2 1 0%" }}>{a+1 != this.state.data.split ? 50 : this.state.data.num%50}</div>
          <div
            style={{ flex: "3 1 0%" }}
          >{`${this.state.data.done}/${a+1 != this.state.data.split ? 50 : this.state.data.num%50}`}</div>
          <div style={{ flex: "4 1 0%" }}>{this.state.speed[a]}</div>
          <div style={{ flex: "4 1 0%" }}>
          <FormControl >
            <Select
              value={this.state.age[a]}
              onChange={(e)=>this.handleChange(a,e)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {this.state.dtaskUserList ? this.state.dtaskUserList.map((row,index) => {
              return (
              
              <MenuItem key={index} value={row._id}>{row.name}</MenuItem>
              );
                  }) : ''}
            </Select>
          </FormControl>
          </div>
          <div style={{ flex: "3 1 0%" }}>
            <Link
              href={
                this.state.data.type === "2DBox"
                  ? `/2DAnnotator?_taskID=${this.state.data._id}&sequence=${a}`
                  : `${"http://10.78.4.88:555"}?_id=${
                      this.state.data.dataset_id
                    }&_taskID=${this.state.data._id}&sequence=${a}`
              }
            >
              <Button
                style={{
                  display: this.state.data.num === 0 ? "none" : "block",
                  float:"left"
                }}
                variant="outlined"
                color="primary"
              >
                标注
              </Button>
            </Link>
            {
              this.state.data.user_id == this.state.age[a] ? <Button
              style={{
                float:"left",marginLeft:"10px"
              }}
              variant="outlined"
              color="primary"
              onClick={() => this.setSnetask(a)}
            >
              提交
            </Button> : ''
            }
            
          </div>
        </div>
      );
    }
    return list;
  };
  render() {
    return (
      <div className={Tag.tagHome}>
        <div className={Tag.takshow} style={{display:this.state.companyShow}}>
          <div style={{background:"#fff",width:"300px",margin:"0px auto",marginTop:"20%",overflow: "hidden",borderRadius:"5px" }}>
            <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
              <h3 style={{fontSize: '1.25rem',fontWeight: '500',lineHeight: '1.6',letterSpacing: '0.0075em',padding:"10px 24px",margin:"0px",fontSize:"16px"}}>
                添加标注公司
                <span style={{textAlign:"right",float:"right",fontSize:"20px",lineHeight:"15px",cursor:"pointer"}} onClick={() => 
                this.setState({
                  companyShow:"none"
                })
                }>
                  <HighlightOffRoundedIcon />
                </span>
              </h3>
            </div>
            <div style={{padding:"10px",marginLeft:"15px"}}>
            <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={this.state.category} onChange={(e) => this.radioChange(e)}>
                  {this.state.companyList ? this.state.companyList.map((row,index) => {
              return (
                <div key={index} style={{width:"100%"}}>
                  <FormControlLabel value={row._id} control={<Radio />} label={row.name} />
                </div>

                    );
                  }) : ''}
                    {/* <FormControlLabel value="Both" control={<Radio />} label="Both" />
                    <FormControlLabel value="Segm" control={<Radio />} label="Segm" /> */}
                </RadioGroup>
                </FormControl>
            </div>
            <div style={{borderTop: '1px solid rgba(0, 0, 0, 0.12)',padding:"10px",overflow:"hidden"}}>
              <Button variant="contained" onClick={() => 
              this.setState({
                companyShow:"none"
              })} color="primary" disableElevation style={{float:"right",background:"#999",lineHeight:"20px",marginLeft:"10px"}}>
                取消
              </Button>
              <Button onClick={() => this.addcompany()} variant="contained" color="primary" disableElevation style={{float:"right",lineHeight:"20px"}}  >
                确定
              </Button>
            </div>
          </div>

        </div>
        <div className={Tag.takshow} style={{display:this.state.nameshow}}>
          <div style={{background:"#fff",width:"240px",margin:"0px auto",marginTop:"20%",overflow: "hidden",borderRadius:"5px" }}>
            <div style={{padding:"10px",background:"rgb(8, 129, 202) none repeat scroll 0% 0%",color:"#fff"}}>
              成员列表
              <span style={{textAlign:"right",float:"right",fontSize:"20px",lineHeight:"15px",cursor:"pointer"}} onClick={() => 
              this.setState({
                nameshow:"none"
              })
              }>
                <HighlightOffRoundedIcon />
              </span>
            </div>
            <div style={{padding:"20px"}}>
              <RadioGroup row style={{flexDirection:"row"}}  onChange={this.nameChange}>

              {this.state.checkindex.map((row,index) => {
              return (
                <div className={Tag.nameList} key={index}>
                  {row.type != "admin" ?
                  <FormControlLabel
                    control={<Checkbox checked={row.chkebox} onChange={(e) => this.nameChange(index,e)} name={row.name} />}
                    label={row.name}
                  /> : ''
                }
                </div>
                    );
                  })}

                
              </RadioGroup>
            </div>
            <div style={{padding:"10px",overflow:"hidden",borderTop:"1px solid #e7e7e7"}}>
              <Button onClick={() => this.dtaskUser()} variant="contained" color="primary" disableElevation style={{float:"right",lineHeight:"20px",marginLeft:"10px"}}  >
                确认
              </Button>
              <Button variant="contained" onClick={() => 
              this.setState({
                nameshow:"none"
              })} color="primary" disableElevation style={{float:"right",background:"#999",lineHeight:"20px"}}>
                取消
              </Button>
              
            </div>
          </div>
        </div>
        <Header />
        <Alert style={{ display: this.state.type }} severity="success">
          {this.state.span} <strong>success</strong>
        </Alert>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"删除提示"}</DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              确定要删除该标注任务?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.deleteAgree} color="primary" autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.submitopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"删除提示"}</DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              确定要提交该标注任务?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => this.setState({
              submitopen:false
            })} color="primary">
              取消
            </Button>
            <Button onClick={this.submit} color="primary" autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>
        <div className={Tag.homeTop}>
          <div className={Tag.tagListLeft}>
            <div className={Tag.basicInfoWindow}>
              <div className={Tag.tgaTitle}>项目：{this.state.data.name}</div>
              <div className={Tag.tagTopList}>
                <div className={Tag.topListBox}>
                  <div className={Tag.listBoxTitle}>基本信息</div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>标注类型：</div>
                    <div className={Tag.boxSpanRight}>
                      {this.state.data.type}
                    </div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>创建时间：</div>
                    <div className={Tag.boxSpanRight}>
                      {this.state.data.create_time}
                    </div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>创建人：</div>
                    <div className={Tag.boxSpanRight}>
                      {this.state.data.user_id}
                    </div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>标注公司：</div>
                    <div className={Tag.boxSpanRight}>
                    <FormControl style={{marginTop:"-5px"}}>
                      <Select
                        value={this.state.companyIndex}
                        onChange={this.companyChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {this.state.companyList ? this.state.companyList.map((row,index) => {
                        return (
                        
                        <MenuItem key={index} value={row._id}>{row.name}</MenuItem>
                        );
                            }) : ''}
                      </Select>
                    </FormControl>
                      {/* <span style={{textDecoration: 'underline',cursor: 'pointer',color:'#4e82c5'}} onClick={() => this.setState({companyShow:'block'})}>[添加标注公司]</span>       */}
                    </div>
                  </div>
                </div>
                <div className={Tag.topListBox}>
                  <div className={Tag.listBoxTitle}>标注信息</div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>数据量：</div>
                    <div className={Tag.boxSpanRight}>
                      {this.state.data.num}
                    </div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>精度要求：</div>
                    <div className={Tag.boxSpanRight}>-</div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>标注标签：</div>
                    <div className={Tag.boxSpanRight}>
                      {this.state.data.tags}
                    </div>
                  </div>
                </div>
                <div className={Tag.topListBox}>
                  <div className={Tag.listBoxTitle}>标注成员</div>
                  <div className={Tag.listBoxSpan}>
                    <div className={Tag.boxSpanLeft}>成员：</div>
                    <div className={Tag.boxSpanRight}>1个</div>
                  </div>
                  <div className={Tag.listBoxSpan}>
                    <Button style={{display:this.state.userType == 'admin' ? 'block' : 'none'}} variant="contained" size="large" color="primary" onClick={() => 
                      this.setState({
                        nameshow:"block"
                      })
                      } >
                      添加成员
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={Tag.basicInfoWindow} style={{ marginTop: "16px" }}>
              <div className={Tag.tgaTitle}>任务列表</div>
              <div>
                <div className={Tag.tableTitle}>
                  <div style={{ flex: "2 1 0%" }}>编号</div>
                  <div style={{ flex: "2 1 0%" }}>数据量</div>
                  <div style={{ flex: "3 1 0%" }}>标注进度</div>
                  <div style={{ flex: "4 1 0%" }}>状态</div>
                  <div style={{ flex: "4 1 0%" }}>标注员</div>
                  <div style={{ flex: "3 1 0%" }}>操作</div>
                </div>
                {this.SequenceRow()}
              </div>
            </div>
          </div>
          <div className={Tag.tagListRight}>
            <div className={Tag.tgaTitle}>项目进度</div>
            <div>
              <div className={Tag.rigBox}>
                <div
                  style={{
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "rgb(137, 138, 150)",
                  }}
                >
                  待标注
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>数据量</div>
                  <div>{parseInt(this.state.data.num - this.state.done)}</div>
                </div>
                <div>
                  {/* <Autocomplete
                                    id="combo-box-demo"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                                /> */}
                </div>
              </div>
              <div className={Tag.rigBox}>
                <div
                  style={{
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "rgb(137, 138, 150)",
                  }}
                >
                  已完成
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div>数据量</div>
                  <div>{this.state.done}</div>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div>标注数</div>
                  <div>3</div>
                </div> */}
                {/* <div style={{ marginBottom: "8px", overflow: "hidden" }}>
                  <div style={{ float: "left" }}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ height: "35px" }}
                    >
                      下载
                    </Button>
                  </div>
                  <div style={{ float: "right" }}>
                    <Button variant="outlined">同步标注结果到数据集</Button>
                  </div>
                </div> */}
              </div>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => this.deleteData()}
                style={{ width: "100%",display:this.state.userType == 'admin' ? 'block' : 'none' }}
              >
                删除
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => this.setState({
                  submitopen:true
                })}
                style={{ width: "100%",display:this.state.userType == 'admin' ? 'block' : 'none',marginTop:"20px" }}
              >
                提交任务
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
