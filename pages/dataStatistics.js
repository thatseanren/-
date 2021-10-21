import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import axios from "axios";
import Link from 'next/link';
import headerstyle from'../styles/header.module.css';
import Router  from 'next/router';
import server, { option } from "../main_config";
import Header from "./header.js";
import * as echarts from 'echarts';
import '../config';
import DialogContentText from '@material-ui/core/DialogContentText';
// import ForDialogWrapper from "../../component/ForkDialog";

export default class App extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            dataChar:[],
            dataCharType:[],
        };
      }

    char = (value,type) => {
      var myChart = echarts.init(document.getElementById('forms'));
      // 绘制图表
      myChart.setOption({
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量1','销量2']
          },
          xAxis: {
              data: value
          },
          yAxis: {},
          series: [
              {
              name: '销量1',
              type: 'bar',
              barWidth: '60px',
              data: type
              }
          ]
      });
    }
 
    
    componentDidMount () {
        const that=this;
        
      

        var qs = require('qs');  
        axios.post(server + 'count_label',qs.stringify({
            'dataset_id':'616d1c77ca301baac7c635a7',
            'need_list':'1',
            'need_count':'1',
        }))
        .then(function (response) {
            console.log(response.data.result)
            var char = response.data.result
            var dataChar = []
            var dataCharType = []
            Object.keys(char).map(function(k,v){
              dataChar.push(k)
              dataCharType.push(char[k])
            })
            that.char(dataChar,dataCharType)
        })
        .catch(function (error) {
            console.log(error);
        });
       
    
    }
    render() {
      console.log(this.state.data)
      
    

    return (
      <div>
        <Header />
        <div id="forms" style={{width:'650px',height:'350px'}}></div>
      </div>
    )
  }
}
  