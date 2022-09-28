import { Card, CardContent, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
const useStyles = makeStyles((theme) => ({
  rowCenter: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardroot: {
    width: "100%",
    boxShadow:
      " 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    marginTop: "6px",
    overflow: "scroll",
  },
}));
const RowSkeleton = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardroot}>
      <CardContent>
        <div className={classes.rowCenter}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <div style={{ width: "100%", paddingLeft: "8px" }}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={10}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={"100%"}
              height={10}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default RowSkeleton;
