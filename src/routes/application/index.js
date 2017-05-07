// Vendor Components
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, DatePicker } from 'redux-form-material-ui';

// Custom Components
import * as actions from '../../actions';
import LoadingIndicator from '../../components/LoadingIndicator';

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (!/^[A-Za-z\s]+$/.test(values.firstName)) {
    errors.firstName = 'First name may only contain letters and spaces';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (!/^[A-Za-z\s]+$/.test(values.lastName)) {
    errors.lastName = 'Last name may only contain letters and spaces';
  }
  if (!values.DOB) {
    errors.DOB = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.passportNumber) {
    errors.passportNumber = 'Required';
  } else if (!/^[0-9A-Za-z]*$/.test(values.passportNumber)) {
    errors.passportNumber = 'Passport number may only letters and numbers';
  }
  return errors;
};

class Application extends React.Component {
  render() {
    return (
      <form className="application-page" onSubmit={this.props.handleSubmit((data) => {
        this.props.actions.apply(data);
      })}>
        <Paper className="form">
          <p>Please enter your details</p>
          <Field component={TextField} name="firstName" type="text" hintText="First Name" />
          <Field component={TextField} name="lastName" type="text" hintText="Last Name" />
          <Field component={DatePicker} name="DOB" format={null} hintText="Date of Birth" />
          <Field component={TextField} name="address" type="text" hintText="Address" />
          <Field component={TextField} name="passportNumber" type="text" hintText="Passport Number" />
          <RaisedButton className="button" type="submit" label="Submit" secondary fullWidth />
        </Paper>
        <LoadingIndicator loading={this.props.application.loading} explainer="Submitting Application" />
      </form>
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

Application = connect(mapStateToProps, mapDispatchToProps)(Application);

export default reduxForm({
  form: 'application',
  validate,
})(Application);
