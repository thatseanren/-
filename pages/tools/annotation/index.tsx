import React from "react";
import Header from "../../header";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import styles from "../../../styles/Home.module.css";
import Tabs from "@material-ui/core/Tabs";
import { Divider, Grid, Link } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import PagesIcon from "@material-ui/icons/Pages";
import { TabPanel, TabContext } from "@material-ui/lab";
import clsx from "clsx";
import axios from "axios";
import ip, { option } from "../../../main_config";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import qs from "qs";
const useStyles = makeStyles({
  body: {
    position: "relative",
    top: "56px",
    flexDirection: "column",
    margin: "16px 8px",
    width: "initial",
  },
  option: {
    justifyContent: "space-between",
    margin: "16px",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    height: "40px",
    width: "initial",
  },
  autocomplete: {
    root: { width: "343px" },
    '& div[class*="MuiFormControl-root"][class*="MuiTextField-root"]': {
      margin: 0,
      "& label": {
        fontSize: "14px",
        lineHeight: "7px",
      },
      '& div[class*="MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd"]':
        {
          padding: 0,
        },
      '& div[class*="MuiInputBase-root"][class*="Mui-focused"]': {
        paddingBottom: "0",
        paddingTop: "0",
        "& input": { padding: "8px 0px 8px 12px" },
      },
      '&  div[class*="MuiInputBase-root"]': {
        "& input": { padding: "8px 0px 8px 12px" },
      },
    },
  },
  service: {
    '& span[class*="MuiButton-label"]': {
      marginRight: "16px",
      fontSize: "14px",
    },
  },
  annotation: {
    "& span": {
      fontSize: "14px",
      fontWeight: 700,
      letterSpacing: "1.25px",
    },
  },
  icon: {
    fontSize: "16px",
    marginRight: "4px",
    color: "rgb(190,192,208)",
  },
  "& :after": {
    backgroundColor: "rgb(4, 178, 238)",
    caretColor: "rgb(4,178,238)",
    fontSize: "13px",
    borderRadius: "50%",
    display: "inline-block",
    height: "100%",
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    transform: "scale(1.3)",
    width: "100%",
    transition: "opacity .2s cubic-bezier(.4,0,.6,1)",
  },
  my_tab: {
    "& div": {
      '& div[class*="MuiTabs-flexContainer"]': {
        "& button": {
          padding: "0px",
          "& span": {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            width: "auto",
          },
        },
      },
      "& span": {
        height: "3px",
      },
    },
  },
  paperContainer: {
    display: "flex",
    margin: "8px",
    padding: "0px",
    flexFlow: "wrap",
  },
  taskPaper: {
    minWidth: "300px",
    margin: "8px",
    position: "relative",
    // https://css-tricks.com/almanac/selectors/n/nth-of-type/
    "& > div:nth-of-type(1)": {
      padding: "20px 16px 12px",
      "& > div:nth-of-type(1)": {
        color: "rgb(75,57,83)",
        letterSpacing: "1px",
        fontWeight: "bold",
        marginBottom: "12px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      "& > div:nth-of-type(2)": {
        "& div": {
          background: "rgba(90,60,255,0.063)",
          letterSpacing: "0.5px",
          fontSize: "12px",
          padding: "2px 8px",
          color: "rgb(90,60,255)",
          marginRight: "8px",
        },
      },
      "& > div:nth-of-type(3)": {
        "& > div:nth-of-type(1)": {
          flexBasis: "56px",
          color: "#999",
          fontSize: "14px",
          boxFlex: "0",
        },
        "& > div:nth-of-type(2)": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          paddingLeft: "16px",
          fontSize: "14px",
        },
      },
      "& > div:nth-of-type(4)": {
        "& > div:nth-of-type(1)": {
          flexBasis: "56px",
          color: "#999",
          fontSize: "14px",
          boxFlex: "0",
        },
        "& > div:nth-of-type(2)": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          paddingLeft: "16px",
          fontSize: "14px",
        },
      },
    },
    "& > div:nth-of-type(2)": {
      whiteSpace: "nowrap",
      marginBottom: "16px",
      padding: "0px 16px",
      textOverflow: "ellipsis",
      letterSpacing: "0.2px",
      color: "rgb(39, 42,66)",
      fontSize: "12px",
    },
    "& > div:nth-of-type(3)": {
      "& span": {
        marginLeft: "12px",
        fontSize: "14px",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        color: "rgb(4,178,238)",
      },
    },
    "&:hover:before": {
      position: "absolute",
      content: '""',
      width: "100%",
      height: "100%",
      boxShadow: "5px 5px 18px 0 rgb(123 127 155 / 20%)",
      opacity: 1,
      borderRadius: "5px",
      transition: "opacity .3s!important",
      willChange: "auto",
    },
  },
  paper_hover: {},
});
const Tasktag = (props: { tag: string }) => {
  const classes = useStyles();
  return <div>{props.tag || "2D矩形"}</div>;
};

export const Body: React.FC<{}> = (props) => {
  const [tab, setTab] = React.useState(1);
  var [meta, setMeta] = React.useState([]);
  var [tarvalue, setTarValue] = React.useState([]);
  var [pages, setpages] = React.useState([]);
  var [pagesIndex, setpagesIndex] = React.useState(1);
  var [fulllist, setFullList] = React.useState([]);
  var [renderUnfinished, setRenderUnifished] = React.useState([]);

  const tabChangeHandler = (e, v) => {
    setTab(v);
  };

  const list = (value) => {
    axios
    .get(`${ip}${option.getTaskList}`)
    .then((response) => {
      console.log(response)
      if (JSON.stringify(response.data.data) === JSON.stringify(meta)) {
      } else {
        response.data.data.forEach((e, i) => {
          fulllist[i] = (
            <PaperLikeTask
              Tags={e.tags}
              Name={e.name}
              Quantity={e.num}
              Create_time={e.create_time}
              Team={"fsda"}
              TaskStatus={e.status}
              Id={e._id}
              Sequence={e.split}
              DatasetID={e.dataset_id}
              perSequence={e.each}
              Type={e.type}
            />
          );
          if (e.status === 0) {
            renderUnfinished[i] = (
              <PaperLikeTask
                Tags={e.tags}
                Name={e.name}
                Quantity={e.num}
                Create_time={e.create_time}
                Team={"fdsa"}
                TaskStatus={e.status}
                Id={e._id}
                Sequence={e.split}
                DatasetID={e.dataset_id}
                perSequence={e.each}
                Type={e.type}
              />
            );
          }
        });
        setMeta(response.data.data);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  }
  React.useEffect(() => {
    list(1)
  });
  const classes = useStyles();
  return (
    <Grid container className={classes.body}>
      <Grid item container className={classes.option}>
        {/* //搜索 */}
        <Grid item style={{ flexBasis: "347px" }}>
          <Autocomplete
            className={classes.autocomplete}
            freeSolo
            options={["fdsa", "dfsafsda"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="请输入项目名称"
                margin="normal"
                onChange={(e)=> setTarValue(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: <SearchIcon style={{ fontSize: "24px" }} />,
                }}
              />
            )}
          />
        </Grid>
        {/* //服务介绍 & 新建标注项目 */}
        <Grid item container style={{ width: "auto" }}>
          {/* //服务介绍\*/}
          <Button color="primary" variant="text" className={classes.service}>
            <PagesIcon style={{ fontSize: "16px", marginRight: "8px" }} />
            服务介绍
          </Button>
          <Link href="../addTagGing">
            <a>
              <Button
                color="primary"
                variant="contained"
                className={classes.annotation}
                
              >
                {" "}
                新建标注项目
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
      {/* 标注项目Grid */}
      <Grid item component={"div"}>
        <TabContext value={tab}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            onChange={tabChangeHandler}
            aria-label="myTabs"
            className={classes.my_tab}
          >
            <Tab
              label={`我的待标目标 (${renderUnfinished.length})`}
              value={1}
            />
            <Tab label={`全部项目 (${fulllist.length})`} value={2} />

            {/* <TabPanel value={未完成} /> */}
          </Tabs>
          <TabPanel
            className={classes.paperContainer}
            value={1}
            children={renderUnfinished}
          />
          {/* <TabPanel value={全部项目} /> */}
          <TabPanel
            className={classes.paperContainer}
            value={2}
            children={fulllist}
          />
        </TabContext>
      </Grid>
    </Grid>
  );
};
const PaperLikeTask = (props: {
  Tags: string[];
  Name: string;
  Team: string;
  Create_time: string;
  Quantity: string;
  TaskStatus: string;
  Id: string;
  Sequence: number;
  DatasetID: string;
  perSequence: number;
  Type: string;
}) => {
  const classes = useStyles();
  return (
    <Link href={`/taskdetail/${props.Id}`} style={{ flexBasis: "300px" }}>
      <Paper className={clsx(classes.taskPaper)}>
        <Grid container>
          <Grid item> {props.Name || "Sample"} </Grid>
          <Grid item container style={{ marginBottom: "12px" }}>
            <Tasktag tag={"Sample"} />
          </Grid>
          <Grid item container style={{ marginBottom: "8px" }}>
            <div children="数据集" />
            <div children={props.Team || "Sample"} />
          </Grid>
          <Grid item container>
            <div children="数据量" />
            <div children={props.Quantity || "Sample"} />
          </Grid>
        </Grid>
        <Grid item container>
          <AssignmentIndIcon className={classes.icon} />
          <span style={{ color: "rgb(39, 42,66))" }}> {"雷达开发部"}</span>
          <span style={{ margin: "0px 6px" }}> | </span>
          <ScheduleIcon className={classes.icon} />
          <span style={{ color: "rgb(39, 42,66))" }}>
            {" "}
            {props.Create_time}{" "}
          </span>
        </Grid>
        <Divider light />
        <Grid item container style={{ padding: "12px 16px" }}>
          <i>
            <FiberManualRecordIcon
              style={{ color: "rgb(4,178,238)", fontSize: "14px" }}
            ></FiberManualRecordIcon>
          </i>
          <span> {props.TaskStatus || "Sample"} </span>
        </Grid>
      </Paper>
    </Link>
  );
};

export default function AnnotationPage(props) {
  const router = useRouter();
  return (
    <>
      <Header />
      <Body />
      
    </>
  );
}
