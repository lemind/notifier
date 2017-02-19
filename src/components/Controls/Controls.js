import React from 'react';
import classNames from 'classnames';

import styles from './controls.less'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as moment from 'moment';

export class Controls extends React.Component {
  constructor(props) {
    const { notifications,
      addNotification,
      deleteNotifications,
      readNotification } = props;

    super();

    this.actions = {};
    this.actions.addNotification = props.addNotification;
    this.actions.readNotifications = props.readNotifications;
    this.actions.deleteNotifications = props.deleteNotifications;

    this.state = {
      notifications: props.notifications
    };
  }

  addNotification(event) {
    const input = this.textInput;
    const title = input.value;
    const isEnterKey = (event.which == 13);
    const isClick = (event.type == 'click');
    const isLongEnough = title.length > 0;

    if((isEnterKey || isClick) && isLongEnough) {
      input.value = '';
      this.actions.addNotification(title);
    }
  }

  markAllEventsRead() {
    this.actions.readNotifications();
  }

  deleteEvents() {
    this.actions.deleteNotifications();
  }

  togglePopup() {
    console.log('toggle');
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillReceiveProps(state) {
    this.setState({
      notifications: state.notifications,
    });
  }

  render() {
    const addNotification = this.addNotification.bind(this);
    const markAllEventsRead = this.markAllEventsRead.bind(this);
    const deleteEvents = this.deleteEvents.bind(this);
    const togglePopup = this.togglePopup.bind(this);

    return (
      <div>
        <div className={styles.wrapper}>
          <input type='text'
            className={styles.input}
            placeholder='Event message'
            ref={(input) => { this.textInput = input; }}
            onKeyDown={addNotification} />
          <button onClick={addNotification}>Send</button>
          <div className={styles['button-wrapper']}>
            <button onClick={markAllEventsRead}>Mark all events 'read'</button>
          </div>
          <div className={styles['button-wrapper']}>
            <button onClick={deleteEvents}>Delete events</button>
          </div>
          <div className={styles['button-wrapper']}>
            <button onClick={togglePopup}>Toggle popup</button>
          </div>

<div style={{'marginTop': '50px'}}>
{this.state.notifications.map(n => (
  <div key={n.id}>
    <div>{n.title} - {n.unread ? 1 : 0}</div>
  </div>
))}
</div>

        </div>
      </div>
    );
  }

}

Controls.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
