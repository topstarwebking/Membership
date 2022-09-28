import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Settings from '@material-ui/icons/Settings';
import { Chip } from '@material-ui/core';

const MembershipActionPopMenu = (props) => {
    const { SelectOption, memberShipActionMenu, schedulePaymentsMSstatus, isActionONChild } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {isActionONChild ? (
                schedulePaymentsMSstatus === 'paid' ? <Chip className='rounded' label='Refund' onClick={handleClick} size="small" /> : <Tooltip arrow title="Manage you membership">
                    <Chip icon={<Settings fontSize="small" />} label='Process' size='small' onClick={handleClick} />
                    {/* <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Settings fontSize="small" />
                    </IconButton> */}
                </Tooltip>
            ) : <Tooltip arrow title="Manage your membership">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Settings fontSize="small" />
                </IconButton>
            </Tooltip>}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    style: {
                        left: '50%',
                        transform: 'translateX(-77%) translateY(32%)',
                    }
                }}
                MenuListProps={{
                    style: {
                        padding: 0,
                    },
                }}
            >
                {
                    isActionONChild ?
                        <div>
                            <MenuItem onClick={() => { SelectOption('Forfeit') }}>
                                Forfeit
                            </MenuItem>
                            <MenuItem onClick={() => { SelectOption('Refund') }}>
                                Refund
                            </MenuItem>
                            <MenuItem onClick={() => { SelectOption('Payment') }}>
                                Proccess Now
                            </MenuItem>
                        </div>
                        : memberShipActionMenu?.map((item, i) => {
                            return (
                                <MenuItem key={i} onClick={() => { SelectOption(item) }}>
                                    {item}
                                </MenuItem>
                            )
                        })
                }
            </Menu>
        </div>
    )
}

export default MembershipActionPopMenu
