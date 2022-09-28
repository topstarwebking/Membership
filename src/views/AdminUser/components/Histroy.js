import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MenuItem,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead,
} from "@material-ui/core";
import moment from "moment";

export default function History(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem variant="outlined" color="primary" onClick={handleClickOpen}>
        Histroy
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Text credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.item?.textCreditHistory?.map((i) => {
                return (
                  <TableRow>
                    <TableCell>
                      {moment(i?.creaditedDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>{i?.credits}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
