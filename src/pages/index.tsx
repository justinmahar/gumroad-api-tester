import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { GumroadAPIWidget } from '../components/content/GumroadAPIWidget';
import { IconButton } from '../components/content/IconButton';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import { Alert } from 'react-bootstrap';
import { useLocalStorageBoolean } from 'react-use-window-localstorage';
import { FaRegQuestionCircle } from '@react-icons/all-files/fa/FaRegQuestionCircle';
import { v2Api } from '../components/content/v2api';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const pageTitle = `{siteName}`;
  const description = `{siteDescription}`;

  const [showInformationModal, setShowInformationModal, showInformationModalLoading] = useLocalStorageBoolean(
    'showInformationModal',
    true,
  );
  const handleCloseInformationModal = () => setShowInformationModal(false);

  return (
    <Layout>
      <Head seo={{ title: pageTitle, description: description }}>
        <script src="https://gumroad.com/js/gumroad.js"></script>
      </Head>
      <Body>
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
                  <p>
                    This project is{' '}
                    <a href="https://github.com/justinmahar/gumroad-api-tester-webapp">open sourced on GitHub</a> under
                    the <a href="https://github.com/justinmahar/gumroad-api-tester-webapp#mit-license">MIT License</a>.
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
      </Body>
    </Layout>
  );
}
