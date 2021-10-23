import React from 'react';
import styled from 'styled-components';

export interface BodyProps {
  children?: React.ReactNode;
}
export default function Body(props: BodyProps): JSX.Element {
  return <BodyDiv>{props.children}</BodyDiv>;
}

const BodyDiv = styled.div`
  padding-top: 3em;
  padding-bottom: 4em;
`;
