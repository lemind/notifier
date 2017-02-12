if (module.hot) {
  module.hot.accept()
}

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';

import reducer from './reducer';
import { TodoList, Notifier } from './containers';

require('./app.less')

import notifications from './store/notifications/notifications.reducer';

const store = createStore(notifications);

const Controls = () => (
  <div>controls here</div>
);

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

// render(
//   <Provider store={store}>
//     <TodoList />
//   </Provider>,
//   document.getElementById('app1')
// );