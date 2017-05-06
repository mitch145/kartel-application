// Vendor Components
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom Components
import App from './App';
import Theme from './Theme';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={Theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
