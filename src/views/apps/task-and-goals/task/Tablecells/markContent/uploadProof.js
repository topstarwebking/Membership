import { Chip, Dialog, DialogContent, Avatar } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useState, Fragment } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from "material-ui-dropzone";
import { X } from "react-feather";
import { UPLOAD_PROOF_IMAGES } from "../../../../../../redux/actions/task-and-goals/task"
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core'
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
        width: "50vh",
    },
}))(Dialog);

function Proof(props) {
    const classes = useStyles()
    const [proofFiles, setProofFiles] = useState([])
    const { row, UPLOAD_PROOF_IMAGES } = props;
    const [loadingImage, setLoadingImage] = useState(false)
    const history = useHistory()
    // const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [openImages, setOpenImages] = useState(false)


    const handleDilogOpen = () => {
        setOpen(!open)
    }
    const handleOpenAllImages = () => {
        setOpenImages(true)
    }

    const handleFileUpload = (files) => {
        setProofFiles(files)
    }
    const handleSubmit = async () => {
        // proofFiles
        setLoadingImage(true)
        let formData = new FormData();
        for (let file of proofFiles) {
            formData.append("docs", file);
        }
        formData.append("isproof", JSON.stringify(true));
        formData.append("status", "Completed");
        let result = await UPLOAD_PROOF_IMAGES(formData, row?._id, history?.maintaskFolderId, history?.subtaskFolderId)
        if (result) {
            setLoadingImage(false)
            setOpen(false)
        } else {
            setLoadingImage(false)
        }
    }

    return (
        <div>
            {row?.document.length === 0 ? <Fragment>
                <div>
                    <Chip size='medium' label={'Upload'}
                        onClick={handleDilogOpen}
                        icon={<CloudUploadIcon size='small' style={{ color: '#0184FF' }} />}
                        className='text-capitalize rounded w-100'
                        style={{ fontWeight: 'bold', background: 'rgba(1, 132, 255, 0.15)', color: '#0184FF' }} />
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
                        <div className='mb-1'>
                            <div className="d-flex justify-content-between">
                                <h5>Add Image of Completion</h5>
                                <div className="close-icon">
                                    <X
                                        className="cursor-pointer"
                                        size={20}
                                        onClick={handleDilogOpen}
                                    />
                                </div>
                            </div>
                            <DropzoneArea
                                dropzoneText="Click or drag and drop to Attach your files!"
                                dropzoneClass={classes.styleDropZone}
                                onChange={handleFileUpload}
                                showAlerts={true}
                                showPreviews={true}
                                filesLimit={30}
                                // showPreviewsInDropzone
                                showPreviewsInDropzone={false}
                            />

                            <div className="d-flex justify-content-end align-items-center mt-2">
                                <Button
                                    className="mr-50"
                                    style={{
                                        color: "#6b6b6b",
                                        height: 25,
                                        borderRadius: "4px",
                                        // width: "0px",
                                        border: "1px solid #b8c2cc",
                                    }}
                                    onClick={() => { setOpen(false) }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={{
                                        color: "#fff",
                                        height: 25,
                                        background: "#0184FF",
                                        borderRadius: "4px",
                                        // width: "90px",
                                    }}
                                    onClick={() => { handleSubmit() }}>
                                    {loadingImage ? <CircularProgress style={{ color: '#fff', width: '18px', height: '18px' }} /> : <span>Save</span>}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </StyledDialog>
            </Fragment> :
                <Fragment>
                    <AvatarGroup className='cursor-pointer' style={{ borderRadius: "2px" }} onClick={handleOpenAllImages} max={4}>
                        {
                            row?.document?.map((item) => {
                                return (
                                    <Avatar
                                        key={row?._id}
                                        alt={item}
                                        src={item}
                                        style={{ borderRadius: "2px" }}
                                    />
                                )
                            })
                        }
                    </AvatarGroup>
                    <Dialog
                        // maxWidth="large"
                        open={openImages}
                        onClose={() => { setOpenImages(false) }}
                    >
                        <DialogContent>
                            <div className="close-icon d-flex justify-content-end ">
                                <X
                                    className="cursor-pointer"
                                    size={20}
                                    onClick={() => { setOpenImages(false) }}
                                />
                            </div>
                            <div className='d-flex'>
                                {
                                    row?.document?.map((img,i) => {
                                        return (
                                            <a href={img} target="_blank" key={i}>
                                                <div className='d-flex justify-content-start mx-1 my-2' >
                                                    <img style={{ width: 300, height: 200 }} className="" alt={img} src={img} />
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </Fragment>
            }
        </div >
    )
}

export default connect(null, {
    UPLOAD_PROOF_IMAGES,
})(Proof);
