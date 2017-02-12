import React from 'react';
import classNames from 'classnames';

import styles from './app.less'

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

export function Notifier(props) {
  const { notifications,
    addNotification,
    deleteNotifications,
    readNotification } = props;

  const unreadCount = notifications.reduce((count, item) => {
    item.unread && count++;
    return count;
  }, 0);

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

  return (
    <div className={styles.header}>
      <div className={notifierClassesStr}>
        <span className={styles.counter}>{unreadCount}</span>
        <i className={notificationNoneClassesStr}>notifications_none</i>
        <i className={notificationActiveClassesStr}>notifications_active</i>
      </div>
    </div>
  );
}