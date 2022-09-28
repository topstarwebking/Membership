import { Chip, Dialog, DialogContent, Avatar } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Upload } from "react-feather";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneArea } from "material-ui-dropzone";
import { X } from "react-feather";
import { connect } from "react-redux";
import "./style.css"

const useStyles = makeStyles((theme) => ({
  styleDropZone: {
    margin: "10px 0px 8px 0px",
    borderRadius: "18px",
    padding: "10px",
    border: "4px dashed #2796f3",
    background: "#F7FDFF",
  },
}));

const StyledDialog = withStyles(() => ({
  paper: {
    "& .MuiDropzoneArea-icon": {
      display: "none",
    },
    borderRadius: "14px",
    textAlign: "center",
    maxWidth: "50%",
    width: "80vh",
  },
}))(Dialog);

function Profile(props) {
  const classes = useStyles();
  const [ProfileFiles, setProfileFiles] = useState([]);
  const { setPayload, payload } = props;
  const [open, setOpen] = useState(false);

  const handleDilogOpen = () => {
    setOpen(!open);
  };

  const handleFileUpload = (e) => {
    e.target?.files.length>0 && setProfileFiles(e.target.files[0]);
  };
  const handleSubmit = () => {
   
    setPayload({ ...payload, profile_img: ProfileFiles });
    setOpen(false);
  };

  return (
    <div>
      <Fragment>
        <div>
          <Chip
            size="medium"
            label={payload?.profile_img?.name? "Uploaded":"Upload"}
            onClick={handleDilogOpen}
            icon={<CloudUploadIcon size="small" style={{ color: "#0184FF" }} />}
            className="text-capitalize rounded w-100"
            style={{
              fontWeight: "bold",
              background: "rgba(1, 132, 255, 0.15)",
              color: "#0184FF",
            }}
          />
        </div>
        <StyledDialog
          PaperProps={{
            elevation: 0,
            style: {
              width: "300px",
            },
          }}
          open={open}
          onClose={handleDilogOpen}
        >
          <DialogContent>
            <div className="mb-1" id="dragDrop_inner_image" >
              <div className="d-flex justify-content-between">
                <h4>Add Profile</h4>
                <div className="close-icon">
                  <X
                    className="cursor-pointer"
                    size={20}
                    onClick={handleDilogOpen}
                  />
                </div>
              </div>
              {/* <DropzoneArea
                dropzoneText={"Click or drag and drop to Attach your files!"}
                dropzoneClass={classes.styleDropZone}
                onChange={handleFileUpload}
                showAlerts={true}
                showPreviews={true}
                filesLimit={30}
                showPreviewsInDropzone={false}
              /> */}
              <div className="mt-3 text-center">
                <div className="upload-div_border mb-2">
                  <Upload style={{color:"#b9b5b5",fontSize:"14px",marginBottom:"10px"}}/>
                  <span style={{fontWeight:600,color:"#4e4c4c"}}>
                   {ProfileFiles?.name?"Replace ": "Add " }Profile Image
                  </span> 
                  <p className="mb-0 pt-0" style={{fontWeight:600,color:"#0b82fa"}}>
                    Browse file
                  </p> 
                  <input type="file"  onChange={handleFileUpload} className="upload_input"/>
                  </div>

                  {ProfileFiles?.name && <img style={{width:"80%"}} src={URL.createObjectURL(ProfileFiles)}/>}
              </div>

              <div className="d-flex justify-content-end align-items-center mt-2">
                <Button
                  className="mr-50"
                  style={{
                    color: "#6b6b6b",
                    height: 25,
                    borderRadius: "4px",
                    border: "1px solid #b8c2cc",
                  }}
                  onClick={() => {
                    setOpen(false);
                    setProfileFiles([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    color: "#fff",
                    height: 25,
                    background: "#0184FF",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </StyledDialog>
      </Fragment>
    </div>
  );
}

export default connect(null, null)(Profile);
