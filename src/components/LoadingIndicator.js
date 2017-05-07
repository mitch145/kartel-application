// Vendor Components
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

// Custom Components
import Theme from '../Theme';

export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <div>
        {this.props.loading ?
          <div className="loading-indicator">
            <CircularProgress color={Theme.palette.accent1Color} />
            <p className="explainer">
              {this.props.explainer}
            </p>
          </div>
          : ''}
      </div>
    );
  }
}