import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 400],
  },
  top: {
    color: (props) => props.color,
    position: "absolute",
    left: 0,
  },
  center: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-45%, -60%)",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export const CircularProgressWithBackGround = (props) => {
  const {
    color,
    showPercentage,
    size = 40,
    thickness = 4,
    ...restProps
  } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={size}
        thickness={thickness}
        {...restProps}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        thickness={thickness}
        {...restProps}
      />
    </div>
  );
};

export default CircularProgressWithBackGround;