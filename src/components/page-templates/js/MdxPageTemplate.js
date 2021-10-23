import { graphql } from 'gatsby';
import React from 'react';
import TsxMdxPageTemplate from '../MdxPageTemplate';

// This component is a wrapper for the TSX layout component of the
// same name.
// It needs to be a JS file because it's loaded directly by the MDX
// plug-in in gatsby-node.js.

function MdxPageTemplate(props) {
  return <TsxMdxPageTemplate {...props} />;
}

export default MdxPageTemplate;

export const query = graphql`
  query MdxPageComponentQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...mdxContent
    }
  }
`;
