import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Typography,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import * as actions from "../store/actions";
import AlertMessage from "../components/Layout/AlertMessage";
import * as alertTypes from "../constants/alertTypes";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: theme.spacing(3),
    textAlign: 'center'
  },
  buttonsContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(3)
  },
  text: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  alertMessage: {
    margin: theme.spacing(3),
  },
}));

export default function InvitationLink() {
  const classes = useStyles();

  const location = useLocation();
  const link = new URLSearchParams(location.search).get("link");
  const history = useHistory();

  const invitationLinkId = useState(link)[0];
  const invitationLinkData = useSelector(
    (state) => state.userData.invitationLinkData
  );
  const groupPageError = useSelector((state) => state.UI.groupPageError);

  const userId = useSelector((state) => state.auth.user.uid);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (invitationLinkId) {
      dispatch(actions.fetchGroupInvitationLinkData(invitationLinkId));
    }
  }, [invitationLinkId, dispatch]);

  const onAcceptOrDeclineHandler = (action) => {
    dispatch(
      actions.acceptOrDeclineInvitation(
        action,
        invitationLinkId,
        invitationLinkData.groupId,
        userId,
        history
      )
    );
  };

  if (Object.keys(invitationLinkData).length) {
    const { groupName, message } = invitationLinkData;

    return (
      <Box>
        <Typography variant="h4" component="h1">Invitation to join {groupName}</Typography>
        <Typography className={classes.text}>
          You have been invited to join <strong>{groupName}</strong>
        </Typography>
        <Typography className={classes.text}>{message}</Typography>
        <Grid container justify="center" className={classes.buttonsContainer}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => onAcceptOrDeclineHandler(false)}
              variant="contained"
              color="secondary"
            >
              Decline
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => onAcceptOrDeclineHandler(true)}
              variant="contained"
              color="primary"
            >
              Accept
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <AlertMessage
        alertStyles={classes.alertMessage}
        severity="error"
        action={alertTypes.INVITATION_LINK_PROBLEM}
      />
    ) : null;
  }
}
