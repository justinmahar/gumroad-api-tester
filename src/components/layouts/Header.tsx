import { Link } from 'gatsby';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Settings, { useSettings } from '../../settings/useSettings';
import { Fork, Star } from 'react-github-buttons';

export interface HeaderProps {}

export default function Header(_props: HeaderProps): JSX.Element {
  const settings: Settings = useSettings();
  return (
    <Navbar expand="md" sticky="top" bg="light" className="shadow-sm navbar-light">
      <Container>
        <Link to="/" className={'navbar-brand'}>
          <div className="d-flex flex-row">
            <div className="d-flex align-items-center me-2">
              <img
                src={`${settings.data.site.siteMetadata.siteUrl}${settings.data.site.siteMetadata.siteIcon}`}
                alt={settings.data.site.siteMetadata.siteIconAlt}
                width={30}
                height={30}
                className="d-inline-block align-top"
              />
            </div>
            <div className="font-weight-bold">{settings.data.site.siteMetadata.siteName}</div>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto"></Nav>
          <Nav className="d-flex align-items-center">
            <a href="https://github.com/justinmahar/gumroad-api-tester-webapp/fork">
              <Fork owner="justinmahar" repo="gumroad-api-tester-webapp" />
            </a>
            <a href="https://github.com/justinmahar/gumroad-api-tester-webapp/stargazers">
              <Star owner="justinmahar" repo="gumroad-api-tester-webapp" />
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
