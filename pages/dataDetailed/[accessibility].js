import Image from "next/image";
import Header from "../header.js";
import server_ip from "../../main_config";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import DataSet from "../../styles/DataSet.module.css";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import clsx from "clsx";
import ForDialogWrapper from "../../component/ForkDialog";
import { useRouter } from "next/router";
import axios from "axios";
import Router from "next/router";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import { Preview } from "../../component/Preview";
import "../../config";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import Switch from "@mui/material/Switch";
import { Labellist } from "../../component/Preview";
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
const useStyles = makeStyles({
  MuiMobileStepperProgress: {
    width: "200%",
    background: "rgba(0,0,0,0)",
    "&:MuiMobileStepper_progress": {
      width: "200%",
    },
  },
  MuiPaper_root: {
    "&:MuiMobileStepper_progress": {
      position: "absolute",
      content: '""',
      display: "block",
      right: 0,
      top: "2px",
      width: "1px",
      height: "10px",
      background: "#000",
      marginRight: "5px",
    },
  },
  MuiMobileStepper_progress: {
    width: "100%",
  },
  MuiFormControlLabel_labelPlacementStart:{
width:'100px'
  }
});

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
      open: false,
      downloadNumb: "",
      img: "",
      showlist: 0, //显示隐藏数据列表
      downloadOpen: false,
      imgurl: "",
      basic: [],
      page: [],
      status: "",
      errorspan: "",
      errorShow: "none",
      isrand: "0",
      seed: "",
      pageIndex: 1,
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
      switchState: true,
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
    this.setState((state) => {
      return { opacity: 1 };
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

  download = (value) => {
    //下载数据集
    this.setState({
      downloadOpen: true,
    });
  };

  handleChange = (value) => {
    console.log(value.target.value);
    this.setState({
      isrand: value.target.value,
    });
  };

  downloadInput = (value) => {
    var reg = /^[0-9]+.?[0-9]*$/;
    let numb = "";
    if (reg.test(value) && value <= 100 && value > 0) {
      numb = value;
    }
    this.setState({
      downloadNumb: numb,
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
  deleteData = (value) => {
    this.setState({
      open: true,
    });
  };
  handleListItemClick = (value) => {
    console.log(value);
    var numb = this.state.pageIndex;
    if (!this.state.pageIndex) {
      if (value != "all") {
        this.error("百分比不能为空");
        return false;
      } else {
        numb = 0;
      }
    }
    axios
      .post(
        server_ip +
          "download_dataset?dataset_id=" +
          this.props.urlQueryObj._id +
          "&zip=0&split=" +
          numb +
          "&type=" +
          value +
          "&is_rand=" +
          this.state.isrand +
          "&seed=" +
          this.state.seed +
          "&rename=1"
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 0) {
          this.error(res.data.info);
        } else {
          const file_path_arr = res.data.path.split("/");
          const file_name = file_path_arr.pop();
          const file_path = file_path_arr.join("/");
          console.log(
            server_ip + "download?url=" + file_path + "/" + file_name
          );
          window.location.href =
            server_ip + "download?url=" + file_path + "/" + file_name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteAgree = (value) => {
    this.setState({
      open: false,
    });
    var qs = require("qs");
    axios
      .post(
        server_ip + "del_dataset",
        qs.stringify({
          _id: this.props.urlQueryObj._id,
        })
      )
      .then((response) => {
        console.log(
          `${
            (server_ip + "del_dataset",
            qs.stringify({
              _id: this.props.urlQueryObj._id,
            }))
          }\n`,
          response
        );
        if (response.status === 200) {
          setTimeout(() => {
            Router.push({ pathname: "../myDataSet" });
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  axios = (e) => {
    if (this.props.urlQueryObj.accessibility == undefined) {
      // this.axios()
    }
    /*
      Fetch <folder> data save a collection of jpg, json, pcd. 
      chop the first imgurl displays in the input field.
      fetch the first img displays in the img view.
    */
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
          filedata: response.data.data, //collection of jpg, json, pcd. Array
          imgurl: url, //Displayed in a abriviative way
        });
        console.log(this.state.filedata);
      })
      .catch(function (error) {
        console.log(error);
      });
    /*
      Fetch <basic creation> data 

*/
    axios
      .get(server_ip + "get_dataset_list?_id=" + this.props.urlQueryObj._id, {})
      .then((response) => {
        this.setState({
          basic: response.data.data[0],
          status: response.data.data[0].flag,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleClose = () => {
    this.setState({
      open: false,
      downloadOpen: false,
    });
  };
  componentDidMount() {
    var pa = [];
    for (let i = 1; i <= 100; i++) {
      pa.push(i);
    }
    this.setState({
      page: pa,
    });
    setTimeout(() => {
      this.axios();
    }, 1500);
  }
  pages = (value) => {
    this.setState({
      pageIndex: value,
    });
  };
  error = (value) => {
    this.setState({
      errorspan: value,
      errorShow: "flex",
    });
    setTimeout(() => {
      this.setState({
        errorShow: "none",
      });
    }, 3000);
  };
  render() {
    let { accessibility, _id, category } = this.props.router.query;

    return (
      <div>
        <Header />
        <Alert
          style={{
            display: this.state.errorShow,
            top: "56px",
            position: "fixed",
            zIndex: "10000000",
            left: "0px",
            right: "0px",
          }}
          severity="error"
        >
          {this.state.errorspan} <strong>error</strong>
        </Alert>
        <div
          style={{
            width: "400px",
            margin: "20px auto",
            paddingTop: "220px",
            display: this.state.status === 0 ? "block" : "none",
          }}
        >
          <img style={{ width: "100%" }} src="/qsy.png" />
          <div
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: "20px",
              fontWeight: "500",
              fontSize: "17px",
            }}
          >
            请等待数据分解
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => this.deleteData()}
            >
              取消分解
            </Button>
          </div>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.downloadOpen}
        >
          <DialogTitle id="simple-dialog-title">选择你的下载</DialogTitle>
          <List style={{ marginTop: "-10px" }}>
            <ListItem
              style={{
                width: "260px",
                overflow: "hidden",
                paddingBottom: "25px",
              }}
            >
              <div>设置训练集百分比</div>

              <div
                style={{
                  zIndex: "10000",
                  width: "452px",
                  position: "absolute",
                  overflow: "hidden",
                  marginTop: "56px",
                  marginLeft: "-6px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    display: "flex",
                    width: "calc(50% - 8px)",
                    left: "8px",
                  }}
                >
                  {this.state.page.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          this.pages(index + 1);
                        }}
                        style={{
                          flex: "1",
                          cursor: "pointer",
                          zIndex: "10",
                          height: "21px",
                        }}
                        title={index + 1}
                      ></div>
                    );
                  })}
                </div>
                <MobileStepper
                  variant="progress"
                  steps={101}
                  position="static"
                  activeStep={this.state.pageIndex}
                />
              </div>
            </ListItem>
            <ListItem
              style={{ display: "inherit", fontSize: "12px", color: "#999" }}
            >
              <div style={{ width: "100%" }}>
                训练集下载比例:{this.state.pageIndex}%
              </div>
              <div>测试集下载比例:{100 - this.state.pageIndex}%</div>
            </ListItem>
            <ListItem style={{ width: "260px", display: "none" }}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  value={this.state.isrand}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value={"0"}
                    control={<Radio />}
                    label="顺序拆分"
                  />
                  <FormControlLabel
                    value={"1"}
                    control={<Radio />}
                    label="随机拆分"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem
              style={{ display: this.state.isrand == 0 ? "none" : "block" }}
            >
              <TextField
                onChange={(e) =>
                  this.setState({
                    seed: e.target.value,
                  })
                }
                style={{ marginTop: "-10px", width: "100%" }}
                id="standard-basic"
                label="输入随机种子"
              />
            </ListItem>
            <ListItem button onClick={() => this.handleListItemClick("train")}>
              <ListItemAvatar>
                <BackupOutlinedIcon style={{ marginTop: "3px" }} />
              </ListItemAvatar>
              <ListItemText primary={"下载训练集"} />
            </ListItem>
            <ListItem button onClick={() => this.handleListItemClick("test")}>
              <ListItemAvatar>
                <BackupOutlinedIcon style={{ marginTop: "3px" }} />
              </ListItemAvatar>
              <ListItemText primary={"下载测试集"} />
            </ListItem>
            <ListItem button onClick={() => this.handleListItemClick("both")}>
              <ListItemAvatar>
                <BackupOutlinedIcon style={{ marginTop: "3px" }} />
              </ListItemAvatar>
              <ListItemText primary={"训练集+测试集"} />
            </ListItem>
          </List>
        </Dialog>
        <div style={{ display: this.state.status === 1 ? "block" : "none" }}>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
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
          <div className={DataSet.home}>
            <div className={DataSet.grid}>
              <div className={DataSet.publicDataChip}>
                <div className={DataSet.chipContainer}>
                  <VisibilityOutlinedIcon
                    style={{ fontSize: "17px", marginLeft: "5px" }}
                  />
                </div>
                <div className={DataSet.publicDataChipData}>0</div>
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
                <div className={DataSet.publicDataChipData}>0</div>
              </div>
            </div>
            <div className={DataSet.datasetHead}>
              <div className={DataSet.thumbnail}>
                <div className={DataSet.imgHome}>
                  <Image
                    style={{ borderRadius: "5px" }}
                    src={"/cover-CompCars.png"}
                    alt="Fawai Logo"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={DataSet.dataName}>
                  <div className={DataSet.detailedTitle}>
                    {this.state.basic.name}
                  </div>
                  <span style={{ fontSize: "14px" }}>
                    创建来自 {` ${this.state.basic.department}`}
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
                                <MenuItem onClick={() => this.deleteData()}>
                                  {" "}
                                  <ShareIcon
                                    style={{
                                      marginRight: "10px",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                  删除数据集
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    this.download(this.props.urlQueryObj._id)
                                  }
                                >
                                  <BackupOutlinedIcon
                                    style={{
                                      marginRight: "10px",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                  下载数据集
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    this.download(this.props.urlQueryObj._id)
                                  }
                                >
                                  <MobiledataOffIcon
                                    style={{
                                      marginRight: "10px",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                  数据统计
                                </MenuItem>
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
                                  onClick={() =>
                                    this.DialogRef.current(
                                      this.props.urlQueryObj._id
                                    )
                                  }
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
                                <MenuItem
                                  onClick={() =>
                                    this.download(this.props.urlQueryObj._id)
                                  }
                                >
                                  <BackupOutlinedIcon
                                    style={{
                                      marginRight: "10px",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                  下载数据集
                                </MenuItem>
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
                    <h1>概述</h1>
                    <p>{this.state.basic.description}</p>
                  </div>
                  <div
                    className={DataSet.expandBar}
                    onClick={() => this.open()}
                  >
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
                  </div>
                  <div className={DataSet.groupContainer}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        className={clsx(DataSet.poweredBy, DataSet.poweredList)}
                      >
                        <span>Annotation Type</span>
                        <div title="455ff">
                          <ContactSupportOutlinedIcon
                            style={{ fontSize: "18px", marginLeft: "3px" }}
                          />
                        </div>
               
                          <FormControlLabel
                          labelPlacement="start"
                          style={{}}
                            control={
                              <Switch
                              style={{width:'50px'}}
                              size="small"
                                name="显示2D图片"
                                checked={this.state.switchState}
                                onChange={() => {
                                  this.setState((prev) => ({
                                    switchState: !prev.switchState,
                                  }));
                                }}
                              ></Switch>
                            }
                            label="显示2D图片"
                          />{" "} 
                      </div>{" "}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className={DataSet.groupSideContainer}>
                        <div
                          style={{
                            display: "block",
                            overflow: "hidden",
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
                        </div>{" "}
                        <div
                          className={DataSet.fileLstContainer}
                          style={{
                            display:
                              this.state.showlist === 1 ? "block" : "none",
                            position: "absolute",
                            zIndex: "2",
                            background:"rgba(255,255,255,0.7);",
                            paddingRight:"20px",
                            left: "240px",
                            scrollbarWidth: "none",
                          }}
                        >
                          <div
                            className={DataSet.button}
                            onClick={() => this.dataList(0)}
                          >
                            <ArrowBackIosIcon
                              style={{ fontSize: "12px", alignSelf: "center" }}
                            />
                            <span>back</span>
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
                                            server_ip +
                                            "download?url=" +
                                            item.jpg,
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
                        <Labellist
                          box_url={
                            `${server_ip}download?url=` +
                            this.state.filedata[this.state.fileindex].json
                          }
                        
                        />
                      </div>
                      <div
                        className={DataSet.viewerGroupDisplay}
                        onMouseEnter={() => this.openOpacity()}
                        onMouseOut={() => this.closeOpacity()}
                      >
                        <div style={{ opacity: 1 }}>
                          <div
                            className={DataSet.viewerArrowLeft}
                            style={{ left: "20px", zIndex: 1 }}
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
                            style={{ right: "20px", zIndex: 1 }}
                            onClick={() => {
                              var fileda = this.state.filedata;
                              var ind = this.state.fileindex;
                              console.log(fileda.length);
                              console.log(ind);
                              if (ind + 1 < fileda.length) {
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
                        <Preview
                          datasetID={_id}
                          category={category}
                          currentFrame={this.state.fileindex}
                          show_2d={this.state.switchState}
                        />
                      </div>
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
                  </div>
                  <div className={DataSet.DatasetInfoFieldInfoEntry}>
                    <span className={DataSet.DatasetInfoFieldInfoSubtitle}>
                      数据格式
                    </span>
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
