import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Header from '../header'
import Link from 'next/link';

const useStyles = makeStyles(
  {
    GridContainer: {
      flexFlow: "column",
      paddingTop: "16px",
      margin: "0 auto",
      width: "1232px",
      padding: "0 16px",
      position: "relative",
      top: "56px"
    },
    MuiTypographyTitle: {
      fontWeight: 500,
      fontSize: "16px",
      margin: "8px"
    },
    GridContainerItem: {
      marginBottom: "24px"
    },
    MuiPaper: { width: "288px" }
  },
  {
    classNamePrefix: "pureCSS"
  }
);
export default function Tools(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header />
      <Grid container className={classes.GridContainer}>
        <Grid item>
          <Typography className={classes.MuiTypographyTitle}>数据标注</Typography>
        </Grid>
        <Link href="/tools/annotation">
          <a style={{ cursor: "pointer" }}>
            <Grid container item className={classes.GridContainerItem}>
              <Paper elevation={2} variant={"outlined"} className={classes.MuiPaper}>
                <img
                  src="https://tutu.s3.cn-northwest-1.amazonaws.com.cn/gas/Library/annotate_tool.png"
                  alt="GroundTruth Tools"
                  style={{ width: "100%" }}
                ></img>
                <Grid
                  container
                  style={{ padding: "8px 16px 16px 16px", flexFlow: "column" }}
                >
                  <Typography
                    className={classes.MuiTypographyTitle}
                    style={{ margin: "0 0 8px 0" }}
                  >
                    数据标注
            </Typography>
                  <Typography
                    className={classes.MuiTypographyTitle}
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      color: "rgb(109,109,113)"
                    }}
                  >
                    协同数据标注工具
            </Typography>
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      padding: "2px 8px",
                      color: "rgb(85,166,255)",
                      background: "rgba(85,166,255,0.063)",
                      alignSelf: "flex-start",
                    }}
                  >
                    应用
            </span>
                </Grid>
              </Paper>
            </Grid>
          </a>

        </Link>
      </Grid>
    </React.Fragment>

  );
}
