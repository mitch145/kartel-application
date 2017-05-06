// Vendor Components
import React, { Component } from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

// Routes
import Application from './routes/application';
import Documents from './routes/documents';

class App extends Component {
  render() {
    return (
      <div>
        <div className="pages">
          <Router history={hashHistory}>
            <Route path="/application" component={Application} />
            <Route path="/documents" component={Documents} />
            <Redirect from="*" to="/application" />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
