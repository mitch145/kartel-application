// Vendor Components
import React from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FileUploader from '../../components/FileUploader';
import RaisedButton from 'material-ui/RaisedButton';

// Custom Components
import * as actions from '../../actions';

class Documents extends React.Component {
  constructor() {
    super()
    this.state = {
      touched: false,
    }
  }
  componentWillMount() {
    // Check if appropriate details exist in redux store for this component
    // to mount, else redirect back to application page
    if (!this.props.application.details.firstName) {
      hashHistory.push('/application');
    }
  }
  uploadFiles = (data) => {
    this.setState({ touched: false })
    this.props.application.files.lease.object ?
      this.props.actions.uploadFile('lease', this.props.application.files.lease.object) :
      console.log('lease not uploaded')

    this.props.application.files.license.object ?
      this.props.actions.uploadFile('license', this.props.application.files.license.object) :
      console.log('license not uploaded')

    this.props.application.files.passport.object ?
      this.props.actions.uploadFile('passport', this.props.application.files.passport.object) :
      console.log('passport not uploaded')

    this.setState({ touched: true })
  }
  render() {
    return (
      <div className="documents-page">
        <Paper className="form">
          <FileUploader
            touched={this.state.touched}
            fileName='lease'
          />
          <FileUploader
            touched={this.state.touched}
            fileName='license'
          />
          <FileUploader
            touched={this.state.touched}
            fileName='passport'
          />
          <RaisedButton secondary onTouchTap={this.uploadFiles} label="Upload Files" />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);