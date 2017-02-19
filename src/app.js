import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Notifier, Controls } from './containers';
import notifications from './store/notifications/notifications.reducer';
import popup from './store/popup/popup.reducer';

const rootReducer = combineReducers({
    notifications,
    popup
  });

const store = createStore(rootReducer);

const App = () => (
  <div>
    <Notifier />
    <Controls />
  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
