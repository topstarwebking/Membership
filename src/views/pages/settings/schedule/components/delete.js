import React, { useState } from 'react';
import { DELETE_SCHEDULE_CLASS, DELETE_EVENT_BY_WHOLE_SERIES } from "../../../../../redux/actions/calendar";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Trash2 } from "react-feather"
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap"

const Delete = (props) => {
    let { event, setState, handleSidebar } = props
    const [sweetAlert, setSweetAlert] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteType, setDeleteType] = useState(null)

    const ConFirmDeleteDelete = () => {
        if (deleteType === 'single') {
            props.DELETE_SCHEDULE_CLASS(event?._id)
        } else {
            props.DELETE_EVENT_BY_WHOLE_SERIES(event?.program_name, event?.class_name)
        }
        setSweetAlert(false)
        setModalOpen(false)
        handleSidebar(false)
        // setState({})
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    const selectDelete = (type) => {
        setDeleteType(type)
        setSweetAlert(true)
    }

    return (
        <div>
            <div
                className="close-icon cursor-pointer"
                onClick={() => { setModalOpen(true) }}>
                <Trash2 size={20} />
            </div>
            <Modal
                isOpen={modalOpen}
                toggle={toggleModal}
                className="modal-dialog-centered">
                <ModalHeader toggle={toggleModal}>
                    Delete Event by
                </ModalHeader>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <button type="button" className="btn text-danger" onClick={() => { selectDelete('single') }}> Delete </button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => { selectDelete('series') }}> Delete whole series </button>
                    </div>
                    <SweetAlert title="Are you sure?"
                        warning
                        show={sweetAlert}
                        showCancel
                        reverseButtons
                        cancelBtnBsStyle="danger"
                        confirmBtnText={deleteType === 'single' ? "Yes, delete it!" : 'Yes, delete whole series!'}
                        cancelBtnText="Cancel"
                        onConfirm={ConFirmDeleteDelete}
                        onCancel={() => { setSweetAlert(false) }} >
                        You won't be able to revert this!
                    </SweetAlert>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, { DELETE_SCHEDULE_CLASS, DELETE_EVENT_BY_WHOLE_SERIES })(Delete)
