import { Chip, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import AddCategoryOrStatusModal from './addCatStatusModal';
import CatOrStatusListing from './catOrStatusListing';

const useStyles = makeStyles({
    active: {
        borderRadius: 4,
        background: '#0184FF',
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': {
            background: '#0184FF',
            color: '#fff',
        }
    },
    inactive: {
        borderRadius: 4,
        fontWeight: 'bold'
    }
})

const GoalSetting = (props) => {
    const classes = useStyles()
    const [activeSetting, setActiveSetting] = useState('Personal')


    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div>
                    <Chip
                        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        onClick={() => { setActiveSetting('Personal') }}
                        className={activeSetting === 'Personal' ? classes.active : classes.inactive}
                        label={'Personal'} />
                    <Chip
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        onClick={() => { setActiveSetting('Mymember') }}
                        className={activeSetting === 'Mymember' ? classes.active : classes.inactive}
                        label={'Mymember'} />
                </div>
                <AddCategoryOrStatusModal />
            </div>

            <div className='mt-1'>
                <CatOrStatusListing activeSetting={activeSetting} />
            </div>



        </div>
    )
}
export default GoalSetting;