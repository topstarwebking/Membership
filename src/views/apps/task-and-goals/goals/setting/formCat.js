import React from 'react';
import { Input } from 'reactstrap';
import { Button } from '@material-ui/core'

const FormCat = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setOpen(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between'>
                    <div style={{ width: '100%' }} className='mr-1'>
                        <label htmlFor='category'>Category Name</label>
                        <Input id='category' name='category' placeholder='Category name' />
                    </div>
                    <div style={{ width: '100px' }}>
                        <label htmlFor='color'>Color</label>
                        <Input id='color' name='color' type='color' />
                    </div>
                </div>
                <div className='mt-1 d-flex justify-content-end'>
                    <Button type='submit' className='rounded' style={{ background: '#0184FF', color: '#fff' }}>
                        Save
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default FormCat;