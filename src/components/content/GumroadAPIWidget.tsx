import { FaTrashAlt } from '@react-icons/all-files/fa/FaTrashAlt';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import React from 'react';
import { Alert, Badge, Button, ButtonGroup, Card, Form, Stack } from 'react-bootstrap';
import ReactJson from 'react-json-view-ssr';
import { useLocalStorageObject, useLocalStorageString } from 'react-use-window-localstorage';
import { combineClassNames } from '../component-utils';
import { CancelableFormControl } from '../widgets/CancelableFormControl';
import { IconButton } from './IconButton';
import { Param, RESTEndpoint, v2Api } from './v2api';

interface Props {}

export const GumroadAPIWidget = (props: Props) => {
  const [apiRoot, setAPIRoot] = useLocalStorageString('gumroadAPIRoot', 'https://api.gumroad.com/v2');
  const [accessToken, setAccessToken] = useLocalStorageString('gumroadAccessToken', '');
  const [endpointUrl, setEndpointUrl] = useLocalStorageString('gumroadEndpointUrl', '');
  const [method, setMethod] = useLocalStorageString('gumroadMethod', 'GET');
  const [urlParams, setUrlParams] = useLocalStorageObject('gumroadUrlParams', []);
  const [params, setParams] = useLocalStorageObject('gumroadParams', []);
  const [status, setStatus] = React.useState(-1);
  const [response, setResponse] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>('');
  const [selectedEndpointIndex, setSelectedEndpointIndex] = React.useState<number>(-1);
  const selectedEndpoint: RESTEndpoint | undefined =
    selectedEndpointIndex >= 0 ? v2Api[selectedEndpointIndex] : undefined;

  const [lastFetchMethod, setLastFetchMethod] = React.useState('');
  const [lastFetchUrl, setLastFetchUrl] = React.useState('');

  let statusLabel = `${status}`;
  switch (status) {
    case 200:
      statusLabel = `${status}: OK`;
      break;
    case 400:
      statusLabel = `${status}: Bad Request`;
      break;
    case 401:
      statusLabel = `${status}: Unauthorized`;
      break;
    case 402:
      statusLabel = `${status}: Request Failed`;
      break;
    case 404:
      statusLabel = `${status}: Not Found`;
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      statusLabel = `${status}: Server Error`;
      break;
    default:
  }

  const handleSend = () => {
    if (apiRoot && endpointUrl && accessToken && method) {
      const queryParams = [{ k: 'access_token', v: accessToken }, ...(method === 'GET' ? params : [])];
      let finalizedEndpointUrl = endpointUrl;
      urlParams.forEach((urlParam: Param) => {
        console.log(`:${urlParam.k}`, encodeURIComponent(urlParam.v));
        finalizedEndpointUrl = finalizedEndpointUrl.replace(`:${urlParam.k}`, encodeURIComponent(urlParam.v));
      });
      const fetchUrl =
        apiRoot.replace(/\/$/, '') +
        (finalizedEndpointUrl.startsWith('/') ? '' : '/') +
        finalizedEndpointUrl +
        '?' +
        queryParams
          .filter((param) => param.k.length > 0)
          .map((param) => `${encodeURIComponent(param.k)}=${encodeURIComponent(param.v)}`)
          .join('&');
      console.log(fetchUrl);
      const paramMap: Record<string, string> = {};
      params.forEach((param: Param) => {
        if (param.k.length > 0) {
          paramMap[param.k] = param.v;
        }
      });
      setLastFetchMethod(method);
      setLastFetchUrl(fetchUrl);
      fetch(fetchUrl, {
        method,
        headers:
          method !== 'GET'
            ? {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
            : undefined,
        body: method !== 'GET' ? JSON.stringify(paramMap) : undefined,
      })
        .then((response) => {
          setStatus(response.status);
          return response.text();
        })
        .then((data) => {
          setResponse(data);
          let newErrorMessage = undefined;
          let newSuccessMessage = undefined;
          try {
            const json = JSON.parse(data);
            if (typeof json.success !== 'undefined' && !json.success && typeof json.message === 'string') {
              newErrorMessage = json.message;
            } else if (typeof json.success !== 'undefined' && json.success && typeof json.message === 'string') {
              newSuccessMessage = json.message;
            }
          } catch (e) {}
          setErrorMessage(newErrorMessage);
          setSuccessMessage(newSuccessMessage);
        })
        .catch((e) => {
          console.error(e);
          setErrorMessage(`${e}`);
        });
    }
  };

  let responseJson = undefined;
  try {
    responseJson = JSON.parse(response);
  } catch (e) {}

  React.useEffect(() => {
    const foundIndex = v2Api.findIndex(
      (endpoint) => endpoint.endpointUrl === endpointUrl && endpoint.method === method,
    );
    setSelectedEndpointIndex(foundIndex);
    if (foundIndex >= 0) {
      const endpoint = v2Api[foundIndex];
      const prevApiParams: Param[] = [...params];
      const paramArray: Param[] = endpoint.params.map((param: Param) => {
        return { k: param.k, v: prevApiParams.find((p) => p.k === param.k)?.v || '' };
      });
      setParams(paramArray);
    }
  }, [endpointUrl, method]);

  const updateUrlParamsForEndpointUrl = (newEndpointUrl: string) => {
    if (newEndpointUrl) {
      const urlParamMatches = newEndpointUrl.match(/[:]\w+/g);
      if (urlParamMatches) {
        const prevUrlParams: Param[] = [...urlParams];
        const urlParamArray: Param[] = urlParamMatches.map((urlParam) => {
          const paramKey: string = urlParam.replace(/^[:]/, '');
          return { k: paramKey, v: prevUrlParams.find((p) => p.k === paramKey)?.v || '' };
        });
        setUrlParams(urlParamArray);
      } else {
        setUrlParams([]);
      }
    } else {
      setUrlParams([]);
    }
  };

  const urlParamElements = urlParams.map((param: Param, index: number) => {
    return (
      <div key={`url-param-${index}`} className="d-flex align-items-center gap-1">
        <CancelableFormControl type="text" placeholder="Enter key name" value={urlParams[index].k} readOnly />
        =
        <CancelableFormControl
          type="text"
          placeholder={`Enter ${urlParams[index].k} value`}
          value={urlParams[index].v}
          onChange={(e) => {
            const newParams = [...urlParams];
            newParams[index] = { ...newParams[index], v: e.target.value };
            setUrlParams(newParams);
          }}
          onCancel={() => {
            const newParams = [...urlParams];
            newParams[index] = { ...newParams[index], v: '' };
            setUrlParams(newParams);
          }}
        />
      </div>
    );
  });

  const apiParamElements = params.map((param: Param, index: number) => {
    return (
      <div key={`param-${index}`} className="d-flex align-items-center gap-1">
        <CancelableFormControl
          type="text"
          placeholder="Enter key name"
          value={params[index].k}
          onChange={(e) => {
            const newParams = [...params];
            newParams[index] = { ...newParams[index], k: e.target.value };
            setParams(newParams);
          }}
          onCancel={() => {
            const newParams = [...params];
            newParams[index] = { ...newParams[index], k: '' };
            setParams(newParams);
          }}
        />
        =
        <CancelableFormControl
          type="text"
          placeholder="Enter value"
          value={params[index].v}
          onChange={(e) => {
            const newParams = [...params];
            newParams[index] = { ...newParams[index], v: e.target.value };
            setParams(newParams);
          }}
          onCancel={() => {
            const newParams = [...params];
            newParams[index] = { ...newParams[index], v: '' };
            setParams(newParams);
          }}
        />
        <IconButton
          icon={FaTrashAlt}
          variant="danger"
          onClick={() => {
            const newParams = [...params];
            newParams.splice(index, 1);
            setParams(newParams);
          }}
        />
      </div>
    );
  });

  const endpointOptionElements = v2Api.map((endpoint, index) => {
    return (
      <option key={`endpoint-${index}`} value={index}>
        {endpoint.method}: {endpoint.endpointUrl}
      </option>
    );
  });

  return (
    <Stack gap={2}>
      <div>
        <Form.Group controlId="api-root-url">
          <Form.Label>API Root URL</Form.Label>
          <CancelableFormControl
            type="text"
            placeholder="Root URL for the Gumroad API"
            value={apiRoot || ''}
            onChange={(e) => {
              setAPIRoot(e.target.value);
              if (typeof localStorage !== 'undefined') {
                localStorage['gumroadAPIRoot'] = e.target.value;
              }
            }}
            onCancel={() => {
              setAPIRoot('');
              if (typeof localStorage !== 'undefined') {
                delete localStorage['gumroadAPIRoot'];
              }
            }}
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="access-token">
          <Form.Label>Access Token</Form.Label>
          <CancelableFormControl
            type="text"
            placeholder="Paste access token here"
            value={accessToken || ''}
            onChange={(e) => {
              setAccessToken(e.target.value);
            }}
            onCancel={() => {
              setAccessToken('');
            }}
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="selected-endpoint">
          <Form.Label>Select An Endpoint (v2)</Form.Label>
          <Form.Select
            value={selectedEndpointIndex}
            onChange={(e: any) => {
              const parsedIndex = Number.parseInt(e.target.value);
              if (!Number.isNaN(parsedIndex)) {
                setSelectedEndpointIndex(Number.isNaN(parsedIndex) ? -1 : parsedIndex);
                if (parsedIndex >= 0) {
                  const newEndpoint = v2Api[parsedIndex];
                  setEndpointUrl(newEndpoint.endpointUrl);
                  setMethod(newEndpoint.method);
                  setParams(newEndpoint.params);
                  updateUrlParamsForEndpointUrl(newEndpoint.endpointUrl);
                }
              }
            }}
          >
            <option value={-1}>Make a selection...</option>
            {endpointOptionElements}
          </Form.Select>
          {selectedEndpoint && (
            <Alert variant="info" className="mt-1 py-1">
              {selectedEndpoint.description}
            </Alert>
          )}
        </Form.Group>
      </div>
      <Stack gap={1}>
        <Form.Group controlId="endpoint-url">
          <Form.Label>Endpoint URL</Form.Label>
          <CancelableFormControl
            type="text"
            placeholder="API endpoint e.g. /products"
            value={endpointUrl || ''}
            onChange={(e) => {
              setEndpointUrl(e.target.value);
              updateUrlParamsForEndpointUrl(e.target.value);
            }}
            onCancel={() => {
              setEndpointUrl('');
              updateUrlParamsForEndpointUrl('');
            }}
            className="font-monospace"
          />
        </Form.Group>
        <Stack gap={1}>{urlParamElements}</Stack>
      </Stack>
      <Card>
        <Card.Header className="d-flex align-items-center gap-2">
          <div>Method</div>
          <div>
            <Badge bg="info" className="font-monospace">
              {method}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
            <ButtonGroup>
              <Button
                variant={method === 'GET' ? 'info' : 'secondary'}
                className={method === 'GET' ? undefined : 'text-dark'}
                onClick={() => setMethod('GET')}
              >
                GET
              </Button>
              <Button
                variant={method === 'POST' ? 'info' : 'secondary'}
                className={method === 'POST' ? undefined : 'text-dark'}
                onClick={() => setMethod('POST')}
              >
                POST
              </Button>
              <Button
                variant={method === 'PUT' ? 'info' : 'secondary'}
                className={method === 'PUT' ? undefined : 'text-dark'}
                onClick={() => setMethod('PUT')}
              >
                PUT
              </Button>
              <Button
                variant={method === 'DELETE' ? 'info' : 'secondary'}
                className={method === 'DELETE' ? undefined : 'text-dark'}
                onClick={() => setMethod('DELETE')}
              >
                DELETE
              </Button>
            </ButtonGroup>
            <CancelableFormControl
              type="text"
              placeholder="GET, DELETE, PUT, POST, etc."
              value={method || ''}
              className="font-monospace"
              style={{ width: 150 }}
              onChange={(e) => setMethod(e.target.value)}
              onCancel={() => setMethod('')}
            />
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Params</Card.Header>
        <Card.Body>
          <Stack gap={1}>
            <Stack gap={1}>{apiParamElements}</Stack>
            <div
              className={combineClassNames(
                'd-flex gap-1',
                params.length > 0 ? 'justify-content-end' : 'justify-content-center',
              )}
            >
              <IconButton
                icon={FaPlus}
                variant="primary"
                onClick={() => {
                  setParams([...params, { k: '', v: '' }]);
                }}
              >
                Add Param
              </IconButton>
              <Button
                variant="danger"
                onClick={() => {
                  setParams([]);
                }}
                disabled={params.length === 0}
              >
                Delete All
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end align-items-center gap-2">
        {errorMessage && <Badge bg="danger">Error</Badge>}
        {status >= 0 && <Badge bg={`${status}`.startsWith('2') ? 'success' : 'danger'}>{statusLabel}</Badge>}
        <Button variant="primary" onClick={handleSend} disabled={!accessToken}>
          Send
        </Button>
      </div>
      {errorMessage && (
        <div>
          <Alert variant="danger">
            <p className="mb-0">{errorMessage}</p>
          </Alert>
        </div>
      )}
      {successMessage && (
        <div>
          <Alert variant="success">
            <p className="mb-0">{successMessage}</p>
          </Alert>
        </div>
      )}
      {lastFetchMethod && lastFetchUrl && (
        <div>
          <Form.Label>Request Sent</Form.Label>
          <div className="d-flex align-items-center gap-1">
            <Badge bg="info" className="font-monospace">
              {lastFetchMethod}
            </Badge>
            <Form.Control type="text" value={lastFetchUrl} readOnly />
          </div>
        </div>
      )}
      {responseJson && (
        <div className="mt-3">
          <Form.Group controlId="structured-response-group">
            <Form.Label>Structured Response</Form.Label>
            <div className="text-break">
              <ReactJson src={responseJson} sortKeys displayDataTypes={false} />
            </div>
          </Form.Group>
        </div>
      )}
      {response && (
        <div className="mt-3">
          <Form.Group controlId="raw-response-group">
            <Form.Label>Raw Response</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Raw response will display here"
              rows={10}
              value={response}
              className="font-monospace"
              readOnly
            />
          </Form.Group>
        </div>
      )}
    </Stack>
  );
};
