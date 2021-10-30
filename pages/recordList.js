import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'antd/dist/antd.css';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import { styled } from '@mui/material/styles';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import 'moment/locale/zh-cn';
import MenuItem from '@material-ui/core/MenuItem';
import locale from 'antd/lib/locale/zh_CN';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Header from "./header.js";
import server_ip from "../main_config";
import  "../config";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Dayjs } from 'dayjs';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import ForkDialog from "../component/addDialog";
import DateRangePicker from '@mui/lab/DateRangePicker';
import InputLabel from '@mui/material/InputLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, Space } from 'antd';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function StickyHeadTable() {
  // getData=(data)=>{
  //   console.log(data);
  // }

  const [open, setOpen] = React.useState(false);
  const DialogRef = React.createRef();
  // const rows = [
  //   createData("India", "IN", 1324171354, 3287263),
  //   createData("China", "CN", 1403500365, 9596961),
  //   createData("Italy", "IT", 60483973, 301340),
  //   createData("United States", "US", 327167434, 9833520),
  //   createData("Canada", "CA", 37602103, 9984670),
  //   createData("Australia", "AU", 25475400, 7692024),
  //   createData("Germany", "DE", 83019200, 357578),
  //   createData("Ireland", "IE", 4857000, 70273),
  //   createData("Mexico", "MX", 126577691, 1972550),
  //   createData("Japan", "JP", 126317000, 377973),
  //   createData("France", "FR", 67022000, 640679),
  //   createData("United Kingdom", "GB", 67545757, 242495),
  //   createData("Russia", "RU", 146793744, 17098246),
  //   createData("Nigeria", "NG", 200962417, 923768),
  //   createData("Brazil", "BR", 210147125, 8515767),
  // ];
  const [page, setPage] = React.useState(0);
  const [row, setrow] = useState([]);
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);
  const [count, setCount] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedList, setcheckedList] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [show, setShow] = React.useState('none');
  const [datashow, setdataShow] = React.useState('none');
  const [recordName,setRecordName] = React.useState([]); //选中记录
  const [channel,setChannel] = React.useState([]);  //分解数据集2D/3D数据
  const [channelIndex,setChannelIndex] = React.useState([]);  //分解数据集2D/3D数据缓存
  const [dataName,setdataName] = React.useState('');  //数据集名称
  const [dataTags,setdataTags] = React.useState('');  //数据集名称
  const [dataTasks,setdataTasks] = React.useState('');  //数据集格式
  const [dataCategory,setdataCategory] = React.useState('');  //硬件模组
  const [dataDescription,setdataDescription] = React.useState('');  //数据集描述
  const [dataUserName,setdataUserName] = React.useState('');  //数据集创建者
  const [dataSection,setdataSection] = React.useState('');  //路段信息
  const [dataWeather,setdataWeather] = React.useState([]);  //天气信息
  const [dataWayType,setdataWayType] = React.useState([]);  //道路类型
  const [dataEgoType,setdataEgoType] = React.useState([]);  //主车行为
  const [dataValue,setdataValue] = React.useState('');  //主车行为
  const [dataCity,setdataCity] = React.useState('');  //城市
  const [companyIndex,setcompanyIndex] = React.useState([]);  //有无地图
  const [vehicle,setVehicle] = React.useState([]);  //车辆列表
  const [carIndex,setcarIndex] = React.useState([]);  //选中车辆
  const [timeStart,settimeStart] = React.useState([]);  //开始时间
  const [timeEnd,settimeEnd] = React.useState([]);  //结束时间
  const handleCreate = (value,name,bud) => {
    var page = bud ? bud : rowsPerPage
    axios
      .get(
        server_ip +
          "get_record_list?limit=" +
          page +
          "&page=" +
          (parseInt(value * 1) + 1) +
          "&return_channel=1&vehicle=1",
        { limit: 15, page: 1 }
      )
      .then(function (response) {
        console.log(response.data);
        data(response,name)
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //数据处理
  const data = (response,name) => {
    setChecked(true)
    console.log(response)
    const data = response.data.data;
      let temp = [];
      let checkedList = [];
      let checkdeIndex = 0;
      setCount(response.data.count);

      for (let i = 0; i < data.length; i++) {
        let channel = [];
        if (Object.keys(data[i]).includes("channel")) {
          if (
            data[i]["channel"] && data[i]["channel"].hasOwnProperty(
              "/apollo/sensor/livox/compensator/PointCloud2"
            )
          ) {
            channel.push("2dBox");
          }
          if (
            data[i]["channel"] && data[i]["channel"].hasOwnProperty(
              "/apollo/sensor/matrix/front/meta_plus"
            )
          ) {
            channel.push("3dBox");
          }
        }
        var Format = ["Kb", "Mb", "Gb", "Tb", "Pb"];
        var filenumb = data[i].file_size / 1024;
        var tag;
        data[i].tag ? (tag = data[i].tag.toString()) : (tag = "");
        Format.forEach((item) => {
          let numb = 0;
          if (filenumb >= 1024) {
            filenumb = parseFloat(filenumb / 1024).toFixed(2);
          } else if (filenumb <= 1024 && numb == 0) {
            filenumb = filenumb + item;
            numb++;
          }
        });
        temp.push(
          createData(
            data[i].data_name,
            data[i].create_time,
            data[i].file_name,
            filenumb,
            tag,
            data[i].frame_num,
            "operation," + data[i]._id,
            channel,
            checkdeIndex,
          )
        );
        checkdeIndex++
        var o = {};
        var reco;
        name ? reco = name : reco = recordName
        if(JSON.stringify(reco).match(data[i].file_name)){
          o[data[i].file_name] = true
        } else {
          setChecked(false)
          o[data[i].file_name] = false
        }
        
        checkedList.push(
          o
        ) 
      }
      setcheckedList(checkedList)
      setrow(temp);
      console.log(checkedList)
      console.log(temp)

  }
  useEffect(() => {
    // handleCreate(0);
    search(0)
    carList()
  }, []);
  const oncl = value => {
    channelType()
  }
  const carList = value => {
    axios.post(server_ip + 'get_record_option')
    .then((response) => {
        var veh = response.data.options.vehicle
        veh.unshift({'vehicle_name':''})
        console.log(veh)
        setVehicle(veh)
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  const delerecord = value => {
    console.log(recordName)
    var arr = [];
    var channels = []
    for(let i=0;i<recordName.length;i++) {
      if(recordName[i] != value){
        arr.push(recordName[i])
        channels.push(row[i])
      }
    }
    console.log(arr)
    setRecordName(arr)
    setChannelIndex(channels)
    // if(datashow == 'none') {
    //   handleCreate(page,arr);
    // } else {
    //   search(page,arr)
    // }
    search(page,arr)
    
    // channelType(channels)
  }

  const Reset = value => {
    setdataName('')
    setdataUserName('')
    setdataSection('')
    setdataCity('')
    setcompanyIndex('')
    setcarIndex('')
    settimeStart('')
    settimeEnd('')
    setdataCategory('')
  }

  //全选
  const handleChange = (event) => {
    console.log(checkedList)
    var temp = JSON.stringify(recordName)
    var cu = JSON.stringify(recordName)
    cu = JSON.parse(cu);
    if(!event.target.checked){
      let arr = JSON.stringify(recordName);
      arr = JSON.parse(arr);
      let channels = []
      var type = 1;
      for(let i=0;i<checkedList.length;i++){
        for(let t = 0;t<recordName.length;t++) {
          var obj = JSON.stringify(Object.keys(checkedList[i])).substring(2,JSON.stringify(Object.keys(checkedList[i])).length-2);
          if(recordName[t].file_name == obj && checkedList[i][Object.keys(checkedList[i])]){
            recordName.splice(t,1)
            channelIndex.splice(t,1)
          }
        }
      }
      // type == 1 ? arr.pu
      
      console.log(recordName)
      cu = recordName
    } else {

    }
    
    
    for(let i=0;i<checkedList.length;i++) {
      var obj = JSON.stringify(Object.keys(checkedList[i])).substring(2,JSON.stringify(Object.keys(checkedList[i])).length-2);
      if(event.target.checked){
        if(temp.match(Object.keys(checkedList[i]))) {
         
        } else {

          
          channelIndex.push(row[i])
          cu.push(row[i])
          // recordName.push(JSON.stringify(Object.keys(checkedList[i])).substring(2,JSON.stringify(Object.keys(checkedList[i])).length-2))     
        }
        
      } else {
        
        // recordName=[]
      }
      checkedList[i][Object.keys(checkedList[i])] = event.target.checked;
    }
    setChannelIndex(channelIndex)
    setRecordName(cu)
    setChecked(event.target.checked);
    setcheckedList(checkedList)
    // channelType()
  };

  //搜索
  const { RangePicker } = DatePicker;
  const search = (value,name,bud) => {
    var qs = require('qs');  
    value ? value : value = 0;
    axios.post(server_ip + 'get_record_list?limit=10' +
    "&page=" +
    (parseInt(value * 1) + 1) +
    "&return_channel=1",qs.stringify({
        'up_data_name':dataName,  //数据集名称
        'Section':dataSection,  //路段
        'City':dataCity,  //城市
        'Hardware':dataCategory,  //硬件模组
        'up_name':dataUserName, //上传者
        'up_vehicle':carIndex,//车辆信息
        'up_time1':timeStart,//开始时间
        'up_time2':timeEnd,//结束时间
        // 'page':value*1+1,
        // 'limit':'10',
    }))
    .then((response) => {
        if(response.data.code == 0){
          data(response,name)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  const handleChangeList = (a,event,c,rowc) => {
    var chan,reco;
    if(JSON.stringify(recordName).match(rowc.file_name)){
      let arr = [];
      let channels = []
      for(let i = 0;i<recordName.length;i++) {
        if(recordName[i].file_name != rowc.file_name){
          arr.push(recordName[i])
          channels.push(channelIndex[i])
        }
      }
      chan = channels
      reco = arr 
    } else {
      console.log(channelIndex)
      recordName.push(rowc)
      channelIndex.push(rowc)
      chan = channel
      reco = recordName
    }
    setChannelIndex(chan)
    setRecordName(reco)  //选中记录
    // channelType(chan) //channel状态

    //全选按钮控制
    let temp = JSON.stringify(checkedList)
    temp = JSON.parse(temp);
    temp[a][c] = event.target.checked
    if(JSON.stringify(temp).match('false')){
      setChecked(false)
    } else {
      setChecked(true)
    }
    setcheckedList(temp)
  };

  //数据处理
  const  channelType = value => {
    console.log(recordName);
    var type = ['2dBox','3dBox']
    var iflag = {}
    for(let i=0;i<type.length;i++){
      iflag[type[i]]=1
    }
    for(let i=0;i<recordName.length;i++){
      for(let j=0;j<type.length;j++){
        if(!recordName[i].channel.includes(type[j])){
          iflag[type[j]]=0
        }
      }
    }
    var channelsd = []
    for(let key in iflag){
      if(iflag[key]==1){
        channelsd.push(key)
      }
    }
    console.log(channelsd)
    var li = []
    var idc = []
    for(let i=0;i<recordName.length;i++) {
      var id = recordName[i].operation.substring(10,recordName[i].operation.length)
      idc.push(id)
    }
    li.push(idc)
    li['channel'] = channelsd
    console.log(li)
    setList(li)
    if(li[0].length>0){
      DialogRef.current(li)
    }
  }

  const columns = [
    {id: "data_namec", label: "Checkbox",width: 100},
    { id: "data_name", label: "数据集名称",headerName:"数据集名称", minWidth: 100 },
    { id: "create_time", label: "创建时间",headerName:"创建时间", minWidth: 120 },
    {
      id: "file_name",
      label: "文件名称",
      Width: 300,
      headerName:"文件名称",
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "file_size",
      label: "文件大小",
      minWidth: 100,
      headerName:"文件大小",
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "tag",
      label: "标签",
      headerName:"标签",
      minWidth: 140,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "frame_num",
      label: "文件数量",
      headerName:"文件数量",
      minWidth: 100,
      align: "left",
      format: (value) => value.toFixed(2),
    },
   
  ];


  

  
  const companyChange = (event) => {
    setcompanyIndex(event.target.value);
  };
  const carChange = (event) => {
    setcarIndex(event.target.value);
  };


  function createData(
    data_name,
    create_time,
    file_name,
    file_size,
    tag,
    frame_num,
    operation,
    channel,
    checkdeIndex,
  ) {
    return {
      data_name,
      create_time,
      file_name,
      file_size,
      tag,
      frame_num,
      operation,
      channel,
      checkdeIndex,
    };
  }

  const useStyles = makeStyles({
    root: {
      // width: "1223px",
      // margin: "0px auto"
    },
    container: {
      // maxHeight: 440,
    },
  });
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    search(newPage)
    // handleCreate(newPage);
  };

  const onChange =(value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    settimeStart(dateString[0])
    settimeEnd(dateString[1])
  }
  
  function onOk(value) {
    console.log('onOk: ', value);
  }

 
  return (
    <div style={{ width: "1223px", margin: "0px auto", paddingTop: "56px" }}>
      <Header />
      <ForkDialog Syntec_ref={DialogRef} />
      <div
        style={{
          color: "#272834",
          fontWeight: "500",
          fontSize: "18px",
          
          borderBottom: "1px solid rgba(0,0,0,.12)",
          marginBottom: "30px",
          // overflow:'hidden',
        }}
      > 
      <div style={{height:'84.25px',padding: "30px 0 20px 0",position:'relative'}}>
        <div style={{float:'left'}}>数据记录</div>
        <div style={{float:'right',marginTop:'-8px'}}>
          <Button
            variant="contained"
            onClick={() => oncl()}
            size="large"
            color="primary"
          >
            分解
          </Button>
        </div>
        <div onClick={() => setShow(show == 'none' ? 'block' : 'none')} style={{cursor:'pointer',float:'right',marginRight: '20px',background: '#336bd4',padding: '3px 10px',fontSize: '14px',borderRadius: '5px',color:' #fff'}}>选中记录
        </div>
        {/* <div onClick={() => setdataShow(datashow == 'none' ? 'block' : 'none')} style={{cursor:'pointer',float:'left',marginLeft: '20px',background: '#336bd4',padding: '3px 10px',fontSize: '14px',borderRadius: '5px',color:' #fff'}}>数据筛选</div> */}
        <div style={{display:show,background:'#fff',position:'absolute',right:'92px',top:'65px',border:'1px solid #ebebeb',zIndex:'11',overflow:'hidden'}}>
          {
            recordName.map((column,index) => (
              <div style={{fontSize:'14px',margin:'4px 0px',overflow:'hidden',padding:'2px 15px',width:'100%',marginRight:'20px'}}>
                <div style={{float:'left'}}>{column.file_name}</div>
                <div onClick={() => delerecord(column)} style={{float:'left',marginLeft:'10px',marginTop:'2px'}}><BackspaceOutlinedIcon style={{ fontSize: "16px",cursor:'pointer'}} /></div>
              </div>
            ))
          }
        </div>
       
        
        
        </div>
        <div style={{marginBottom:'10px',overflow:'hidden'}}>
        
        <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              value={dataName}
              options={[]}
              renderInput={(params) => (
              <TextField
                  {...params}
                  label="数据集名称"
                  margin="normal"
                  onChange={(e) => setdataName(e.target.value)}
                  variant="outlined"
              />
              )}  
          />
          <Autocomplete
              style={{float:'left',width:'220px',marginRight:'20px'}}
              freeSolo
              size="small"
              options={[]}
              value={dataSection}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="路段"
                  margin="normal"
                  onChange={(e) => setdataSection(e.target.value)}
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
              value={dataCity}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="城市"
                  margin="normal"
                  onChange={(e) => setdataCity(e.target.value)}
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
              value={dataCategory}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="硬件模组"
                  margin="normal"
                  onChange={(e) => setdataCategory(e.target.value)}
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
              value={dataUserName}
              renderInput={(paramsdd) => (
              <TextField
                  {...paramsdd}
                  label="创建人"
                  margin="normal"
                  onChange={(e) => setdataUserName(e.target.value)}
                  defaultValue="44"
                  variant="outlined"
              />
              )}  
          />
          <div style={{float:'left',marginRight:'20px',marginTop:'10px'}}>
            <FormControl style={{marginTop:"-5px",width:'220px'}} >
                <InputLabel id="demo-simple-select-label">有无地图</InputLabel>
                <Select
                  style={{marginTop:'0px'}}
                  value={companyIndex}
                  onChange={companyChange}
                  label="有无地图"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                > 
                  <MenuItem key={0} value={''}></MenuItem>
                  <MenuItem key={1} value={'无'}>无</MenuItem>
                  <MenuItem key={2} value={'有'}>有</MenuItem>
                </Select>
              </FormControl>
          </div>
         
          <div style={{float:'left',marginRight:'20px',marginTop:'10px'}}>
            <FormControl style={{marginTop:"-5px",width:'220px'}} >
                <InputLabel id="demo-simple-select-label">车辆</InputLabel>
                <Select
                  style={{marginTop:'0px'}}
                  value={carIndex}
                  onChange={carChange}
                  label="车辆"
                  labelId="demo-simple-select-label"
          id="demo-simple-select"
                >
                  {vehicle ? vehicle.map((row,index) => {
                      return (
                        <MenuItem key={index} value={row.vehicle_name}>{row.vehicle_name}</MenuItem>
                      );
                    }) : ''}
                </Select>
              </FormControl>
          </div>
          
          
          <div style={{float:'left',marginRight:'20px',width:'225px'}}>
          <Space direction="vertical" size={12} style={{marginTop:'16px'}}>
            <RangePicker
              style={{height:'40px',borderRadius:'5px',borderColor: 'rgba(0, 0, 0, 0.23)'}}
              showTime={{ format: 'YYYY-MM-DD"' }}
              format="YYYY-MM-DD"
              locale={locale}
              onChange={onChange}
              onOk={onOk}
            />
          </Space>
        </div>
          <Button
          style={{margin:'15px 0px'}}
            variant="contained"
            onClick={() => search()}
            size="large"
            color="primary"
          >
            搜索
          </Button>
          <Button
          style={{margin:'15px 0px',marginLeft:'20px',background:'#b2b2b2'}}
            variant="contained"
            onClick={() => Reset()}
            size="large"
            color="primary"
          >
            重置
          </Button>
        </div>
      </div>
      
      <Paper className={classes.root} style={{}}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column,index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    
                    {index == '0' ? <Checkbox
        checked={checked}
        color="primary"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {row ? row.map((row) => {
                // console.log(checkedList);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column,index) => {
                      const value = row[column.id];
                      const numb = value + "";
                      const type = numb.substring(0, 9);
                      const button = (
                        <Button
                          variant="contained"
                          key={numb.substring(10, numb.length)}
                          onClick={() => channelType(row)}
                          size="large"
                          color="primary"
                        >
                          分解
                        </Button>
                      );
                      // console.log(checkedList[row.checkdeIndex][Object.keys(checkedList[row.checkdeIndex])])
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {index == '0' ? (checkedList[row.checkdeIndex] ? <Checkbox
                            checked={checkedList[row.checkdeIndex][Object.keys(checkedList[row.checkdeIndex])[0]]}
                            color="primary"
                            id={column.id}
                            key={checkedList[row.checkdeIndex]}
                            onChange={(e) => handleChangeList(row.checkdeIndex,e,Object.keys(checkedList[row.checkdeIndex])[0],row)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />: '') : (type === "operation" ? button : value)}{(checkedList[row.checkdeIndex] ? checkedList[row.checkdeIndex][0]:'')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }): ''}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
