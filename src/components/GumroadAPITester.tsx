import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/zephyr/bootstrap.min.css';
import React from 'react';
import { Alert, Col, Container, Row, Stack } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaExternalLinkAlt, FaRegQuestionCircle } from 'react-icons/fa';
import { useLocalStorageBoolean } from 'react-use-window-localstorage';
import { GumroadAPIWidget } from './content/GumroadAPIWidget';
import { IconButton } from './content/IconButton';

interface IndexProps {
  data: any;
}

let apiScriptLoaded = false;

export default function GumroadAPITester(props: IndexProps): JSX.Element {
  const [showInformationModal, setShowInformationModal, showInformationModalLoading] = useLocalStorageBoolean(
    'showInformationModal',
    true,
  );
  const handleCloseInformationModal = () => setShowInformationModal(false);

  const [shouldLoadScript, setShouldLoadScript] = React.useState(false);

  React.useEffect(() => {
    if (!apiScriptLoaded) {
      setShouldLoadScript(true);
      apiScriptLoaded = true;
    }
  }, []);

  return (
    <div>
      {shouldLoadScript && (
        <Helmet>
          <script src="https://gumroad.com/js/gumroad.js" />
        </Helmet>
      )}
      <div className="py-3">
        <Container>
          <Row className="mb-5">
            <Col md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }} xl={{ offset: 3, span: 6 }}>
              <Stack direction="horizontal" className="flex-wrap justify-content-between mb-3" gap={2}>
                <Stack direction="horizontal" gap={2}>
                  <h4 className="p-0 m-0">Gumroad API Tester</h4>
                  {!showInformationModal && (
                    <IconButton
                      icon={FaRegQuestionCircle}
                      variant="link"
                      className="text-info"
                      size="sm"
                      onClick={() => setShowInformationModal(true)}
                    />
                  )}
                </Stack>
                <div>
                  <a href="https://app.gumroad.com/api" target="_blank" rel="noopener noreferrer">
                    <IconButton variant="secondary" size="sm" icon={FaExternalLinkAlt} end>
                      API Docs
                    </IconButton>
                  </a>
                </div>
              </Stack>
              {!showInformationModalLoading && showInformationModal && (
                <Alert variant="info" dismissible className="mb-3" onClose={handleCloseInformationModal}>
                  <h6>Welcome!</h6>
                  <p>
                    <a href="https://gumroad.com/">Gumroad</a> is a platform that allows you to sell digital products
                    such as books, memberships, courses, and more.
                  </p>
                  <p>
                    Below you can test out the <a href="https://app.gumroad.com/api">Gumroad API</a> using your{' '}
                    <a href="https://app.gumroad.com/settings/advanced#application-form">access token</a>. This tool can
                    also be helpful if you need to make changes not supported via the website, such as adding resource
                    subscriptions.
                  </p>
                  <p>
                    All v2 endpoints are available for quick selection, or you can manually enter things if you'd like.
                    Some parameters are optional&mdash;be sure to reference the{' '}
                    <a href="https://app.gumroad.com/api">API docs</a> when in doubt.
                  </p>
                  <p>
                    When retrieving products, buy buttons are shown so that you can test product purchases right from
                    within this testing tool.
                  </p>
                  <p>
                    Try the <code className="px-1 border border-light rounded-2">GET: /user</code> endpoint for a quick
                    test of your access token.
                  </p>
                  <p>🎉 Happy selling!</p>
                </Alert>
              )}
              <GumroadAPIWidget />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="text-center text-muted">
                If this project helped you, please{' '}
                <a href="https://github.com/justinmahar/gumroad-api-tester-webapp">Star it on GitHub</a> so others can
                find it. :)
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
