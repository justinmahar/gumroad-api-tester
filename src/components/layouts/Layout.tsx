import React from 'react';
import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
