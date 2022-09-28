import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../style.css"
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
    styleDropZone: {
        margin: "6px 0px 4px 0px",
        padding: "10px",
        border: "4px dashed #2796f3",
        background: "#F7FDFF",
    },
}));
const ImageUpload = ({setProofFiles}) => {
    const classes = useStyles()
    
    const handleFileUpload = (files) => {
        setProofFiles(files)
    }
    return (
        <>

            <div className="row">
                <div className="col-md-1">
                    <div className="verticalText">
                        <h1>BANNER</h1>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-image"></i>
                        <div className="headerText">
                            <span>Upload an Event Banner</span>
                        </div>
                    </div>
                    <div className="my-2">
                        <DropzoneArea
                            dropzoneText="Click or drag and drop to Attach your files!"
                            dropzoneClass={classes.styleDropZone}
                            onChange={handleFileUpload}
                            showAlerts={true}
                            // showPreviews={true}
                            filesLimit={1}
                            // showPreviewsInDropzone
                            showPreviewsInDropzone={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageUpload;