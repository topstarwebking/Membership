import React, {useState} from "react"
import Dropzone from 'react-dropzone'
import Upload from "../../../../../../assets/img/upload.png"

const EventImage = () => {
    const [eventImg, setEventImg] = useState([])

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
                    <div className="mt-2">
                        <Dropzone>
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    className="dropzone uploadImg"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <div
                                        className="dz-message needsclick"
                                        style={{
                                            margin: "0px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            style={{ marginTop: "20px" }}
                                            src={Upload}
                                            name="eventBanner"
                                            alt="icons"
                                            height="100px"
                                        />
                                        <h4 style={{ textAlign: "center" }}>
                                            Drop files here or click to upload.
                                        </h4>
                                        <span>Drop banner here or Browse through your machine</span>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventImage