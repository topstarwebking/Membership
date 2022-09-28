import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import {
    CardContent,
    Card,
    Tabs,
    Tab,
} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    CardStyle: {
        // boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
        // borderRadius: "1rem",
        width: "100%",
    },
    activeTab: {
        color: "#2796f3",
    },
    inactiveTab: {
        color: "#2796f3",
    },
    smartListDes: {
        background: "#eaf4fe",
    }
}));

const TextChatTabs = (props) => {
    const classes = useStyles();
    const [TextIndexType, setTextIndexType] = useState(0);
    const ChangeTextIndexType = (event, newValue) => {
    	setTextIndexType(newValue);
    };

    return (
        <div>
            <Card className={classes.CardStyle}>
                <CardContent style={{ width: "100%" }} className="p-0">
                    <div >
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start">
                                <Tabs
                                    value={TextIndexType}
                                    variant="scrollable"
                                    TabIndicatorProps={{
                                        style: { background: "#2796f3", height: "2px" },
                                    }}
                                onChange={ChangeTextIndexType}
                                >
                                    <Tab
                                        className={TextIndexType === 0 ? classes.activeTab : ""}
                                        label={
                                            <div>
                                                <span>
                                                    <b>NEW</b>
                                                </span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        className={TextIndexType === 1 ? classes.activeTab : ""}
                                        label={
                                            <div>
                                                <span>
                                                    <b>CHAT (40)</b>
                                                </span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        className={TextIndexType === 2 ? classes.activeTab : ""}
                                        label={
                                            <div>
                                                <span>
                                                    <b>AUTOMATION</b>
                                                </span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        className={TextIndexType === 3 ? classes.activeTab : ""}
                                        label={
                                            <div>
                                                <span>
                                                    <b>Scheduled</b>
                                                </span>
                                            </div>
                                        }
                                    />
                                    {/* <Tab
                                        className={TextIndexType === 4 ? classes.activeTab : ""}
                                        label={
                                            <div>
                                                <span>
                                                    <b>Scheduled</b>
                                                </span>
                                            </div>
                                        }
                                    /> */}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TextChatTabs;
