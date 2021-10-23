import { Link } from 'gatsby';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';

interface NotFoundProps {
  data: any;
  location: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  const contentTitle = `404 Not Found`;
  const description = `Sorry, we couldn't find what you were looking for.`;

  return (
    <Layout>
      <Head contentTitle={contentTitle} seo={{ description: description }} />
      <Body>
        <Container className="text-center">
          <NotFoundTitleDiv>404</NotFoundTitleDiv>
          <h1>Well, shoot.</h1>
          <br />
          <h5>We couldn't find what you were looking for.</h5>
          <br />
          <Link to="/">
            <Button variant="secondary">&laquo; Home</Button>
          </Link>
        </Container>
      </Body>
    </Layout>
  );
}

const NotFoundTitleDiv = styled.div`
  font-size: 600%;
`;

// Page query goes here
