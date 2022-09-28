import React from "react";
import { Dialog, DialogContent, Typography, Button ,makeStyles} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledDialog = withStyles(() => ({
  paper: {
    borderRadius: "14px",
  },
}))(Dialog);
// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       '& > * + *': {
//         marginLeft: theme.spacing(2),
//       },
//     },
//   }));

const LoadingForUplaod = (props) => {
  const {
    title,
    open,
    description,
  } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <StyledDialog open={open} maxWidth="sm">
      <DialogContent>
        <div className="w-90">
          <center>
          <CircularProgress variant="determinate" value={progress} />
          </center>
        </div>
        <center>
          <Typography variant="h5">
            <b>{title}</b>
          </Typography>
        </center>
        <Typography color="textSecondary">{description}</Typography>
        <div className="d-flex justify-content-between align-items-center"></div>
      </DialogContent>
    </StyledDialog>
  );
};

export default LoadingForUplaod;
