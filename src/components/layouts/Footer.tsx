import { Link } from 'gatsby';
import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { BuildStatusBadge } from 'react-build-status-badge';
import styled from 'styled-components';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../settings/useSettings';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';

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
              <div className="text-center text-white mt-6 mb-2">
                Copyright &copy; {templateTagRenderer.render('{year}')}{' '}
                <a href="https://github.com/justinmahar/" className="text-reset">
                  Justin Mahar
                </a>
                .{' '}
                <a href="https://github.com/justinmahar/gumroad-api-tester-webapp#mit-license" className="text-reset">
                  MIT License
                </a>
                . Logo by{' '}
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
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <Nav>
                  <a
                    className="nav-link text-white fw-bold fs-3"
                    href="https://github.com/justinmahar/gumroad-api-tester-webapp"
                  >
                    <FaGithub />
                  </a>
                </Nav>
                <Nav className="d-flex flex-wrap gap-2 justify-content-center">
                  <div role="button">
                    <a href="https://badge.fury.io/js/gumroad-api-tester-webapp">
                      <img src="https://badge.fury.io/js/gumroad-api-tester-webapp.svg" alt="npm Version" />
                    </a>
                  </div>
                  <div role="button">
                    <BuildStatusBadge
                      href="https://github.com/justinmahar/gumroad-api-tester-webapp/actions?query=workflow%3ADeploy"
                      src="https://github.com/justinmahar/gumroad-api-tester-webapp/workflows/Deploy/badge.svg"
                      reloadDisabled
                    />
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
  padding-top: 3em;
  padding-bottom: 3em;
  background-color: #202020;
`;
