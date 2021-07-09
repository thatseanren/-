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
import Router from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import ip, { option, annotation } from "../../main_config";
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
      open: false,
      done: "",
      type: "none",
    };
  }
  componentDidMount() {
    axios
      .get(`${ip}${option.getTaskList}?_id=${this.props.TaskId}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data.data[0], done: res.data.data[0].done });
      });
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
  deleteAgree = () => {
    this.setState({
      open: false,
    });
    axios.get(`${ip}del_dtask?_id=${this.props.TaskId}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          type: "flex",
        });
        setTimeout(() => {
          Router.push({
            pathname: ".././tools/annotation",
          });
        }, 2000);
      }
    });
  };
  SequenceRow = () => {
    let list = [];
    for (let a = 0; a < this.state.data.split; a++) {
      list.push(
        <div className={Tag.tableList}>
          <div style={{ flex: "2 1 0%" }}>{a + 1}</div>
          <div style={{ flex: "2 1 0%" }}>{this.state.data.num}</div>
          <div
            style={{ flex: "3 1 0%" }}
          >{`${this.state.data.done}/${this.state.data.num}`}</div>
          <div style={{ flex: "6 1 0%" }}>Admin</div>
          <div style={{ flex: "3 1 0%" }}>
            <Link
              href={
                this.state.data.type === "2DBox"
                  ? `/2DAnnotator?_id=${
                    this.state.data._id
                  }&_taskID=${this.state.data._id}&sequence=${a}`
                  : `${"http://10.78.4.88:555"}?_id=${
                      this.state.data.dataset_id
                    }&_taskID=${this.state.data._id}&sequence=${a}`
              }
            >
              <Button
                style={{
                  display: this.state.data.num === 0 ? "none" : "block",
                }}
                variant="outlined"
                color="primary"
              >
                标注
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    return list;
  };
  render() {
    return (
      <div className={Tag.tagHome}>
        <Header />
        <Alert style={{ display: this.state.type }} severity="success">
          您的标注任务删除成功 <strong>success</strong>
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
                    {/* <Button variant="contained" size="large" color="primary">
                      邀请成员
                    </Button> */}
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
                  <div style={{ flex: "6 1 0%" }}>标注员</div>
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
                style={{ width: "100%" }}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
