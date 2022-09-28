import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Badge,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FolderIcon from "@material-ui/icons/Folder";
import { FormGroup } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";

const useStyles = makeStyles(() => ({
  SaveTem: {
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "10px",
  },
  continue: {
    background: "#2796f3",
    color: "#FFF",
    textTransform: "inherit",
    borderRadius: "10px !important",
    "&:hover": {
      background: "#2796f3",
    },
  },
  inputStyle: {
    marginBottom: "10px",
    borderRadius: "0.4em",
    width: "100%",
    height: "2.8rem",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
}));
const SaveFolderSelect = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [filterdata, setfilterdata] = useState([]);
  const {
    FolderList,
    SaveTemplate,
    MainFolderSelected,
    handleSelectsubFolder,
    handleSelectMainFolder,
  } = props;

  const handleClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const filterData = FolderList?.data.filter(
      (item) => item?.adminId === undefined
    );
    setfilterdata(filterData);
  }, []);
  return (
    <Fragment>
      <Button className={classes.SaveTem} onClick={handleClose}>
        Save
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ width: "280px" }}>
          <FormGroup className="mb-0">
            <span>Select folder to save email template</span>
            {console.log(filterdata)}
            {filterdata?.length > 0 ? (
              <Autocomplete
                className={classes.inputStyle}
                id="selectMainFolder"
                options={filterdata || []}
                onChange={(e, newValue) => {
                  handleSelectMainFolder(e, newValue);
                }}
                getOptionLabel={(option) => option?.categoryName}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    variant={"outlined"}
                    {...params}
                    placeholder={"Select Folder"}
                  />
                )}
                renderOption={(option) => {
                  return (
                    <div {...option}>
                      <Badge
                        badgeContent={option?.folder?.data?.length || 0}
                        color="secondary"
                      >
                        <FolderIcon fontSize="small" color="disabled" />
                      </Badge>
                      <span className="ml-1 pl-1">{option?.categoryName}</span>
                    </div>
                  );
                }}
              />
            ) : (
              <span>Please add Main Folder</span>
            )}
          </FormGroup>
          {MainFolderSelected?.folder?.length > 0 ? (
            <FormGroup className="mb-0">
              <Badge
                badgeContent={MainFolderSelected?.folder?.length || "0"}
                color="secondary"
              >
                <span>Sub Folder</span>
              </Badge>
              <Autocomplete
                className={classes.inputStyle}
                id="selectSubFolder"
                options={MainFolderSelected?.folder}
                onChange={(e, newValue) => {
                  handleSelectsubFolder(e, newValue);
                }}
                getOptionLabel={(option) => option?.folderName}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    variant={"outlined"}
                    {...params}
                    placeholder={"Sub-folder"}
                  />
                )}
              />
            </FormGroup>
          ) : null}

          <div className="d-flex justify-content-end">
            <Button onClick={handleClose}>Cancel</Button>
            {console.log()}
            <Button onClick={SaveTemplate} className={classes.continue}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
export default SaveFolderSelect;
