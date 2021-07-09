import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BarChartIcon from "@material-ui/icons/BarChart";
import ImageIcon from "@material-ui/icons/Image";
import VideocamIcon from "@material-ui/icons/Videocam";
import StorageIcon from "@material-ui/icons/Storage";
import clsx from "clsx";
import Link from "next/link";
import server from "../main_config";
const useStyles = makeStyles({
  briefInfo: {
    marginRight: "8px",
    background: "rgba(0,0,0,.8)",
    padding: "6px 12px",
    alignItems: "center",
    borderRadius: "4px",
    color: "white",
    display: "flex",
    lineHeight: "17px",
  },
  img: {
    backgroundColor: "yellow",
    width: "100%",
    height: "200px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  miniLabel: {
    position: "absolute",
    bottom: "10px",
    right: "8px",
  },
  miniLabel_icon: {
    fontSize: "16px",
    display: "block",
    margin: "auto 6px auto 0",
  },
  miniLabel_Span: {
    fontSize: "16px",
    paddingRight: "6px",
    borderRight: "1px solid white",
    display: "flex",
  },
  metaData: {
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #e9eef4",
    borderTop: "none",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  metaData_Div: {
    marginBottom: "10px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "block",
    height: "20px",
  },
  metaData_Span: {
    "&:after": {
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
  // box-shadow for hovering over element.
  paper_hover: {
    "&:hover:after": {
      position: "absolute",
      content: '""',
      display: "block",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      boxShadow: "5px 5px 18px 0 rgb(123 127 155 / 20%)",
      opacity: 1,
      // zIndex: -1,
      borderRadius: "5px",
      transition: "opacity .3s!important",
      willChange: "auto",
    },
  },
});
export default function Dataset(props: {
  data: {
    img: string;
    format: string;
    name: string;
    num: number;
    size: number;
    tags: string[];
    _id: string;
    category: string;
    create_time: string;
    department: string;
  }[];
  accessibility: string;
}) {
  const classes = useStyles();
  return (
    <div
      className={"first_Dataset_Div"}
      style={{
        // width: "calc(100% - 280px)",
        display: "flex",
        paddingTop: "15px",
        flexWrap: "wrap",
      }}
    >
      {props.data ? (
        props.data.map(
          ({
            img,
            format,
            name,
            num,
            size,
            tags,
            _id,
            category,
            create_time,
            department,
          }) => (
            <Link
              href={`/dataDetailed/`}
              as={`/dataDetailed/${props.accessibility}?` + "_id" + "=" + _id}
            >
              {/* <Link href={`/dataDetailed?id=`+_id} as={`/dataDetailed/${props.accessibility}`}> */}
              <a
                style={{
                  cursor: "pointer",
                  width: "calc((100% - 32px)/3)",
                  height: "fit-content",
                  marginRight: "10px",
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <Paper
                  className={clsx(classes.paper_hover, "second_Dataset_Div")}
                  style={{
                    height: "fit-content",
                    marginRight: "10px",
                    marginBottom: "16px",
                    position: "relative",
                  }}
                  elevation={1}
                >
                  <Grid
                    container
                    justify="center"
                    style={{ flexFlow: "column" }}
                  >
                    <Grid
                      item
                      className={"forth_Dataset_Div_Grid_item"}
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <img
                        className={classes.img}
                        src={img ? `${server}download?url=${img}` : '/imgqs.jpg'}
                      />
                      <div className={classes.miniLabel}>
                        <div className={classes.briefInfo}>
                          <span className={classes.miniLabel_Span}>
                            {format === "video" ? (
                              <VideocamIcon
                                className={classes.miniLabel_icon}
                              />
                            ) : (
                              <ImageIcon className={classes.miniLabel_icon} />
                            )}
                          </span>
                          <span className={classes.miniLabel_Span}>
                            <BarChartIcon className={classes.miniLabel_icon} />
                            <i style={{ fontSize: "12px" }}> {num || "C"}</i>
                          </span>
                          <span
                            style={{
                              fontSize: "16px",
                              paddingRight: "6px",
                              paddingLeft: "6px",
                              display: "flex",
                            }}
                          >
                            <StorageIcon className={classes.miniLabel_icon} />
                            <i style={{ fontSize: "12px" }}> {size || "S"}</i>
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <div className={classes.metaData}>
                      <div className={classes.metaData_Div}>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            height: "18px",
                          }}
                        >
                          {name || "Dataset Name"}
                        </span>
                      </div>
                      <div className={classes.metaData_Div}>
                        <span
                          style={{
                            fontSize: "12px",
                            height: "15px",
                          }}
                        >
                          {category || "Category"}
                        </span>
                      </div>
                      {<div className={classes.metaData_Div} style={{fontSize: '17px'}}> {tags}</div>}
                      <div className={classes.metaData_Div}>
                        <span style={{ fontSize: "12px" }}>
                          {department || "Author"}
                        </span>
                      </div>
                    </div>
                  </Grid>
                </Paper>
              </a>
            </Link>
          )
        )
      ) : (
        <div
          style={{
            margin: "0px auto",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          <img
            style={{ width: "180px" }}
            src="https://tutu.s3.cn-northwest-1.amazonaws.com.cn/company-website/open+dataset/detail/icon-default%402x.png"
          />
          <div style={{ fontSize: "14px", color: "#dbe0e9" }}>
            很抱歉，没有搜索到相关数据集
          </div>
        </div>
      )}
    </div>
  );
}
