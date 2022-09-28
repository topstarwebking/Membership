import * as React from "react";
import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

export default function TotalAvatars(props) {
  const { data, count } = props;
  return (
    <AvatarGroup max={5} total={count}>
      {data?.info_List.map((Item, index) => {
        return (
          <Avatar
            alt={`${Item.firstname} ${Item.lastname}`}
            src={Item.profile_img ? Item.profile_img : "https://"}
          />
        );
      })}
    </AvatarGroup>
  );
}
