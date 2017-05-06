// Vendor Components
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

export default class Application extends React.Component {
  render() {
    return (
      <div className="application-page">
        <Paper className="form">
          <TextField type="text" hintText="First Name" />
          <TextField type="text" hintText="Last Name" />
          <DatePicker hintText="Date of Birth" />
          <TextField type="text" hintText="Address" />
          <TextField type="text" hintText="Passport Number" />
          <RaisedButton label="Submit" secondary fullWidth />
        </Paper>
      </div>
    );
  }
}
