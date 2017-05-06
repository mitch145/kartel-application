const initialState = {
  details: {
    firstName: null,
    lastName: null,
    DOB: null,
    address: null,
    passportNumber: null,
  },
  loading: false,
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
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
