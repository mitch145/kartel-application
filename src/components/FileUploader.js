// Vendor Components
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Custom Components
import * as actions from '../actions';

class FileUploader extends React.Component {
  // Open file dialog from hidden input
  openFileDialog = () => {
    const fileUploadDom = this.refs.fileUpload;
    fileUploadDom.click();
  }
  // Save file selected inside dialog to state
  selectFile = (e) => {
    const file = e.target.files[0]
    this.props.actions.selectFile(this.props.fileName, file)
  }
  render() {
    let {object, data, progress} = this.props.application.files[this.props.fileName]
    return (
      <div className="file-uploader">
        <input
          ref="fileUpload"
          type="file" 
          style={{ "display": "none" }}
          onChange={this.selectFile} />
        {object ?
          <div className="selected-file">
            <p>
              <i className={data ? 'fa fa-check green' : 'fa fa-times red'}></i>
              &nbsp;{object.name}
            </p>
            <RaisedButton className="upload-cancel" onTouchTap={() => {
              this.props.actions.deleteFile(this.props.fileName)
            }} label={"Remove"} />
          </div>
          : <RaisedButton
            className="upload-button"
            onTouchTap={this.openFileDialog}
            label={"Upload " + this.props.fileName}
          />
        }
        <LinearProgress className="progress" mode="determinate" value={progress} />
        {this.props.touched && !object ? <p className="error">{"Please upload " + this.props.fileName}</p>: ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);