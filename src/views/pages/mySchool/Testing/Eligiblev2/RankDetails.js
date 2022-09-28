import React, { useEffect } from "react";
import { Card, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import { ChevronDown, ChevronUp, X } from "react-feather";
import { width } from "@mui/system";
const useStyles = makeStyles(() => ({
    dialog: {
        height: 700,
        minWidth: "1000px"
    }
}));

const RankDetails = (props) => {
    const {
        openRankDetails,
        setOpenRankDetails,
        eventType,
        generalRankDetails,
        promotionRankDetails,
    } = props
    const classes = useStyles();


    console.log(generalRankDetails, promotionRankDetails)
    return (
        <>
            <Dialog
                open={openRankDetails}
                onClose={() => setOpenRankDetails(false)}
                classes={{ paper: classes.dialog }}
            // fullWidth
            // maxWidth="sm"
            >
                <div className="d-flex justify-content-end">
                    <div className="close-icon mt-0">
                        <X
                            className="cursor-pointer"
                            size={20}
                            onClick={() => setOpenRankDetails(false)}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between w-100 mb-0" style={{ paddingLeft: "80px", paddingRight: "150px" }}>
                    <h4 className=" mt-1">{eventType === "Promotion Test" ? "Recommended" : "Invited"}</h4>
                    <h4 className=" mt-1">Registered</h4>
                    <h4 className=" mt-1">{eventType === "Promotion Test" ? "Promoted" : "Attended"}</h4>
                </div>
                <DialogContent>
                    <Card>
                        <div className="d-flex justify-content-between mt-0">
                            <div className="stat-table m-2">
                                <div className="d-flex justify-content-between stat-thead dark-back p-1">
                                    <span style={{ flex: 2 }}>Image</span>
                                    <span className="rank-title" style={{ flex: 5 }}>
                                        Rank Name
                                    </span>
                                    <span style={{ flex: 1, minWidth: 35 }}>#</span>
                                </div>
                                {eventType === "Promotion Test" ?
                                    promotionRankDetails?.recommended.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>


                                    )) :
                                    generalRankDetails?.invitee.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>
                                    ))

                                }
                            </div>
                            <div className="stat-table m-2">
                                <div className="d-flex justify-content-between stat-thead dark-back p-1">
                                    <span style={{ flex: 2 }}>Image</span>
                                    <span className="rank-title" style={{ flex: 5 }}>
                                        Rank Name
                                    </span>
                                    <span style={{ flex: 1, minWidth: 35 }}>#</span>
                                </div>
                                {eventType === "Promotion Test" ?
                                    promotionRankDetails?.register.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>


                                    )) :
                                    generalRankDetails?.register.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>
                                    ))

                                }
                            </div>
                            <div className="stat-table m-2">
                                <div className="d-flex justify-content-between stat-thead dark-back p-1">
                                    <span style={{ flex: 2 }}>Image</span>
                                    <span className="rank-title" style={{ flex: 5 }}>
                                        Rank Name
                                    </span>
                                    <span style={{ flex: 1, minWidth: 35 }}>#</span>
                                </div>
                                {eventType === "Promotion Test" ?
                                    promotionRankDetails?.promoted.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>


                                    )) :
                                    generalRankDetails?.attended.map((rank, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center stat-tr px-1"
                                        >
                                            {console.log(rank.belt)}
                                            <div style={{ flex: 2 }}>
                                                {rank.rank_image !== "" ? (
                                                    <img
                                                        src={rank.rank_image}
                                                        alt="belt"
                                                        height={30}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: 12 }}>no image</span>
                                                )}
                                            </div>

                                            <span style={{ flex: 5, minWidth: 100 }}>
                                                <span style={{ paddingLeft: 10 }}>{rank.belt}</span>
                                            </span>
                                            <span style={{ flex: 1, minWidth: 35 }}>
                                                {rank?.count}
                                            </span>
                                        </div>
                                    ))

                                }
                            </div>
                        </div>
                        {/* <div className="d-flex justify-content-between align-items-center stat-tr stat-rank-total blue-back">
                        <span>Total</span>
                        <span>
                            {RankDataPromotion &&
                        RankDataPromotion.reduce((a, b) => a + b?.total_students || a, 0)}
                        </span>
                    </div> */}
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RankDetails;

