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
