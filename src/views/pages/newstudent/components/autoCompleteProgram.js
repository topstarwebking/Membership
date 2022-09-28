import React, { Fragment } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const InputAutoComplete = (props) => {
    const { data, keyName, handleSelect, labelName } = props

    return (
        <Fragment>
            <div style={{ border: '2px solid #b8c2cc', borderRadius: '10px' }}>
                <Autocomplete
                    id="filter-demo"
                    options={data}
                    // disableClearable
                    onChange={(e, newValue) => { handleSelect(e, newValue, keyName) }}
                    getOptionLabel={(option) => option[keyName]}
                        renderInput={(params) => <TextField name={keyName} variant={'outlined'} {...params} placeholder={labelName} />}
                />
            </div>
        </Fragment>
    );
}

export default InputAutoComplete;