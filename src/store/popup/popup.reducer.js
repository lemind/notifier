
export default function(state = {open: false}, action) {
  switch(action.type) {
    case 'POPUP_TOGGLE':
      return Object.assign({}, state, {open: !state.open});
    default:
      return state;
  }
}
