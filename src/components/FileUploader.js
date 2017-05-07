// Vendor Components
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

export default class FileUploader extends React.Component {
  constructor() {
    super()
    this.state = {
      progress: 0,
      file: null,
      uploaded: false,
      error: null
    }
  }
  // Open file dialog from hidden input
  openFileDialog = () => {
    const fileUploadDom = this.refs.fileUpload;
    fileUploadDom.click();
  }
  // Save file selected inside dialog to state
  selectFile = (e) => {
    const file = e.target.files[0]
    this.setState({ file: file })
  }
  // Upload given file
  uploadFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onprogress = (data) => {
      if (data.lengthComputable) {
        let progress = parseInt(((data.loaded / data.total) * 100), 10);
        this.setState({ progress: progress })
      }
    }
    // Function is called with file data when upload is complete,
    // at this stage file can be sent anywhere (redux or server etc.)
    fileReader.onload = (data) => {
      this.setState({ uploaded: true })
    }
  }
  // Perform checks before calling uploadFile function
  uploadFileFromState = () => {
    // Do not upload file if it's already uploaded or is not
    // stored in state, instead return false
    if (this.state.file === null || this.state.uploaded === true) {
      return false;
    }
    this.uploadFile(this.state.file)
    return true;
  }
  removeFile = () => {
    this.setState({ file: null, uploaded: false, progress: 0 })
  }
  render() {
    return (
      <div className="file-uploader">
        <input
          ref="fileUpload"
          type="file"
          style={{ "display": "none" }}
          onChange={this.selectFile} />
        {this.state.file ?
          <div className="selected-file">
            <p>
              <i className={this.state.uploaded ? 'fa fa-check green' : 'fa fa-times red'}></i>
              &nbsp;{this.state.file.name}
            </p>
            <RaisedButton className="upload-cancel" onTouchTap={() => {
              this.removeFile()
            }} label={"Remove"} />
          </div>
          : <RaisedButton
            className="upload-button"
            onTouchTap={this.openFileDialog}
            label={"Upload " + this.props.fileName}
          />
        }
        <LinearProgress className="progress" mode="determinate" value={this.state.progress} />
        {this.state.error ? <p className="error">{this.state.error}</p>: ''}
        {this.props.touched && !this.state.uploaded ? <p className="error">{"Please upload " + this.props.fileName}</p>: ''}
      </div>
    );
  }
}
