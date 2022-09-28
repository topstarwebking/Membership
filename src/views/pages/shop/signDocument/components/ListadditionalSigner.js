import React, { Fragment } from 'react';
import { ListItem, makeStyles, Typography } from '@material-ui/core';
import { Type, PenTool, Calendar, Mail, User } from 'react-feather';
import { Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import SourceBox from './Sourcebox';

const useStyles = makeStyles(() => ({
	styleListItem: {
		marginTop: 4,
		borderLeft: '4px solid #2191fd',
		border: '1px solid #ececec',
		cursor: 'pointer',
		background: '#f8f8f8',
		paddingLeft: '4px',
		display: 'flex',
		justifyContent: 'space-between'
	},
}));

const AdditonalSigner = (props) => {
	const classes = useStyles()
	const { addAdditionalUser } = props
	return (
		<Fragment>
			{
				addAdditionalUser?.map((user, index) => {
					return (
						<Fragment key={index} >
							<Typography className='mb-0 text-primary' style={{ marginTop: '4px' }}>Signer #{index + 1}.</Typography>
							<ListItem className={classes.styleListItem}>
								<SourceBox type='sign' item={{ fullname: user?.fullname, type: "text", value: user?.fullname, email: user?.email, signer: 'invite', component: <span> {user?.fullname}</span> }}>
									<div className='d-flex justify-content-start align-items-center'>
										<DragIndicatorIcon />
										<User size="16" className='mr-1' />
										<span>
											{user?.fullname}
										</span>
									</div>
								</SourceBox>
							</ListItem>
							<ListItem className={classes.styleListItem}>
								<SourceBox type='sign' item={{ fullname: user?.fullname, type: "sign", value: '', email: user?.email, signer: 'invite', component: <Button className='rounded' variant="contained" size='small' 
                                style={{ background: '#2191fd', color: '#fff' }}
								><PenTool className='mr-1' size={16} /> Sign</Button> }}>
									<div className='d-flex justify-content-start align-items-center'>
										<DragIndicatorIcon />
										<PenTool size="16" className='mr-1' />
										<span>
											Your signiture
										</span>
									</div>
								</SourceBox>
							</ListItem>
							<ListItem className={classes.styleListItem}>
								<SourceBox type='sign' item={{
									fullname: user?.fullname,
									type: "text", email: user?.email, value: user?.email, signer: 'invite', component:
										<span> {user?.email}</span>
								}}>
									<div className='d-flex justify-content-start align-items-center'>
										<DragIndicatorIcon />
										<Mail size="16" className='mr-1' />
										<span>
											{user?.email}
										</span>
									</div>
								</SourceBox>
							</ListItem>
							<ListItem className={classes.styleListItem}>
								<SourceBox type='sign' item={{ fullname: user?.fullname, value: '', type: "field", email: user?.email, signer: 'invite', component: <Button className='rounded' variant="contained" size='small' style={{ background: '#2191fd', color: '#fff' }}> <Type size="16" className='mr-1' /> Text</Button> }}>
									<div className='d-flex justify-content-start align-items-center'>
										<DragIndicatorIcon />
										<Type size="16" className='mr-1' />
										Text field
									</div>
								</SourceBox>
							</ListItem>
							<ListItem className={classes.styleListItem}>
								<SourceBox type='sign' item={{
									fullname: user?.fullname,
									type: "date", email: user?.email,
									value: '',
									signer: 'invite', component: <Button className='rounded' variant="contained" size='small' style={{ background: '#2191fd', color: '#fff' }}> <Calendar size={'16'} className='mr-1' /> Date</Button>
								}}>
									<div className='d-flex justify-content-start align-items-center'>
										<DragIndicatorIcon />
										<Calendar size={'16'} className='mr-1' />
										<span>
											Date Field
										</span>
									</div>
								</SourceBox>
							</ListItem>
						</Fragment>
					)
				})
			}

		</Fragment>
	)
}

export default AdditonalSigner;