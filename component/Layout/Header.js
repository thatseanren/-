import React from "react";
import clsx from 'clsx'
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ToolBar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Grow from "@mui/material/Grow"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Paper from "@mui/material/Paper"
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
// import { createTheme } from '@mui/material/styles'
const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      light: "#323232",
      main: "#323232",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
}));

const styles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: `'Noto Sans JP','sans-serif'`
  },
  button: {
    marginRight: "1%",
    backgroundColor: "rgb(40 39 39 / 54%)"
  },
  iconButton: {
    padding: "12px"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  buttonBase: {
    '& .MuiIconButton-label': {
      flexDirection: 'column',
      '& span': {
        fontSize: "13px"
      }
    }
  }
}));

export default function Header(props) {
  const classes = styles();
  const [BBInfo, setShowBBInfo] = React.useState(false);
  const [SegInfo, setShowSegInfo] = React.useState(false);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <>
          <AppBar position="static" color="primary" style={{ flexDirection: "row", boxShadow: "none" }}>
            <ToolBar style={{ width: "300px" }}>
              {" "}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onclick={() => { }}
                size="large">
                <MenuIcon />
              </IconButton>{" "}
              <Typography variant="h5" style={styles.title}>
                FAW AI
              </Typography>
            </ToolBar>
            <Grid container item justifyContent="flex-end">
              <IconButton
                className={classes.buttonBase}
                id={"Segmentation"}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => { }}
                disableRipple
                onMouseEnter={() => { setShowSegInfo(true) }}
                onMouseLeave={() => { setShowSegInfo(false) }}
                size="large">
                <LinearScaleIcon />
                <span> segmentation </span>
              </IconButton>
              {SegInfo && <Grow in={SegInfo} style={(() => {
                let BBB = document.querySelector('#Segmentation'); return ({
                  zIndex: 10,
                  position: "fixed", left: BBB.offsetLeft, top: BBB.offsetTop + BBB.offsetHeight
                })
              })()}>
                <Paper>
                  Use the Segmentation Tool to draw a polygon, then apply a appropriate label to it.
                </Paper>
              </Grow>}

              <IconButton
                id={"BB"}
                className={classes.buttonBase}
                edge="start"
                color="inherit"
                disableRipple
                aria-label="menu"
                onClick={() => { }}
                onMouseEnter={() => { setShowBBInfo(true) }}
                onMouseLeave={() => { setShowBBInfo(false) }}
                size="large">
                <CheckBoxOutlineBlankIcon />
                <span>Rectangle </span>
              </IconButton>
              {BBInfo && <Grow in={BBInfo}
                style={(() => { let BB = document.querySelector('#BB'); return ({ zIndex: 10, position: "fixed", left: BB.offsetLeft, top: BB.offsetTop + BB.offsetHeight }) })()}
              >
                <Paper>
                  Use the BoundingBox Tool to draw a boundingbox, then apply a appropriate label to it.
                </Paper>
              </Grow>}

            </Grid>
            <Grid container style={{ alignItems: "center", justifyContent: "flex-end", paddingRight: "20px" }}>

              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => { }}
                size="large">
                <CloudUploadIcon></CloudUploadIcon>
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => { }}
                size="large">
                <WebAssetOutlinedIcon></WebAssetOutlinedIcon>
                <input
                  id="fileItem"
                  type="file"
                  style={{ display: "none" }}
                ></input>
              </IconButton>
              <Avatar className={clsx(classes.orange, classes.smallAvatar)}> SR </Avatar>
            </Grid>

          </AppBar>
        </>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
