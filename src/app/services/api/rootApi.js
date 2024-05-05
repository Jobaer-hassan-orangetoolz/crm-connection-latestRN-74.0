import {config} from '../../../config';
import {messages} from '../../assets/js/messages.message';
import {getLocalData} from '../../packages/asyncStorage/storageHandle';
import {hasInternetConnection} from '../../packages/netinfo/netInfoHandler';
import {isEmpty} from '../../utilities/helper.utility';
import {ErrorLog} from '../error/errorHandler.service';

const apiStatus = {
  internalError: 'internal',
  invalidCredential: 1001,
  validation: 1002,
  tokenInvalid: 1003,
  tokenExpired: 1004,
  timeoutError: 'time-out',
  internetError: 'no-internet',
  unauthorized: 401,
};
/* methods start */
const responseFormatter = response => {
  if (response.success) {
    return returnResponse(response.data, true, response.message);
  } else {
    if (response.responseCode === apiStatus.unauthorized) {
      global.logout();
      return returnResponse(response.data, false, response.message, true);
    }
    if (response.responseCode === apiStatus.invalidCredential) {
      return returnResponse(response.data, false, response.message);
    }
    if (response.responseCode === apiStatus.validation) {
      return returnResponse(response.data, false, response.message);
    }
    if (response.responseCode === apiStatus.tokenInvalid) {
      global.logout();
      return returnResponse(response.data, false, messages.noToken, true);
    }
    if (response.responseCode === apiStatus.tokenExpired) {
      global.logout();
      return returnResponse(response.data, false, messages.noToken, true);
    }
    if (response.responseCode === apiStatus.timeoutError) {
      global.logout();
      return returnResponse(response.data, false, messages.noToken, true);
    } else {
      return returnResponse(null, false, response.message);
    }
  }
};
const returnResponse = (response, status, message, logout = false) => {
  return {
    status: status,
    body: response,
    message: message,
    logout: logout,
  };
};
const errorHandler = (formatData = {}, apiError) => {
  ErrorLog({
    formatData: formatData,
    apiError: apiError,
  });
};
const abortHandler = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const abortRequest = setTimeout(() => {
    if (abortController) {
      abortController.abort();
    }
    clearTimeout(abortRequest);
    returnResponse(null, false, messages.timeout);
  }, config.apiTimeout);
  return {
    signal: signal,
    abortRequest: abortRequest,
  };
};
const requestHeader = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return headers;
};
const requestAuthHeader = token => {
  const headers = {...requestHeader()};
  headers.Authorization = `Bearer ${token}`;
  return headers;
};
const requestAuthMultiPartHeader = token => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };
  return headers;
};
const requestBody = payload => {
  return JSON.stringify(payload);
};
const apiToken = async (next, data) => {
  const token = await getLocalData.getApiToken();
  if (isEmpty(token)) {
    errorHandler({...data}, messages.noToken);
    return returnResponse(null, false, messages.noToken, true);
  }
  return next({...data, token});
};
const internetCheck = async (next, data, hasToken = false) => {
  const interNetFlag = await hasInternetConnection();
  if (!interNetFlag) {
    return returnResponse(null, false, messages.internet);
  }
  if (hasToken) {
    return apiToken(next, data);
  }
  return next({...data});
};
/* methods end */

/* root api start */
const rootApi = async (method = 'GET', url, payload) => {
  const types = {
    GET: () => internetCheck(rootGetApi, {url: url}, true),
    POST: () => internetCheck(rootPostApi, {url: url, payload: payload}, true),
    PUT: () => internetCheck(rootPutApi, {url: url, payload: payload}, true),
    DELETE: () =>
      internetCheck(rootDeleteApi, {url: url, payload: payload}, true),
    POST_FROM_DATA: () =>
      internetCheck(rootFormDataPostApi, {url: url, payload: payload}, true),
    PUT_FROM_DATA: () =>
      internetCheck(rootFormDataPUTApi, {url: url, payload: payload}, true),
    GET_WITHOUT_AUTH: () => internetCheck(rootPublicGetApi, {url: url}),
    POST_WITHOUT_AUTH: () =>
      internetCheck(rootPublicPostApi, {url: url, payload: payload}),
    PUT_WITHOUT_AUTH: () =>
      internetCheck(rootPublicPutApi, {url: url, payload: payload}),
  };
  return types[method]();
};
const rootGetApi = async ({url, token}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'GET',
    headers: requestAuthHeader(token),
    referrerPolicy: 'origin',
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'GET',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootPostApi = async ({url, payload, token}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'POST',
    headers: requestAuthHeader(token),
    referrerPolicy: 'origin',
    body: requestBody(payload),
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      if (abortRequest) {
        clearTimeout(abortRequest);
      }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'POST',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootFormDataPostApi = async ({url, payload, token}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'POST',
    headers: requestAuthMultiPartHeader(token),
    referrerPolicy: 'origin',
    body: payload,
  };
  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'POST',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootFormDataPUTApi = async ({url, payload, token}) => {
  // const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'PUT',
    headers: requestAuthMultiPartHeader(token),
    referrerPolicy: 'origin',
    body: payload,
  };
  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'PUT',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootPutApi = async ({url, payload, token}) => {
  // const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'PUT',
    headers: requestAuthHeader(token),
    referrerPolicy: 'origin',
    body: requestBody(payload),
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'POST',
        },
        error,
      );
      return returnResponse(
        null,
        apiStatus.internalError,
        messages.internalError,
      );
    });
};
const rootDeleteApi = async ({url, token}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'DELETE',
    headers: requestAuthHeader(token),
    referrerPolicy: 'origin',
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'GET',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootPublicGetApi = async ({url}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    signal,
    method: 'GET',
    headers: requestHeader(),
    referrerPolicy: 'origin',
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      if (abortRequest) {
        clearTimeout(abortRequest);
      }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'GET',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootPublicPostApi = async ({url, payload}) => {
  // const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    // signal,
    method: 'POST',
    headers: requestHeader(),
    referrerPolicy: 'origin',
    body: requestBody(payload),
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      // if (abortRequest) {
      //   clearTimeout(abortRequest);
      // }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'POST',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
const rootPublicPutApi = async ({url, payload}) => {
  const {signal, abortRequest} = abortHandler();
  const bodyParams = {
    signal,
    method: 'PUT',
    headers: requestHeader(),
    referrerPolicy: 'origin',
    body: requestBody(payload),
  };

  return fetch(url, bodyParams)
    .then(response => response.json())
    .then(responseData => {
      if (abortRequest) {
        clearTimeout(abortRequest);
      }
      return responseFormatter(responseData);
    })
    .catch(error => {
      errorHandler(
        {
          url: url,
          bodyParams: bodyParams,
          method: 'POST',
        },
        error,
      );
      return returnResponse(null, false, messages.internalError);
    });
};
/* root api end */
export {rootApi};
