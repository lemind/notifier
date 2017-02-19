// src/containers.js

import { connect } from 'react-redux';

import * as NotifierComponent from './components/Notifier/Notifier';
import * as ControlsComponent from './components/Controls/Controls';

import * as notificationsActions from './store/notifications/notifications.actions';
import * as popupActions from './store/popup/popup.actions';

export const Notifier = connect(
  function mapStateToProps(state) {
    return { notifications: state.notifications, popup: state.popup };
  },
  function mapDispatchToProps(dispatch) {
    return {
      popupToggle: () => dispatch(popupActions.popupToggle())
    };
  }
)(NotifierComponent.Notifier);

export const Controls = connect(
  function mapStateToProps(state) {
    return { notifications: state.notifications, popup: state.popup };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addNotification: notification => dispatch(notificationsActions.addNotification(notification)),
      readNotification: id => dispatch(notificationsActions.readNotification(id)),
      readNotifications: () => dispatch(notificationsActions.readNotifications()),
      deleteNotifications: () => dispatch(notificationsActions.deleteNotifications()),
      popupToggle: () => dispatch(popupActions.popupToggle())
    };
  }
)(ControlsComponent.Controls);
