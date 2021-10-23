import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MdxPartial } from '../components/content/MdxPartial';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';

interface ContactProps {
  data: any;
}

export default function Contact(props: ContactProps): JSX.Element {
  const contentTitle = `Contact`;
  const description = `If you'd like to reach out, just shoot me an email.`;

  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  return (
    <Layout>
      <Head contentTitle={contentTitle} seo={{ description: description }} />
      <Body>
        <Container>
          <Row>
            <Col>
              <h1 className="mb-4">{contentTitle}</h1>
              <MdxPartial slug="contact" />
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Email: ${email}\nSubject: ${subject}\nMessage: ${message}`);
                }}
              >
                <Form.Group controlId="form-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="form-subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="form-message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}
