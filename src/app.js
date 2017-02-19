if (module.hot) {
  module.hot.accept()
}

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';

import reducer from './reducer';
import { TodoList, Notifier, Controls } from './containers';

require('./app.less')

import notifications from './store/notifications/notifications.reducer';
import popup from './store/popup/popup.reducer';

const rootReducer = combineReducers({
    todos: reducer,
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
