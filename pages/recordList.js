import React, { useState,useEffect  } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Header from './header.js';
import server_ip from '../main_config';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ForkDialog from '../component/addDialog';


export default function StickyHeadTable() {

 
    // getData=(data)=>{
    //   console.log(data);
    // }

    const [open, setOpen] = React.useState(false);
    const DialogRef = React.createRef()
    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
      ];
  const [page, setPage] = React.useState(0);
  const [row, setrow] = useState([]);
  const [id, setId] = useState(0);
  const [count, setCount] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleCreate = (value) => {
    axios.get(server_ip + 'get_record_list?limit='+rowsPerPage+'&page='+value*1+1,{'limit':15,'page':1})
    .then(function (response) {
      console.log(response.data)
        const data = response.data.data;
        let temp = []
        setCount(response.data.count)
        for(let i=0;i<data.length;i++){
            var Format=["Kb","Mb","Gb","Tb","Pb"]
            var filenumb=data[i].file_size/1024
            var tag;
            data[i].tag ? tag = data[i].tag.toString() : tag = ""
            Format.forEach((item) => {
              let numb = 0
              if(filenumb >= 1024){
                filenumb = parseFloat(filenumb/1024).toFixed(2)
              } else if(filenumb <= 1024 && numb == 0) {
                filenumb = filenumb+item
                numb++
              }   
            })
            temp.push(createData(data[i].data_name,data[i].create_time,data[i].file_name,filenumb,tag,data[i].frame_num,"operation,"+data[i]._id));
        }
        setrow(temp);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
useEffect(() => {
    handleCreate(0)
}, [])
  const columns = [
        { id: 'data_name', label: '数据集名称', minWidth: 100 },
        { id: 'create_time', label: '创建时间', minWidth: 120 },
        {
          id: 'file_name',
          label: '文件名称',
          minWidth: 140,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'file_size',
          label: '文件大小',
          minWidth: 100,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'tag',
          label: '标签',
          minWidth: 140,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
            id: 'frame_num',
            label: '文件数量',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toFixed(2),
          },
          {
            id: 'operation',
            label: '操作',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toFixed(2),
          },
      ];
      
      function createData(data_name, create_time, file_name, file_size ,tag,frame_num,operation) {
        return { data_name, create_time, file_name, file_size, tag ,frame_num,operation};
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
    handleCreate(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{width: "1223px",margin: "0px auto",paddingTop:"56px"}}>
    <Header />
    <ForkDialog Syntec_ref={DialogRef} />
    <div style={{color:"#272834",fontWeight:"500",fontSize:"18px",padding:"30px 0 20px 0",borderBottom:"1px solid rgba(0,0,0,.12)",marginBottom: "30px"}}>
      数据集记录
    </div>
    <Paper className={classes.root} style={{}}>
    
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {row.map((row) => {
              return (

                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const numb=value+""
                    const type = numb.substring(0,9)
                    const button =<Button variant="contained" key={numb.substring(10,numb.length)} onClick={() => DialogRef.current(row)} size="large" color="primary">
                      分解
                    </Button>
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {type === 'operation' ? button : value}
                        
                      </TableCell>
                      
                    );
                    
                  })}
                {/* <TableCell>
                    <Button variant="contained" size="large" color="primary">444</Button>
                </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
