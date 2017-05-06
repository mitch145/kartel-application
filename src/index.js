// Vendor Components
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';


// Custom Components
import App from './App';
import Theme from './Theme';
import './index.css';
import kartelApplication from './reducers';

injectTapEventPlugin();


const middleware = [thunk];

const reducers = {
  application: kartelApplication,
  form: formReducer,
};

const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(...middleware),
    window.devToolsExtension ?
      window.devToolsExtension() :
      f => f));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={Theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
