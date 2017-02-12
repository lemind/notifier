import { INITIAL_STATE } from './notifications.initial-state';

console.log('INITIAL_STATE', INITIAL_STATE);

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'NOTIFICATION_READ':
      return state.map(n => {
        return n.id !== action.payload ? n : Object.assign({}, n, action.payload);
      });
    case 'NOTIFICATIONS_DELETED':
      return [];
    default:
      return state;
  }
}
