import React from "react";
import * as alertTypes from "../constants/alertTypes";
import { Link } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";

export const getAlertMsgFromAction = (action, handler) => {
  switch (action) {
    case alertTypes.EMAIL_CONFIRM:
      return (
        <>
          Your account is not verified, if you haven't received confirmation
          email, click{" "}
          <Link href="#" onClick={handler}>
            here
          </Link>
        </>
      );
    case alertTypes.MAKE_GROUP_PUBLIC:
      return (
        <>
          <AlertTitle>Warning</AlertTitle>
          If you set your group to public —{" "}
          <strong>everyone will be able to find it!</strong>
        </>
      );
    case alertTypes.MAKE_USER_VISIBLE:
      return (
        <>
          <AlertTitle>Warning</AlertTitle>
          If you set your profile to be public —{" "}
          <strong>everyone will be able to find it!</strong>
        </>
      );
    case alertTypes.FETCH_SINGLE_GROUP_FAILED:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          This group couldn't be found, either is private and you are not a
          member or maybe you are experiencing network issues
        </>
      );
    case alertTypes.FETCH_USER_PROFILE_FAILED:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          This user couldn't be found, maybe it does not exist. Please check the
          URL. To go back to dashboard click{" "}
          <Link href="#" onClick={handler}>
            here
          </Link>
        </>
      );
    case alertTypes.INVITATION_LINK_PROBLEM:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          This invitation link is not valid, maybe it has been already used !
        </>
      );
    case alertTypes.INVITATION_LINK_ALREADY_IN_GROUP:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          You are already a member of this group, therefore you can't join, to
          go back to the group page click{" "}
          <Link href="#" onClick={handler}>
            here
          </Link>
        </>
      );
    case alertTypes.DELETE_GROUP:
      return (
        <>
          <AlertTitle>Warning</AlertTitle>
          You are about to delete this group. Are you sure you want to do this?
          This is irreversible
        </>
      );
    default:
      return (
        <>
          <AlertTitle>Something went Wrong</AlertTitle>
          Something unexpected happened, please{" "}
          <strong>try again later!</strong>
        </>
      );
  }
};

export const getSnackAlertMsgFromAction = (action) => {
  switch (action) {
    case alertTypes.COPY_LINK_SUCCESS:
      return "The invitation link was successfully copied to clipboard";
    case alertTypes.SENT_INVITATION_LINK_SUCCESS:
      return "The invitation was successfully sent";
    case alertTypes.SENT_INVITATION_LINK_FAILED:
      return "The invitation could not be sent, perhaps an user with that email does not exist";
    case alertTypes.COPY_NEWS_LINK:
      return "The news link was successfully copied to clipboard";
    case alertTypes.TOGGLE_TASK_FAILED:
      return "You need to join this group before interacting with it";
    case alertTypes.SEND_RESET_PASSWORD_SUCCESS:
      return "In order to restore your password, an email was sent to you";
    case alertTypes.SEND_RESET_PASSWORD_FAILED:
      return "There was a problem, maybe your email is incorrect.";
    case alertTypes.DELETE_TASK_SUCCESS:
      return "Task successfully deleted";
    case alertTypes.LEAVE_GROUP_SUCCESS:
      return "You successfully left from the group";
    case alertTypes.STANDARD_SIGN_UP_SUCCESS:
      return "You successfully signed up";
    case alertTypes.STANDARD_SIGN_UP_FAILED:
      return "Sign up failed, perhaps you are already registered with that email";
    default:
      return "Something went wrong";
  }
};
