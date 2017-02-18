import React from 'react';
import classNames from 'classnames';

import styles from './app.less'

import PopoverPanel from './components/PopoverPanel'
import Popover from 'material-ui/Popover';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as moment from 'moment';

export function Todo(props) {
  const { todo } = props;
  if(todo.isDone) {
    return <strike>{todo.text}</strike>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export function TodoList(props) {
  const { todos, toggleTodo, addTodo } = props;

  const onSubmit = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };

  const toggleClick = id => event => toggleTodo(id);

  return (
    <div className='todo'>
      <input type='text'
             className='todo__entry'
             placeholder='Add todo'
             onKeyDown={onSubmit} />
      <ul className='todo__list'>
        {todos.map(t => (
          <li key={t.get('id')}
              className={styles.element}
              onClick={toggleClick(t.get('id'))}>
            <Todo todo={t.toJS()} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export class EventList extends React.Component {
  constructor(props) {
    super();

    this.lastUnreadNotifications = this.getUnreadItems(props.items);
  }

  getUnreadItems(items) {
    const unreadCount = 5;
    const filtered = items.filter((i) => {return i.unread});
    return filtered.slice(0, unreadCount);
  }

  render() {
    return (
      <div className={styles.eventList}>
        {this.lastUnreadNotifications.map(n => (
          <div key={n.id} className={styles.event}>
            <div className={styles.eventTitle}>{n.title}</div>
            <div className={styles.eventTime}>{moment(n.datetime).fromNow()}</div>
          </div>
        ))}
        <a className={styles.close} onClick={this.props.closeHandler}>nore events...</a>
      </div>
    )
  }
}

export class Notifier extends React.Component {
  constructor(props) {
    super();

    const { notifications,
      addNotification,
      deleteNotifications,
      readNotification } = props;
    this.notifications = props.notifications;

    const unreadCount = notifications.reduce((count, item) => {
      item.unread && count++;
      return count;
    }, 0);

    this.state = {
      value: 1,
      notifications: notifications,
      unreadCount: unreadCount,
      popoverOpen: false
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleTouchTap(event){
    event.preventDefault();
    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose(){
    event.preventDefault();
    this.setState({
      popoverOpen: false,
    });
  }

  render() {
    let active = false;

    let notifierClasses = {};
    notifierClasses[styles['notifier']] = true;
    notifierClasses[styles['notifierActive']] = active;
    let notifierClassesStr = classNames(notifierClasses);

    let notificationNoneClasses = {
        'material-icons': true,
      };
    notificationNoneClasses[styles['notifierIcons']] = true;
    notificationNoneClasses[styles['notificationNoneIcon']] = true;
    let notificationNoneClassesStr = classNames(notificationNoneClasses);

    let notificationActiveClasses = {
        'material-icons': true,
      };
    notificationActiveClasses[styles['notifierIcons']] = true;
    notificationActiveClasses[styles['notificationActiveIcon']] = true;
    let notificationActiveClassesStr = classNames(notificationActiveClasses);

    const _this = this;
    const handleTouchTap = this.handleTouchTap.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);

    return (
      <div className={styles.header}>
        <span>popoverOpen - {this.state.popoverOpen ? 'true' : 'false'}</span>
        <div className={notifierClassesStr} onClick={handleTouchTap}>
          <span className={styles.counter}>{this.state.unreadCount}</span>
          <i className={notificationNoneClassesStr}>notifications_none</i>
          <i className={notificationActiveClassesStr}>notifications_active</i>
        </div>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          animationOptions={{duration: 0.3, timing: 'linear'}}
          onRequestClose={handleRequestClose}
        >
          <div><EventList items={this.notifications} closeHandler={handleRequestClose}/></div>
        </Popover>
      </div>
    );
  }

}

Notifier.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
