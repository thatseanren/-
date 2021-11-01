import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import makeStyles from '@mui/styles/makeStyles';
import Draggable from "react-draggable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  font: {
    color: "white",
  },
});

const mapStatesToProps = (state) => ({
  state: state,
});

export default connect(
  mapStatesToProps,
  null
)((props) => {
  const classes = useStyles();
 
  return (
    <Draggable>
      <TableContainer>
        <Table className={classes.table} aria-label="redux"></Table>
        <TableHead className={classes.font}>
          <TableRow>
            <TableCell className={classes.font}> Polyline </TableCell>
            {Object.keys(props.state.Polyline).map((val, ind) => {
              return <TableCell className={classes.font}>{val}</TableCell>;
            })}
              <TableCell className={classes.font}>
              {"props.state.Polyline.moving"}
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.font}>
          <TableRow>
            <TableCell></TableCell>
            {Object.keys(props.state.Polyline).map((val, ind) => {
              return <TableCell className={classes.font}>{props.state.Polyline[val]}</TableCell>;
            })}
            <TableCell className={classes.font}>
              {props.state.Polyline.moving === true ? "true" : "false"}
              </TableCell>
          </TableRow>
        </TableBody>
      </TableContainer>
    </Draggable>
  );
});
