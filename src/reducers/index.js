const initialState = {
  details: {
    firstName: null,
    lastName: null,
    DOB: null,
    address: null,
    passportNumber: null,
  },
  loading: false,
  files: {
    lease: {
      object: null,
      data: null,
      progress: null,
      error: null,
    },
    license: {
      object: null,
      data: null,
      progress: null,
      error: null,
    },
    passport: {
      object: null,
      data: null,
      progress: null,
      error: null,
    },
    rent: {
      object: null,
      data: null,
      progress: null,
      error: null,
    },
  },
};

export default function DigitalPlatform(state = initialState, action) {
  switch (action.type) {
    case 'APPLICATION_REQUEST':
      return Object.assign({}, state, {
        loading: true,
      });
    case 'APPLICATION_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        details: action.data,
      });
    case 'APPLICATION_FAILURE':
      return Object.assign({}, state, {
        loading: false,
        errors: {
          login: action.error,
        },
      });
    case 'SELECT_FILE':
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.name]: {
            ...state.files[action.name],
            object: action.object,
            data: null,
            progress: 0,
            error: null,
          },
        },
      });
    case 'SET_ERROR_FILE':
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.name]: {
            ...state.files[action.name],
            error: action.error,
          },
        },
      });
    case 'UPLOAD_FILE':
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.name]: {
            ...state.files[action.name],
            data: action.data,
          },
        },
      });
    case 'PROGRESS_FILE':
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.name]: {
            ...state.files[action.name],
            progress: action.progress,
          },
        },
      });
    case 'DELETE_FILE':
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.name]: {
            ...initialState.files[action.name],
          },
        },
      });
    default:
      return state;
  }
}
