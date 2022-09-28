import { IconButton, List, ListItem } from "@material-ui/core";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
import MergeTypeIcon from "@material-ui/icons/MergeType";

const EmailFieldMerge = (props) => {
  const { selectPlaceholder } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <MergeTypeIcon />
      </IconButton>
      <Dialog
        maxWidth="sm"
        style={{}}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <List style={{ width: "300px" }} dense>
            {list?.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  onClick={() => {
                    selectPlaceholder(item?.placeholder);
                  }}
                  button
                >
                  {i + 1}. {item?.viewValue}
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailFieldMerge;

const list = [
  { placeholder: "{firstName} ", viewValue: "First Name" },
  { placeholder: "{lastName} ", viewValue: "Last Name" },
  { placeholder: "{program} ", viewValue: "Program" },
  { placeholder: "{email} ", viewValue: "Email" },
  { placeholder: "{current_rank_name} ", viewValue: "Current rank name" },
  { placeholder: "{next_rank_name} ", viewValue: "Next Rank Name" },
  { placeholder: "{age} ", viewValue: "Age" },
  { placeholder: "{studentType} ", viewValue: "StudentType" },
  { placeholder: "{status} ", viewValue: "Status" },
  { placeholder: "{gender} ", viewValue: "Gender" },
  { placeholder: "{primaryPhone} ", viewValue: "Primary Phone" },
  { placeholder: "{secondaryPhone} ", viewValue: "Secondary Phone" },
  { placeholder: "{street} ", viewValue: "Street" },
  { placeholder: "{town} ", viewValue: "Town" },
  { placeholder: "{location} ", viewValue: "Location" },
  { placeholder: "{zipPostalCode} ", viewValue: "Zip Postal Code" },
  { placeholder: "{country} ", viewValue: "Country" },
  { placeholder: "{studentBeltSize} ", viewValue: "Student Belt Size" },
  { placeholder: "{category} ", viewValue: "Category" },
  { placeholder: "{leadsTracking} ", viewValue: "Leads Tracking" },
  { placeholder: "{subcategory} ", viewValue: "Sub category" },
  { placeholder: "{after_camp} ", viewValue: "After camp" },
  { placeholder: "{school} ", viewValue: "School" },
  {
    placeholder:
      '<img style="width:100px;object-fit:contain" src={current_rank_img} /> ',
    viewValue: "Current Rank Img",
  },
  {
    placeholder:
      '<img style="width:100px;object-fit:contain" src={next_rank_img} /> ',
    viewValue: "Next Rank Img",
  },
  { placeholder: "{belt_rank_name} ", viewValue: "Belt Rank Name" },
  { placeholder: "{candidate} ", viewValue: "Candidate" },
  { placeholder: "{current_stripe} ", viewValue: "Current Stripe" },
];
