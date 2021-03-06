import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { Helmet } from "react-helmet";

import * as alertTypes from "../constants/alertTypes";
import UserInfo from "../components/UserInfo/UserInfo";
import RecentActivity from "../components/RecentActivity/RecentActivityList";
import RightPanel from "../components/Layout/Dashboard/RightPanel";

import CircularLoading from "../components/Layout/CircularLoading";
import AlertMessage from "../components/Layout/AlertMessage";
import Grid from "@material-ui/core/Grid";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import ErrorBoundary from "../components/Layout/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  alertMsg: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.user);
  const { isFullLoading } = useSelector((state) => state.UI);
  const { lastNews, seenMessages } = useSelector((state) => state.userData);
  const groupData = useSelector((state) => state.groupData);
  const { topActivePublicGroups, groupsInLocal } = groupData;

  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  const handleClearComment = (commentTimestamp) => {
    dispatch(actions.clearActivityCommentDB(commentTimestamp, user.uid));
  };

  const userGroupsContent = groupsInLocal.filter(
    (group) => "isCurrentUserAMember" in group
  );

  const isNotAuthByProvider =
    user.providerData && user.providerData[0].providerId === "password";

  return isFullLoading ? (
    <CircularLoading type="full" />
  ) : (
    <>
      <Helmet>
        <title>Dashboard | TeamsApp</title>
      </Helmet>

      <SectionTitle variant="h3">Dashboard</SectionTitle>
      {isNotAuthByProvider && !user.emailVerified ? (
        <AlertMessage
          alertStyles={classes.alertMsg}
          severity="error"
          action={alertTypes.EMAIL_CONFIRM}
          handler={onClickSendConfirmationLink}
        />
      ) : null}
      <UserInfo user={user} />

      <Grid container spacing={2}>
        <ErrorBoundary>
          <Grid item xs={12} md={9}>
            <RecentActivity
              title="Recent Activity"
              handleClearComment={handleClearComment}
              groups={userGroupsContent}
              userId={user.uid}
              seenMessages={seenMessages}
            />
          </Grid>
        </ErrorBoundary>

        <Grid item xs={12} md={3}>
          <RightPanel
            lastNews={lastNews}
            topActiveGroups={topActivePublicGroups}
            myGroups={userGroupsContent}
          />
        </Grid>
      </Grid>
    </>
  );
}
