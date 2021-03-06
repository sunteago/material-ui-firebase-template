import React from "react";
import { Link } from "react-router-dom";

import NotificationsIcon from "@material-ui/icons/Notifications";
import { Badge, IconButton } from "@material-ui/core";

import PropTypes from 'prop-types';

export default function NotificationsButton({ notificationsNum, classes }) {
  return (
    <Link className={classes.notificationsButton} to="/notifications">
      <IconButton
        aria-label="show new notifications"
        color="inherit"
        aria-haspopup="true"
      >
        <Badge badgeContent={notificationsNum} color="secondary">
          <NotificationsIcon fontSize="default" />
        </Badge>
      </IconButton>
    </Link>
  );
}

NotificationsButton.propTypes = {
  notificationsNum: PropTypes.number.isRequired
};