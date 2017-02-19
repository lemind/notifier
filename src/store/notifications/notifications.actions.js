// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

export function addNotification(title) {
  return {
    type: 'ADD_NOTIFICATION',
    payload: {
      id: uid(),
      unread: true,
      title: title,
      datetime: new Date().getTime()
    }
  };
}

export function readNotification(notificationId) {
  return {
    type: 'NOTIFICATION_READ',
    payload: notificationId
  }
}

export function readNotifications() {
  return {
    type: 'NOTIFICATIONS_READ',
  }
}

export function deleteNotifications() {
  return {
    type: 'NOTIFICATIONS_DELETED'
  }
}
