import Head from "next/head";
import Image from "next/image";
import Header from "../header.js";
import server_ip from "../../main_config";
import React from "react";
import ReactDOM from "react-dom";
import DataSet from "../../styles/DataSet.module.css";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import Button from "@material-ui/core/Button";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import FormatIndentDecreaseIcon from "@material-ui/icons/FormatIndentDecrease";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import clsx from "clsx";
import Dataset from "../../component/DisplayDataset";
import ForDialogWrapper from "../../component/ForkDialog";
import { useRouter } from "next/router";
import axios from "axios";
import Router  from 'next/router';
import {
  Grow,
  Popper,
  MenuItem,
  MenuList,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
const Detailed_Wrapper = (props) => {
  const route = useRouter();
  const urlQueryObj = route.query;
  return <Detailed {...props} router={route} urlQueryObj={urlQueryObj} />;
};
export default Detailed_Wrapper;
export class Detailed extends React.Component {
  constructor(props) {
    super(props);
    this.ButtonRef = React.createRef();
    this.DialogRef = React.createRef();
    this.state = {
      openPopper: false,
      openlist: 0,
      opacity: 0,
      open:false,
      img: "",
      showlist: 0, //显示隐藏数据列表
      isOpen: false,
      imgurl: "",
      basic: [],
      status:"",
      filedata: [
        {
          jpg: "455",
        },
        {
          jpg: "455",
        },
      ],
      fileindex: 0,
      fileshow: ["block", "none"],
    };
  }
  open = (value) => {
    //展开文章内容
    let openindex = this.state.openlist;
    openindex === 0 ? (openindex = 1) : (openindex = 0);
    this.setState({
      openlist: openindex,
    });
  };

  //鼠标移入移出显示翻页按钮
  openOpacity = (value) => {
    this.setState({
      opacity: 1,
    });
  };
  closeOpacity = (value) => {
    this.setState({
      opacity: 0,
    });
  };

  dataList = (value) => {
    //打开/关闭数据列表
    this.setState({
      showlist: value,
    });
  };

  openfile = (value) => {
    //数据列表层级菜单展开/隐藏
    let show = this.state.fileshow;
    show[value] === "block" ? (show[value] = "none") : (show[value] = "block");
    this.setState({
      fileshow: show,
    });
  };
  openPopper = (e) => {
    this.setState((prev) => {
      let newState = !prev.openPopper;
      return { openPopper: newState };
    });
    // e.preventPro
  };
  deleteData = value => {
    this.setState({ 
      open:true
    });
  }


  deleteAgree = value => {
      this.setState({ 
        open:false
      });
      var qs = require('qs');  
        axios.post(server_ip + 'del_dataset',qs.stringify({
            '_id':this.props.urlQueryObj._id
        }))
      .then((response) => {
        console.log(response)
        if(response.status === 200){
          setTimeout( () => {
              Router.push({
                  pathname:'../myDataSet'
              })
          }, 2000);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  axios = (e) => {
    if (this.props.urlQueryObj.accessibility == undefined) {
      // this.axios()
    }
    axios
      .get(
        server_ip +
          "get_dataset_filelist?_id=" +
          this.props.urlQueryObj._id +
          "&limit=1000",
        {}
      )
      .then((response) => {
        var ite = response.data.data[0].jpg;
        var url =
          ite.substring(0, 10) +
          "..." +
          ite.substring(ite.length - 10, ite.length);

        this.setState({
          img: server_ip + "download?url=" + response.data.data[0].jpg,
          filedata: response.data.data,
          imgurl: url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(server_ip + "get_dataset_list?_id=" + this.props.urlQueryObj._id, {})
      .then((response) => {
        console.log(response)
        this.setState({
          basic: response.data.data[0],
          status:response.data.data[0].flag
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleClose = () => {
    this.setState({ 
      open:false
    });
  };
  componentDidMount() {
    setTimeout(() => {
      this.axios();
    }, 500);
  }
  render() {
    let { accessibility } = this.props.router.query;
    // let { accessibility } = "private";
    return (
      <div>
        <Header />
        <div style={{width:"400px",margin:"20px auto",paddingTop:"220px",display:this.state.status === 0 ? 'block' : 'none'}}>
          <img style={{width:"100%"}} src="/qsy.png" />
          <div style={{textAlign:"center",color:"#666",marginTop:"20px",fontWeight:"500",fontSize:"17px"}}>请等待数据分解</div>
        </div>
        <div style={{display:this.state.status === 1 ? 'block' : 'none'}}>
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

        {/* <ForkDialog ref={this.ForkRef} /> */}
        <div className={DataSet.home}>
          <div className={DataSet.grid}>
            <div className={DataSet.publicDataChip}>
              <div className={DataSet.chipContainer}>
                <VisibilityOutlinedIcon
                  style={{ fontSize: "17px", marginLeft: "5px" }}
                />
              </div>
              <div className={DataSet.publicDataChipData}>4137</div>
            </div>
            <div className={DataSet.publicDataChip}>
              <div className={DataSet.chipContainer}>
                <ThumbUpAltOutlinedIcon
                  style={{ fontSize: "17px", marginLeft: "5px" }}
                />
              </div>
              <div className={DataSet.publicDataChipData}>1</div>
            </div>
            <div className={DataSet.publicDataChip}>
              <div className={DataSet.chipContainer}>
                <StarBorderOutlinedIcon
                  style={{ fontSize: "17px", marginLeft: "5px" }}
                />
              </div>
              <div className={DataSet.publicDataChipData}>15</div>
            </div>
          </div>
          <div className={DataSet.datasetHead}>
            <div className={DataSet.thumbnail}>
              <div className={DataSet.imgHome}>
                <Image
                  style={{ borderRadius: "5px" }}
                  src="/cover-CompCars.png"
                  alt="Fawai Logo"
                  width={80}
                  height={80}
                />
              </div>
              <div className={DataSet.dataName}>
                <div className={DataSet.detailedTitle}>CompCars</div>
                <span style={{ fontSize: "14px" }}>
                  创建来自Data Decorators
                </span>
              </div>
            </div>
            <div className={DataSet.dataButton}>
              {accessibility === "private" ? (
                <>
                  <Button
                    ref={this.ButtonRef}
                    style={{
                      padding: "6px 8px",
                    }}
                    variant="contained"
                    size="large"
                    color="primary"
                    aria-haspopup="true"
                    aria-controls={
                      this.state.openPopper ? "menu-list-grow" : undefined
                    }
                    onClick={(e) => {
                      this.openPopper(e);
                    }}
                  >
                    管理数据
                    <ExpandMoreIcon style={{ marginLeft: "10px" }} />
                  </Button>{" "}
                  <Popper
                    open={this.state.openPopper}
                    anchorEl={this.ButtonRef.current}
                    role={undefined}
                    transition
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={() => {
                              this.openPopper();
                            }}
                          >
                            <MenuList>
                              <MenuItem
                                onClick={() => this.deleteData()}
                              >
                                {" "}
                                <ShareIcon
                                  style={{
                                    marginRight: "10px",
                                    fontSize: "1.2rem",
                                  }}
                                />
                                删除数据集
                              </MenuItem>
                              <MenuItem> Comming Soon</MenuItem>
                              <MenuItem> Comming Soon </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <>
                  <Button
                    ref={this.ButtonRef}
                    style={{
                      padding: "6px 8px",
                    }}
                    variant="contained"
                    size="large"
                    color="primary"
                    aria-haspopup="true"
                    aria-controls={
                      this.state.openPopper ? "menu-list-grow" : undefined
                    }
                    onClick={(e) => {
                      this.openPopper(e);
                    }}
                  >
                    探索数据集
                    <ExpandMoreIcon style={{ marginLeft: "10px" }} />
                  </Button>{" "}
                  <Popper
                    open={this.state.openPopper}
                    anchorEl={this.ButtonRef.current}
                    role={undefined}
                    transition
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={() => {
                              this.openPopper();
                            }}
                          >
                            <MenuList>
                              <MenuItem
                                onClick={() => this.DialogRef.current(this.props.urlQueryObj._id)}
                              >
                                {" "}
                                <ShareIcon
                                  style={{
                                    marginRight: "10px",
                                    fontSize: "1.2rem",
                                  }}
                                />
                                Fork数据集
                              </MenuItem>
                              <MenuItem> Comming Soon</MenuItem>
                              <MenuItem> Comming Soon </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              )}
            </div>
            <ForDialogWrapper Syntec_ref={this.DialogRef} />
          </div>
          <div className={DataSet.tabsContainer}>
            <div className={DataSet.muiButton}>
              <ArtTrackIcon />
              <div style={{ marginLeft: "5px" }}>概要</div>
            </div>
          </div>
          <div className={DataSet.DatasetOverview}>
            <div className={DataSet.overviewField}>
              <div className={DataSet.fieldHome}>
                <div
                  className={
                    this.state.openlist === 0
                      ? DataSet.mdContainerClose
                      : DataSet.mdContainer
                  }
                >
                  <h1>Overview</h1>
                  <p>{this.state.basic.description}</p>
                </div>
                <div className={DataSet.expandBar} onClick={() => this.open()}>
                  {this.state.openlist === 0 ? (
                    <ExpandMoreOutlinedIcon style={{ margin: "0px auto" }} />
                  ) : (
                    <ExpandLessOutlinedIcon style={{ margin: "0px auto" }} />
                  )}
                </div>
              </div>
              <div className={DataSet.fieldHome}>
                <div className={DataSet.previewTitle}>
                  <div className={DataSet.previewTitleLeft}>数据预览</div>
                  {/* <div className={DataSet.previewTitleBtnField}>
                    <Button variant="outlined" color="primary">
                      查看数据
                    </Button>
                  </div> */}
                </div>
                <div className={DataSet.groupContainer}>
                  <div className={DataSet.groupSideContainer}>
                    {/* <div
                      className={clsx(DataSet.poweredBy, DataSet.poweredTitle)}
                    >
                      <span>Powered By Graviti</span>
                      <div className={DataSet.ico}>
                        <FormatIndentDecreaseIcon />
                      </div>
                    </div> */}
                    <div
                      style={{
                        display: this.state.showlist === 0 ? "block" : "none",
                      }}
                    >
                      <div className={DataSet.fileSelectorContainer}>
                        <div className={DataSet.objectPathDisplay}>
                          {this.state.imgurl}
                        </div>
                        <div
                          className={DataSet.objectSelectButton}
                          onClick={() => this.dataList(1)}
                        >
                          Select
                        </div>
                      </div>
                      <div
                        className={clsx(DataSet.poweredBy, DataSet.poweredList)}
                      >
                        <span>Annotation Type</span>
                        <div title="455ff">
                          <ContactSupportOutlinedIcon
                            style={{ fontSize: "18px", marginLeft: "3px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={DataSet.fileLstContainer}
                      style={{
                        display: this.state.showlist === 1 ? "block" : "none",
                      }}
                    >
                      <div
                        className={DataSet.button}
                        onClick={() => this.dataList(0)}
                      >
                        <ArrowBackIosIcon
                          style={{ fontSize: "12px", alignSelf: "center" }}
                        />
                        <span>bcak</span>
                      </div>
                      <div className={DataSet.fileList}>
                        <div className={DataSet.segmentContainer}>
                          {this.state.filedata.map((item, index) => {
                            var jpg = item.jpg.split("/");
                            return (
                              <div>
                                <div
                                  className={
                                    index === this.state.fileindex
                                      ? clsx(
                                          DataSet.objectBlock,
                                          DataSet.activeObjectBlock
                                        )
                                      : DataSet.objectBlock
                                  }
                                  onClick={() => {
                                    var url =
                                      item.jpg.substring(0, 10) +
                                      "..." +
                                      item.jpg.substring(
                                        item.jpg.length - 10,
                                        item.jpg.length
                                      );
                                    this.setState({
                                      imgurl: url,
                                      fileindex: index,
                                      img:
                                        server_ip + "download?url=" + item.jpg,
                                    });
                                  }}
                                >
                                  {jpg[5]}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={DataSet.viewerGroupDisplay}
                    onMouseMove={() => this.openOpacity()}
                    onMouseOut={() => this.closeOpacity()}
                  >
                    <div style={{ opacity: this.state.opacity }}>
                      <div
                        className={DataSet.viewerArrowLeft}
                        style={{ left: "20px" }}
                        onClick={() => {
                          var fileda = this.state.filedata;
                          var ind = this.state.fileindex;
                          if (ind > 0) {
                            var img = fileda[ind - 1].jpg;
                            var url =
                              fileda[ind - 1].jpg.substring(0, 10) +
                              "..." +
                              fileda[ind - 1].jpg.substring(
                                fileda[ind - 1].jpg.length - 10,
                                fileda[ind - 1].jpg.length
                              );
                            this.setState({
                              imgurl: url,
                              fileindex: ind - 1,
                              img: server_ip + "download?url=" + img,
                            });
                          }
                        }}
                      >
                        <ArrowBackIosIcon style={{ fontSize: "12px" }} />
                      </div>
                      <div
                        className={DataSet.viewerArrowLeft}
                        style={{ right: "20px" }}
                        onClick={() => {
                          var fileda = this.state.filedata;
                          var ind = this.state.fileindex;
                          if (ind < fileda.length) {
                            var img = fileda[ind + 1].jpg;
                            var url =
                              fileda[ind + 1].jpg.substring(0, 10) +
                              "..." +
                              fileda[ind + 1].jpg.substring(
                                fileda[ind + 1].jpg.length - 10,
                                fileda[ind + 1].jpg.length
                              );
                            this.setState({
                              imgurl: url,
                              fileindex: ind + 1,
                              img: server_ip + "download?url=" + img,
                            });
                          }
                        }}
                      >
                        <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                      </div>
                    </div>

                    <img src={this.state.img} />
                  </div>
                </div>
              </div>
            </div>
            <div className={DataSet.DatasetOverviewInfoSide}>
              <div className={DataSet.DatasetInfoFieldInfoBlock}>
                <div className={DataSet.DatasetInfoFieldInfoTitle}>
                  数据集信息
                </div>
                <div className={DataSet.DatasetInfoFieldInfoEntry}>
                  <span className={DataSet.DatasetInfoFieldInfoSubtitle}>
                    标注类型
                  </span>
                  {this.state.basic.tags ? (
                    this.state.basic.tags.map((item, index) => {
                      return (
                        <span className={DataSet.DatasetInfoFieldTagChip}>
                          <span className={DataSet.DatasetDetailTagChipChip}>
                            {item}
                          </span>
                        </span>
                      );
                    })
                  ) : (
                    <span className={DataSet.DatasetInfoFieldTagChip}>
                      <span className={DataSet.DatasetDetailTagChipChip}>
                        暂无
                      </span>
                    </span>
                  )}
                </div>
                <div className={DataSet.DatasetInfoFieldInfoEntry}>
                  <span className={DataSet.DatasetInfoFieldInfoSubtitle}>
                    数据格式
                  </span>
                  {this.state.basic.tasks ? (
                    this.state.basic.tasks.map((item, index) => {
                      return (
                        <span className={DataSet.DatasetInfoFieldTagChip}>
                          <span className={DataSet.DatasetDetailTagChipChip}>
                            {item}
                          </span>
                        </span>
                      );
                    })
                  ) : (
                    <span className={DataSet.DatasetInfoFieldTagChip}>
                      <span className={DataSet.DatasetDetailTagChipChip}>
                        暂无
                      </span>
                    </span>
                  )}
                </div>
                <div className={DataSet.DatasetInfoFieldInfoEntry}>
                  <span className={DataSet.DatasetInfoFieldInfoSubtitle}>
                    创建部门
                  </span>
                  <span className={DataSet.DatasetInfoFieldTagChipSpan}>
                    {this.state.basic.department
                      ? this.state.basic.department
                      : "暂无"}
                  </span>
                </div>
                <div className={DataSet.DatasetInfoFieldInfoEntry}>
                  <span className={DataSet.DatasetInfoFieldInfoSubtitle}>
                    更新时间
                  </span>
                  <span className={DataSet.DatasetInfoFieldTagChipSpan}>
                    {this.state.basic.create_time
                      ? this.state.basic.create_time
                      : "暂无"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
