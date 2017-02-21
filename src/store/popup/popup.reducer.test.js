import notificationsReducer from './popup.reducer';

describe('popup reducer', () => {
  let initState;

  beforeEach(() => {
    initState = notificationsReducer(undefined, { type: 'TEST_INIT '});
  });

  it('should have an appropriate init state', () => {
    expect(initState.open).toBe(false);
  });

  it('should change popup status to opposite on POPUP_TOGGLE', () => {
    const nextState = notificationsReducer(
      {open: false},
      { type: 'POPUP_TOGGLE'});

    expect(nextState.open).toEqual(true);

    const nextStateOpposite = notificationsReducer(
      {open: true},
      { type: 'POPUP_TOGGLE'});

    expect(nextStateOpposite.open).toEqual(false);
  });

});
