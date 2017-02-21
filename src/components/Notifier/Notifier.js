import React from 'react';
import classNames from 'classnames';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Popover from 'material-ui/Popover';
import * as moment from 'moment';

import * as CONST from './../../const'
import styles from './notifier.less';

export class EventList extends React.Component {
  constructor(props) {
    super();

    this.lastUnreadNotifications = this.getUnreadItems(props.items);
  }

  getUnreadItems(items) {
    const filtered = items.filter((i) => {return i.unread});
    return filtered.slice(0, CONST.UNREAD_MESSAGE_COUNT);
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
        <a className={styles.close} onClick={this.props.closeHandler}>more events...</a>
      </div>
    )
  }
}

export class Notifier extends React.Component {
  constructor(props) {
    super();

    this.popupToggleAction = props.popupToggle;
    this.notifications = props.notifications;

    this.state = {
      notifications: this.notifications,
      unreadCount: this.getUnreadCount(this.notifications),
      popoverOpen: props.popup.open
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  getUnreadCount(notifications) {
    return notifications.reduce((count, item) => {
      item.unread && count++;
      return count;
    }, 0);
  }

  handleTouchTap(event){
    event.preventDefault();
    if (this.state.unreadCount) {
      this.popupToggleAction();
    }
  }

  handleRequestClose(){
    event.preventDefault();
    this.popupToggleAction();
  }

  componentWillReceiveProps(state) {
    this.setState({
      notifications: state.notifications,
      unreadCount: this.getUnreadCount(state.notifications),
      popoverOpen: state.popup.open,
    });
  }

  getCssClasses(activeState){
    let notifierClasses = {};
    notifierClasses[styles['notifier']] = true;
    notifierClasses[styles['notifierActive']] = activeState;
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

    return { notifierClassesStr,
        notificationNoneClassesStr,
        notificationActiveClassesStr
      };
  }

  render() {
    let active = !!this.state.unreadCount;
    const { notifierClassesStr,
        notificationNoneClassesStr,
        notificationActiveClassesStr
      } = this.getCssClasses(!!this.state.unreadCount);

    const _this = this;
    const handleTouchTap = this.handleTouchTap.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);

    return (
      <div className={styles.header}>
        <div className={notifierClassesStr}
          onClick={handleTouchTap}
          ref={(el) => { this.notifierEl = el; }}>
          <span className={styles.counter}>
            {this.state.unreadCount > CONST.MAX_NOTIFIER_MESSAGE_COUNT
              ? '>' + CONST.MAX_NOTIFIER_MESSAGE_COUNT
              : this.state.unreadCount}
          </span>
          <i className={notificationNoneClassesStr}>notifications_none</i>
          <i className={notificationActiveClassesStr}>notifications_active</i>
        </div>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.notifierEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          animationOptions={{duration: 0.3, timing: 'linear'}}
          onRequestClose={handleRequestClose}
        >
          <div>
            <EventList items={this.state.notifications} closeHandler={handleRequestClose}/>
          </div>
        </Popover>
      </div>
    );
  }

}

Notifier.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
