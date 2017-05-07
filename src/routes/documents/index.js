// Vendor Components
import React from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FileUploader from '../../components/FileUploader';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';

// Custom Components
import * as actions from '../../actions';

class Documents extends React.Component {
  constructor() {
    super()
    this.state = {
      touched: false,
      rentTouched: false,
      passportType: null,
    }
  }
  componentWillMount() {
    // Check if appropriate details exist in redux store for this component
    // to mount, else redirect back to application page
    if (!this.props.application.details.firstName) {
      hashHistory.push('/application');
    }
  }
  componentDidUpdate = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }
  uploadFiles = (data) => {
    this.setState({ touched: false })

    // If lease object is in memory upload file
    this.props.application.files.lease.object &&
      this.props.actions.uploadFile('lease', this.props.application.files.lease.object)

    // If license object is in memory upload file
    this.props.application.files.license.object &&
      this.props.actions.uploadFile('license', this.props.application.files.license.object)

    // If passport object is in memory upload file
    this.props.application.files.passport.object &&
      this.props.actions.uploadFile('passport', this.props.application.files.passport.object)

    this.setState({ touched: true })
  }
  uploadRent = (data) => {
    this.setState({ utilityRentTouched: false })

    // If rent object is in memory upload file
    this.props.application.files.rent.object &&
      this.props.actions.uploadFile('rent', this.props.application.files.rent.object)

    this.setState({ utilityRentTouched: true })
  }
  handlePassportTypeChange = (e) => {
    if (e.target.value === 'yes') {
      this.setState({ passportType: 'australian' })
    } else {
      this.setState({ passportType: 'other' })
    }
  }
  render() {
    return (
      <div className="documents-page">
        <Paper className="form">
          <p className="details">Welcome {this.props.application.details.firstName + ' ' + this.props.application.details.lastName}</p>
          <Divider />
          <p className="details">DOB: <span className="value">{this.props.application.details.DOB && this.props.application.details.DOB.toDateString()}</span></p>
          <Divider />
          <p className="details">Address: <span className="value">
            {this.props.application.details.address}
          </span></p>
          <Divider />
          <p className="details">Passport Number: <span className="value">
            {this.props.application.details.passportNumber}
          </span></p>
        </Paper>
        <Paper className="form initial-upload">
          <p>Please upload your lease, license and passport documents</p>
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
          <RaisedButton secondary onTouchTap={this.uploadFiles} label="Submit Selected Files" />
        </Paper>
        {!!this.props.application.files.lease.data &&
          !!this.props.application.files.license.data &&
          !!this.props.application.files.passport.data ?
          <Paper className="form passport">
            <p>Is your passport Australian?</p>
            <RadioButtonGroup onChange={this.handlePassportTypeChange} name="shipSpeed">
              <RadioButton
                value="yes"
                label="Yes"
              />
              <RadioButton
                value="no"
                label="No"
              />
            </RadioButtonGroup>
          </Paper> : ''}
        {this.state.passportType === 'other' ?
          <Paper className="form">
            <p>Please upload either a utility bill or rent receipt</p>
            <FileUploader
              touched={this.state.rentTouched}
              fileName='rent'
            />
            <RaisedButton secondary onTouchTap={this.uploadRent} label="Submit Selected Files" />
          </Paper> : ''}
        {this.state.passportType === 'australian' || (this.state.passportType === 'other' && !!this.props.application.files.rent.data) ?
          <Paper className="form success">
            <p>Application Complete!</p>
          </Paper> : ''}
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
