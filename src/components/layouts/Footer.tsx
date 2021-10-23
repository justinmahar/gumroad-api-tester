import { Link } from 'gatsby';
import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { BuildStatusBadge } from 'react-build-status-badge';
import styled from 'styled-components';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../settings/useSettings';

export interface FooterProps {}

export default function Footer(props: FooterProps): JSX.Element {
  const settings: Settings = useSettings();
  const templateTagRenderer: TemplateTagRenderer = settings.getTemplateTagRenderer();
  return (
    <FooterDiv>
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-center">
              <div className="text-center text-white mt-6 mb-4">
                Copyright &copy; {templateTagRenderer.render('{year}')}, {templateTagRenderer.render('{siteName}')}.
                Logo by{' '}
                <a
                  href="https://twemoji.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-weight-bold"
                >
                  Twemoji
                </a>
                .
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <Nav>
                  <Link className="nav-link text-white font-weight-bold" role="button" to="/terms">
                    Terms
                  </Link>
                </Nav>
                <Nav>
                  <Link className="nav-link text-white font-weight-bold" role="button" to="/privacy">
                    Privacy
                  </Link>
                </Nav>
                <Nav>
                  <a className="nav-link text-white font-weight-bold" role="button" href="/sitemap.xml">
                    Sitemap
                  </a>
                </Nav>
                <Nav>
                  <div className="nav-link" role="button">
                    <BuildStatusBadge>
                      [![Netlify
                      Status](https://api.netlify.com/api/v1/badges/21f52584-91b7-4198-8ac7-827357fef04f/deploy-status)](https://app.netlify.com/sites/gatsby-starter-mdx-launchpad/deploys)
                    </BuildStatusBadge>
                  </div>
                </Nav>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </FooterDiv>
  );
}

const FooterDiv = styled.div`
  padding-top: 8em;
  padding-bottom: 8em;
  background-color: #202020;
`;
