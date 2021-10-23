import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GumroadAPIWidget } from '../components/content/GumroadAPIWidget';
import { IconButton } from '../components/content/IconButton';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import { Alert } from 'react-bootstrap';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const pageTitle = `{siteName}`;
  const description = `{siteDescription}`;

  const [showInformationModal, setShowInformationModal] = React.useState(true);
  const handleCloseInformationModal = () => setShowInformationModal(false);

  return (
    <Layout>
      <Head seo={{ title: pageTitle, description: description }} />
      <Body>
        <Container>
          <Row className="mb-5">
            <Col md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }} xl={{ offset: 3, span: 6 }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4>Gumroad API Tester</h4>
                <div>
                  <a href="https://app.gumroad.com/api" target="_blank" rel="noopener noreferrer">
                    <IconButton variant="secondary" size="sm" icon={FaExternalLinkAlt} end>
                      Gumroad API Documentation
                    </IconButton>
                  </a>
                </div>
              </div>
              {showInformationModal && (
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
