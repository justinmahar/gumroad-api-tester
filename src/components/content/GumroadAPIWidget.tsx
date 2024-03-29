import { Modal } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineApi } from 'react-icons/ai';
import { AiOutlineKey } from 'react-icons/ai';
import { FaPaste } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { ImArrowRight } from 'react-icons/im';
import React from 'react';
import { Accordion, Alert, Badge, Button, ButtonGroup, Form, Stack } from 'react-bootstrap';
import { useLocalStorageBoolean, useLocalStorageObject, useLocalStorageString } from 'react-use-window-localstorage';
import styled from 'styled-components';
import { combineClassNames } from '../component-utils';
import { CancelableFormControl } from '../widgets/CancelableFormControl';
import { ContextualResults } from './ContextualResults';
import { IconButton } from './IconButton';
import { Param, RESTEndpoint, v2Api } from './v2api';
import { JSONTree } from 'react-json-tree';

interface Props {}

const API_ROOT_DEFAULT = 'https://api.gumroad.com/v2';

export const GumroadAPIWidget = (props: Props) => {
  const [apiRoot, setAPIRoot] = useLocalStorageString('gumroadAPIRoot', API_ROOT_DEFAULT);
  const [accessToken, setAccessToken] = React.useState('');
  const [endpointUrl, setEndpointUrl] = useLocalStorageString('gumroadEndpointUrl', '');
  const [method, setMethod] = useLocalStorageString('gumroadMethod', 'GET');
  const [urlParams, setUrlParams] = useLocalStorageObject('gumroadUrlParams', []);
  const [params, setParams] = useLocalStorageObject('gumroadParams', []);
  const [status, setStatus] = React.useState(-1);
  const [response, setResponse] = React.useState('');
  const [fetchTime, setFetchTime] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>('');
  const [wasSuccessful, setWasSuccessful] = React.useState<boolean | undefined>();
  const [selectedEndpointIndex, setSelectedEndpointIndex] = React.useState<number>(-1);
  const selectedEndpoint: RESTEndpoint | undefined =
    selectedEndpointIndex >= 0 && selectedEndpointIndex < v2Api.length ? v2Api[selectedEndpointIndex] : undefined;
  const [showParams, setShowParams] = useLocalStorageBoolean('showParams', false);

  const [lastFetchMethod, setLastFetchMethod] = React.useState('');
  const [lastFetchUrl, setLastFetchUrl] = React.useState('');

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = React.useState(false);

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
        finalizedEndpointUrl = finalizedEndpointUrl.replace(`:${urlParam.k}`, encodeURIComponent(urlParam.v));
      });
      const fetchUrl =
        apiRoot.replace(/\/$/, '') +
        (finalizedEndpointUrl.startsWith('/') ? '' : '/') +
        finalizedEndpointUrl +
        '?' +
        queryParams
          .filter((param) => param.k.length > 0 && param.v.length > 0)
          .map((param) => `${encodeURIComponent(param.k)}=${encodeURIComponent(param.v)}`)
          .join('&');
      console.log(fetchUrl);
      const paramMap: Record<string, string> = {};
      params.forEach((param: Param) => {
        if (param.k.length > 0 && param.v.length > 0) {
          paramMap[param.k] = param.v;
        }
      });
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
          let newWasSuccessful = undefined;
          try {
            const json = JSON.parse(data);
            if (typeof json.success !== 'undefined' && !json.success && typeof json.message === 'string') {
              newErrorMessage = json.message;
              newWasSuccessful = false;
            } else if (typeof json.success !== 'undefined' && json.success) {
              newWasSuccessful = true;
              if (typeof json.message === 'string') {
                newSuccessMessage = json.message;
              } else {
                newSuccessMessage = 'Your request was successful.';
              }
            } else if (typeof json.error === 'string') {
              newErrorMessage = json.error;
              newWasSuccessful = false;
            }
          } catch (e) {}
          setErrorMessage(newErrorMessage);
          setSuccessMessage(newSuccessMessage);
          setWasSuccessful(newWasSuccessful);
        })
        .catch((e) => {
          console.error(e);
          setErrorMessage(`${e}`);
        })
        .finally(() => {
          setLastFetchMethod(method);
          setLastFetchUrl(fetchUrl);
          setFetchTime(new Date().getTime());
        });
    }
  };

  const handleReset = () => {
    setAPIRoot(API_ROOT_DEFAULT);
    setAccessToken('');
    setEndpointUrl('');
    setMethod('GET');
    setUrlParams([]);
    setParams([]);
    setStatus(-1);
    setResponse('');
    setFetchTime(0);
    setErrorMessage('');
    setSuccessMessage('');
    setWasSuccessful(undefined);
    setSelectedEndpointIndex(-1);
    setLastFetchMethod('');
    setLastFetchUrl('');
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
      setShowParams(paramArray.length > 0);
    }
  }, [endpointUrl, method]);

  const handlePasteAccessToken = () => {
    const queryPermissions: any = { name: 'clipboard-read' };
    navigator.permissions.query(queryPermissions).then((result) => {
      // If permission to read the clipboard is granted or if the user will
      // be prompted to allow it, we proceed.
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard
          .readText()
          .then((text) => {
            setAccessToken(text);
          })
          .catch((e) => console.error(e));
      }
    });
  };

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
          required
          inputStyle={{ background: urlParams[index].v.length === 0 ? 'rgb(255, 230, 230)' : 'rgb(240, 240, 255)' }}
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
          inputStyle={
            params[index].k.length > 0 && params[index].v.length > 0
              ? { background: 'rgb(240, 240, 255)' }
              : params[index].k.length > 0 && params[index].v.length === 0
              ? { background: 'rgb(255, 255, 240)' }
              : undefined
          }
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
          inputStyle={
            params[index].k.length > 0 && params[index].v.length > 0
              ? { background: 'rgb(240, 240, 255)' }
              : params[index].k.length > 0 && params[index].v.length === 0
              ? { background: 'rgb(255, 255, 240)' }
              : undefined
          }
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

  const sendButtonEnabled = !!method;

  const showEmptyParamsAlert = Array.isArray(params) && params.length > 0;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (method === 'DELETE') {
          setShowConfirmDeleteModal(true);
        } else {
          handleSend();
        }
      }}
    >
      <Modal centered show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold fs-5">Are you sure you want to delete the resource?</p>
          <p>
            Endpoint: <code className="px-1 border border-light rounded-2">{endpointUrl}</code>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setShowConfirmDeleteModal(false);
              handleSend();
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
            <Form.Label className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center">
                <AiOutlineKey className="fs-4 text-warning" />
              </div>
              <div>Access Token</div>
              {!accessToken && (
                <div>
                  <a
                    href="https://app.gumroad.com/settings/advanced#application-form"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      icon={FaExternalLinkAlt}
                      variant="link"
                      size="sm"
                      end
                      className="py-0"
                      style={{ fontSize: '80%' }}
                      iconProps={{ style: { fontSize: '80%' } }}
                    >
                      Get One
                    </IconButton>
                  </a>
                </div>
              )}
            </Form.Label>
            <div className="d-flex gap-1 align-items-center position-relative">
              <ImArrowRight
                className={combineClassNames('position-absolute text-info', !!accessToken ? 'd-none' : undefined)}
                style={{ left: -30 }}
              />
              <Stack direction="horizontal" gap={1} className="w-100">
                <CancelableFormControl
                  type="text"
                  placeholder="Paste access token here"
                  value={accessToken || ''}
                  required
                  onChange={(e) => {
                    setAccessToken(e.target.value);
                  }}
                  onCancel={() => {
                    setAccessToken('');
                  }}
                  autoComplete="off"
                />
                <IconButton icon={FaPaste} variant="secondary" onClick={handlePasteAccessToken} />
              </Stack>
            </div>
          </Form.Group>
        </div>
        <div className="mb-2">
          <Form.Group controlId="selected-endpoint">
            <Form.Label className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center">
                <AiOutlineApi className="fs-4 text-info" />
              </div>
              <div>Select An Endpoint</div>
            </Form.Label>
            <div className="d-flex gap-1 align-items-center position-relative">
              <ImArrowRight
                className={combineClassNames(
                  'position-absolute text-info',
                  !!accessToken && selectedEndpointIndex < 0 ? undefined : 'd-none',
                )}
                style={{ left: -30 }}
              />
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
            </div>
            {selectedEndpoint && (
              <Alert variant="info" className="mt-1 py-1 mb-0">
                {selectedEndpoint.description}
              </Alert>
            )}
          </Form.Group>
        </div>
        <Card>
          <Card.Header>Call Configuration</Card.Header>
          <Card.Body>
            <Stack gap={2}>
              <Stack gap={1}>
                <Form.Group controlId="endpoint-url">
                  <Form.Label>Endpoint URL</Form.Label>
                  <CancelableFormControl
                    type="text"
                    placeholder="API endpoint e.g. /products"
                    value={endpointUrl || ''}
                    required
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
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <Stack direction="horizontal" gap={2}>
                      <div className="text-dark">Method</div>
                      <div>
                        <Badge bg="info" className="font-monospace">
                          {method}
                        </Badge>
                      </div>
                    </Stack>
                  </Accordion.Header>
                  <Accordion.Body>
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
                        placeholder="Enter method"
                        value={method || ''}
                        className="font-monospace"
                        style={{ width: 150 }}
                        required
                        onChange={(e) => setMethod(e.target.value)}
                        onCancel={() => setMethod('')}
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion activeKey={showParams ? '0' : 'none'}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={() => setShowParams(!showParams)}>
                    <Stack direction="horizontal" gap={2}>
                      <div className="text-dark">Params</div>
                    </Stack>
                  </Accordion.Header>
                  <Accordion.Body>
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
                        {params.length > 0 && (
                          <Button
                            variant="danger"
                            onClick={() => {
                              setParams([]);
                            }}
                          >
                            Delete All
                          </Button>
                        )}
                      </div>
                      {showEmptyParamsAlert && (
                        <Alert variant="info" className="py-1 my-2 small">
                          Refer to the{' '}
                          <a href="https://app.gumroad.com/api" target="_blank" rel="noopener noreferrer">
                            docs <FaExternalLinkAlt style={{ fontSize: '80%' }} />
                          </a>{' '}
                          for param specifications. Some params are optional. Empty params will not be sent.
                        </Alert>
                      )}
                    </Stack>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Stack>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end align-items-center gap-2">
          {typeof wasSuccessful === 'boolean' && !wasSuccessful && <Badge bg="danger">Error</Badge>}
          {typeof wasSuccessful === 'boolean' && wasSuccessful && <Badge bg="success">Success</Badge>}
          {status >= 0 && <Badge bg={`${status}`.startsWith('2') ? 'info' : 'danger'}>{statusLabel}</Badge>}
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" type="submit" disabled={!sendButtonEnabled}>
            Send
          </Button>
        </div>
        {errorMessage && (
          <FadeInQuick key={`error-alert-${fetchTime}`}>
            <Alert variant="danger">
              <p className="mb-0">{errorMessage}</p>
            </Alert>
          </FadeInQuick>
        )}
        {successMessage && (
          <FadeInQuick key={`success-alert-${fetchTime}`}>
            <Alert variant="success">
              <p className="mb-0">{successMessage}</p>
            </Alert>
          </FadeInQuick>
        )}
        {lastFetchMethod && lastFetchUrl && (
          <FadeInQuick key={`request-${fetchTime}`}>
            <Form.Label>Request Sent</Form.Label>
            <div className="d-flex align-items-center gap-1">
              <Badge bg="info" className="font-monospace">
                {lastFetchMethod}
              </Badge>
              <Form.Control type="text" value={lastFetchUrl} readOnly />
            </div>
          </FadeInQuick>
        )}
        {responseJson && (
          <FadeInQuick key={`contextual-results-${fetchTime}`}>
            <ContextualResults json={responseJson} className="mt-3" />
          </FadeInQuick>
        )}
        {responseJson && (
          <FadeInQuick key={`structured-response-${fetchTime}`} className="mt-3">
            <Form.Group controlId="structured-response-group">
              <Form.Label>Structured Response</Form.Label>
              <div className="text-break">
                <JSONTree
                  data={responseJson}
                  theme={{
                    scheme: 'bright',
                    author: 'chris kempson (http://chriskempson.com)',
                    base00: '#000000',
                    base01: '#303030',
                    base02: '#505050',
                    base03: '#b0b0b0',
                    base04: '#d0d0d0',
                    base05: '#e0e0e0',
                    base06: '#f5f5f5',
                    base07: '#ffffff',
                    base08: '#fb0120',
                    base09: '#fc6d24',
                    base0A: '#fda331',
                    base0B: '#a1c659',
                    base0C: '#76c7b7',
                    base0D: '#6fb3d2',
                    base0E: '#d381c3',
                    base0F: '#be643c',
                  }}
                  invertTheme
                />
              </div>
            </Form.Group>
          </FadeInQuick>
        )}
        {response && (
          <FadeInQuick key={`raw-response-${fetchTime}`} className="mt-3">
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
          </FadeInQuick>
        )}
      </Stack>
    </Form>
  );
};

const FadeInQuick = styled.div`
  & {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.381s;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
