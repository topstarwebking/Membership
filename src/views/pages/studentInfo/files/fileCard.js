import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from 'reactstrap';
import { CardContent, Chip } from '@material-ui/core';
import ManageFiles from './manageFIleMenu';

const useStyles = makeStyles((theme) => ({
    attchBtn: {
        width: '100%',
        borderRadius: '4px',
        // height: '100%',
        boxShadow: '2px 2px 11px rgba(0, 0, 0, 0.08)',
        padding: 0
    },
    imageStyle: {
        height: 80,
        objectFit: 'contain'
    },
    label: {
        borderRadius: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    }
}));

const FileCard = (props) => {
    const classes = useStyles();
    const { file } = props

    return (
        <Card className='mb-0'>
            <CardContent className={classes.attchBtn}>
                <div className='d-flex justify-content-between align-items-center'>
                    <Chip className={classes.label} label={file?.fileType} />
                   <ManageFiles file={file}/>
                </div>
                <div className='p-1'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <p className='text-primary mb-0'><b>{file?.fileName}</b></p>
                        <div className='rounded-circle' style={{ margin: '0 4px', padding: '4px', background: '#2191fd' }}></div>
                        <b>{file?.fileType}</b>
                    </div>
                    <p className='mb-0'>{file?.description}</p>
                </div>

            </CardContent>
        </Card>
    );
}

export default FileCard
