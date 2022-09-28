import { Drawer, makeStyles } from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormToAddIncalendar from "./formToAddIncalendar";
import ListAllCategories from "./listCategories";

const useStyles = makeStyles(() => ({
  activeTab: {
    color: "#2796f3",
  },
}));

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const DrawerEventAppoinment = (props) => {
  const classes = useStyles();
  const { open, handleCloseOpen, isEdit } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer
      anchor={"right"}
      PaperProps={{
        elevation: 0,
        style: {
          width: IsSmallDevise ? "100%" : "600px",
        },
      }}
      open={open}
      onClose={handleCloseOpen}
    >
      <div>
        <Paper square>
          <Tabs
            value={value}
            centered
            TabIndicatorProps={{
              style: { background: "#2796f3", height: "2px" },
            }}
            onChange={handleChange}
          >
            <Tab
              className={value === 0 ? classes.activeTab : ""}
              label={<b>Add to calendar</b>}
            />
            <Tab
              className={value === 1 ? classes.activeTab : ""}
              label={<b>Setting</b>}
            />
          </Tabs>
        </Paper>
        <div>
          {value === 0 ? (
            <FormToAddIncalendar
              perpage={props.perpage}
              perrows={10}
              cetogary={props.cetogary}
              actionOnEvent={props?.actionOnEvent}
              handleDrawerClose={handleCloseOpen}
              isEdit={isEdit}
            />
          ) : (
            <ListAllCategories editItem={props?.editItem} />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerEventAppoinment;
