import notificationsReducer from './notifications.reducer';
import { INITIAL_STATE } from './notifications.initial-state';

describe('notifications reducer', () => {
  let initState;

  beforeEach(() => {
    initState = notificationsReducer(undefined, { type: 'TEST_INIT '});
  });

  it('should have an appropriate init state', () => {
    expect(INITIAL_STATE).toBe(initState);
  });

  it('should add item on ADD_NOTIFICATION', () => {
    const previousState = initState;
    const newNotification = {
      id: 1,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    };
    const nextState = notificationsReducer(
      initState,
      { type: 'ADD_NOTIFICATION', payload: newNotification });

    expect(previousState.length + 1).toEqual(nextState.length);
    expect(nextState[nextState.length - 1]).toBe(newNotification);
  });

  it('should set `unread` field to false to appropriate item on NOTIFICATION_READ', () => {
    const notification = {
      id: 1,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    };

    const nextState = notificationsReducer(
      [notification],
      { type: 'NOTIFICATION_READ', payload: 1 });
    expect(nextState[0].unread).toBe(true);
  });

  it('should set `unread` field to false to all items on NOTIFICATIONS_READ', () => {
    const notifications = [{
      id: 1,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    },
    {
      id: 2,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    }];

    const nextState = notificationsReducer(
      notifications,
      { type: 'NOTIFICATIONS_READ' });
    expect(initState[0].unread).toBe(true);
    expect(initState[1].unread).toBe(true);
  });

  it('should return empty array on NOTIFICATIONS_DELETED', () => {
    const notifications = [{
      id: 1,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    },
    {
      id: 2,
      unread: true,
      title: 'title',
      datetime: new Date().getTime()
    }];

    const nextState = notificationsReducer(
      notifications,
      { type: 'NOTIFICATIONS_DELETED' });
    expect(nextState.length).toBe(0);
  });
});
