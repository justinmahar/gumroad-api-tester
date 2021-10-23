import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';

interface Props {}

export default function NewPage(props: Props): JSX.Element {
  return (
    <Layout>
      <Head contentTitle="My Page Title" seo={{ description: 'A description of this page' }} />
      <Body>
        <Container>
          <Row>
            <Col>Page content goes here.</Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}
