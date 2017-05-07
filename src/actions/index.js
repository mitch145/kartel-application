import { hashHistory } from 'react-router';

export const apply = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'APPLICATION_REQUEST',
    });
    // Fake server call
    setTimeout(() => {
      const fakeJSONResponse = {
        errors: null,
      };
      if (!fakeJSONResponse.errors) {
        dispatch({
          type: 'APPLICATION_SUCCESS',
          data,
        });
        hashHistory.push('/documents');
      } else {
        dispatch({
          type: 'APPLICATION_FAILURE',
        });
      }
    }, 1000);
  };
};
export const selectFile = (fileName, file) => {
  return (dispatch) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
      dispatch({
        type: 'SELECT_FILE',
        name: fileName,
        object: file,
      });
    } else {
      dispatch({
        type: 'SET_ERROR_FILE',
        name: fileName,
        error: 'File must be pdf, jpeg or png',
      });
    }
  };
};
export const uploadFile = (fileName, file) => {
  return (dispatch) => {
    // Define fileReader and begin reading file
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    // Called when progress is made
    fileReader.onprogress = (data) => {
      if (data.lengthComputable) {
        const progress = parseInt(((data.loaded / data.total) * 100), 10);
        dispatch({
          type: 'PROGRESS_FILE',
          name: fileName,
          progress,
        });
      }
    };
    // Called when file upload is complete
    fileReader.onload = (data) => {
      // file data is inside data variable
      dispatch({
        type: 'UPLOAD_FILE',
        name: fileName,
        data: 'data has been sent to server',
      });
    };
  };
};
export const deleteFile = (fileName) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_FILE',
      name: fileName,
    });
  };
};
