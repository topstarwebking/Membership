import { Button, Chip, Paper } from '@material-ui/core';
import React, { useState, useRef, Fragment } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Input, Label } from 'reactstrap';

const FieldsOfSignature = (props) => {
    const { getSignatureValue, applyToAll } = props
    const [value, setValue] = React.useState(0);
    const [addNewValue, setAddNewValue] = useState('')
    const draw = useRef(null);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const [state, setState] = useState({
        signature: null,
        signature_size: 3,
        signature_color: '#000000',
        signature_text: '',
        tab_index: 0
    });

    const AddSignatureValue = (SignImage) => {
        getSignatureValue(SignImage)
        // setSignModal(null)
    }

    const HandleApplySignature = (SignImage) => {
        applyToAll(SignImage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        AddSignatureValue({ ...state, signature: addNewValue, fieldItem: true })
    }

    return (
        <div style={{ width: '100%' }}>
            {
                props?.signModal?.type === 'field' ? <form onSubmit={handleSubmit}>
                    <Label htmlFor='field'>Field</Label>
                    <Input className='mb-1 w-100' name='field' id='field' onChange={(e) => { setAddNewValue(e.target.value) }} />
                    <div className='d-flex justify-content-end'>
                        <Button
                            type='submit'
                            style={{ background: '#2191fd', color: '#fff' }}
                            className='rounded'>
                            Add
                        </Button>
                    </div>
                </form> :
                    <Fragment>
                        <Paper>
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleTabChange}
                                aria-label="tabs for signature"
                            >
                                <Tab label="Draw" />
                                <Tab label="Upload" />
                            </Tabs>
                        </Paper>
                        <br />
                        {
                            value === 0 &&
                            <div label={'Draw'}>
                                <CanvasDraw
                                    style={{ width: '100%', border: '1px solid gray' }}
                                    hideGrid
                                    ref={draw}
                                    brushColor={state.signature_color || 'gray'}
                                    brushRadius={state.signature_size || 3}
                                    // canvasWidth={440}
                                    canvasHeight={200}
                                    className='card'
                                />
                                <div className={'d-flex justify-content-end'}>
                                    <Chip onClick={() => {
                                        state.signature_text = ""
                                        draw.current.clear()
                                    }}
                                        label='Clear'
                                        className='ml-1 rounded'
                                    />
                                    {/* <Chip
                                        onClick={() => {
                                            HandleApplySignature({ ...state, signature: draw.current.canvasContainer.childNodes[1].toDataURL() })
                                        }}
                                        className='ml-1 rounded'
                                        label='Apply to all'
                                    /> */}
                                    <Chip
                                        onClick={() => {
                                            AddSignatureValue({ ...state, signature: draw.current.canvasContainer.childNodes[1].toDataURL() })
                                        }}
                                        className='ml-1 rounded'
                                        label='Apply'
                                    />
                                </div>
                            </div>
                        }
                        {
                            value === 1 &&
                            <div label={'Upload'}>
                                <Input type="file" onChange={(e) => {
                                    const file = e.target.files[0]
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const binaryStr = reader.result;
                                        AddSignatureValue({ ...state, signature: binaryStr })
                                        setState({ ...state, signature: binaryStr })

                                    };
                                    reader.readAsDataURL(file)
                                }} />
                                <img src={state.image} style={{ height: 50 }} />
                            </div>
                        }
                    </Fragment>
            }


        </div>
    )
}


export default FieldsOfSignature