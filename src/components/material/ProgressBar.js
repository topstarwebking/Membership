import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function ProgressBar({ color, value }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 7,
      borderRadius: 5,
      backgroundColor: "#e7e7e7",
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }))(LinearProgress);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress color={color} variant="determinate" value={value} />
    </div>
  );
}
