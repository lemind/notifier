// src/containers.js

import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo } from './actions';
import * as notyActions from './store/notifications/notifications.actions';

export const TodoList = connect(
  function mapStateToProps(state) {
    return { todos: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addTodo: text => dispatch(addTodo(text)),
      toggleTodo: id => dispatch(toggleTodo(id))
    };
  }
)(components.TodoList);

export const Notifier = connect(
  function mapStateToProps(state) {
    return { notifications: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addNotification: notification => dispatch(notyActions.addNotification(notification)),
      readNotification: id => dispatch(notyActions.readNotification(id)),
      deleteNotifications: () => dispatch(notyActions.deleteNotifications())
    };
  }
)(components.Notifier);
