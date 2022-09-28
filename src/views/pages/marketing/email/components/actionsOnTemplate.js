import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  Addtemplate: {
    position: 'fixed',
    background: '#7373fe',
    color: '#fff',
    borderRadius: '10px !important',
    fontWeight: 'bold',
    bottom: '1rem',
    right: '2rem',
    '&:hover': {
      background: '#7373fe',
    }
  },
  CardStyle: {
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 5%)',
    // borderRadius: '1rem',
    width: '100%',
    marginBottom: '10px'
  },
}));


function ActionOnTemplate(props) {
  const classes = useStyles()
  const { actionType, FolderList, addTemplate } = props

  return (
    <div>

    </div>
  )
}

export default ActionOnTemplate
