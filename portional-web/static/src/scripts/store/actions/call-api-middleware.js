import { normalize } from 'normalizr';

const callApiMiddleware = ({ dispatch, getState }) => next => action => {
  const { types, callApi, schema, shouldCallApi = () => true, payload = {} } = action;

  if (!types) {
    // Normal action, not handled by this middleware
    // pass the action along
    return next(action)
  }

  // Validate action properties
  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string') ||
    !schema
  ) {
    throw new Error('Expected an array of three string types')
  }

  if (typeof callApi !== 'function') {
    throw new Error('Expected callApi to be a function')
  }

  if (!shouldCallApi(getState())) {
    // Skip calling the API if it is unnecessary
    return
  }

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType, ...payload, });

  return callApi().then(
    response => dispatch({
      type: successType,
      ...payload,
      ...normalize(response.results || response, schema),
    }),
    error => dispatch({ type: failureType, ...payload, error }),
  );
};

export default callApiMiddleware
