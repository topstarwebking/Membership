import React, { Fragment } from 'react'
import MarkYesOrNo from '../Tablecells/markContent/yesOrNo';
import EnterData from "../Tablecells/markContent/enterData"
import MarkRating from '../Tablecells/markContent/rating'
import Proof from '../Tablecells/markContent/uploadProof'




const MarkStatus = (props) => {
    const { row } = props

    return (
        <Fragment>
            {row?.isproof && <Proof row={row}/>}
            {row?.isRating && <MarkRating row={row}/>}
            {row?.isEnterData && <EnterData row={row}/>}
            {row?.isYesOrNo && <MarkYesOrNo row={row}/>}
        </Fragment>
    )
}

export default MarkStatus;