// Vendor Components
import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class Documents extends React.Component {
  componentWillMount() {
    // Check if appropriate details exist in redux store for this component
    // to mount, else redirect back to application page
    if (!this.props.application.details.firstName) {
      hashHistory.push('/application');
    }
  }
  render() {
    return (
      <div className="documents-page">
        <h1>Documents</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Documents);
