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
    }, 3000);
  };
};
export const selectFile = (fileName, file) => {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_FILE',
      name: fileName,
      object: file,
    });
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
      dispatch({
        type: 'UPLOAD_FILE',
        name: fileName,
        data,
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
