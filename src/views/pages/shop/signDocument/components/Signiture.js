import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close'
import FieldsOfSignature from './FieldsOfSignature';


export default function Signature(props) {
	const { signModal, setSignModal, getSignatureValue, applyToAll } = props

	return (
		<Dialog
			PaperProps={{
				elevation: 0, style: { borderRadius: '10px', width: '100%' }
			}}
			open={signModal !== null}>
			<DialogContent style={{ width: '100%' }}>
				<div style={{ width: '100%' }}>
					<div className='d-flex justify-content-between align-items-center'>
						<Typography>
							<b>Please Sign/write text</b>
						</Typography>
						<IconButton onClick={() => { setSignModal(null) }} className='rounded-circle'>
							<CloseIcon />
						</IconButton>
					</div>
					<FieldsOfSignature
						applyToAll={applyToAll}
						signModal={signModal}
						getSignatureValue={getSignatureValue} />
				</div>
			</DialogContent>
		</Dialog>
	);
};
