import { graphql } from 'gatsby';
import { TemplateTagRenderer } from './TemplateTagRenderer';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
  {
    allMdx {
      nodes {
        ...mdxContent
      }
    }
  }
  ```
 */
export const mdxFragmentQuery = graphql`
  fragment mdxContent on Mdx {
    id
    fields {
      slug
    }
    timeToRead
    excerpt
    # IMPORTANT: Be sure to add new frontmatter specs to mdx/defaults.mdx
    frontmatter {
      title
      slug
      excerpt
      seo {
        title
        description
        imageUrl
        imageWidth
        imageHeight
        imageAlt
      }
      partial
      private
      group
      category
      date
    }
    body
    fileAbsolutePath
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
export type MdxNode = {
  id: string;
  fields: {
    slug: string;
  };
  timeToRead: string;
  excerpt: string;
  // IMPORTANT: Be sure to add new frontmatter specs to mdx/defaults.mdx
  frontmatter: {
    title: string;
    slug?: string;
    excerpt?: string;
    seo?: {
      title?: string;
      description?: string;
      imageUrl?: string;
      imageWidth?: number;
      imageHeight?: number;
      imageAlt?: string;
    };
    partial?: string;
    private?: string;
    group?: string;
    category?: string;
    date?: Date;
  };
  body: string;
  fileAbsolutePath: string;
};

// === === === === === === === === ===

/**
 * `MdxContent` is MDX content that includes frontmatter and commonly used fields.
 * Use the `...mdxContent` graphql fragment to get all fields needed
 * to construct one. Then pass each MDX node into the constructor.
 */
export default class MdxContent {
  constructor(public node: MdxNode) {}

  public getExcerpt(): string {
    return this.node.frontmatter.excerpt && this.node.frontmatter.excerpt !== 'none'
      ? this.node.frontmatter.excerpt
      : // Use automatic MDX excerpt.
        // We are removing the space that's added after components, before punctuation.
        // In most cases, we don't want that space there.
        this.node.excerpt.replace(/(\w) ([,.!?):;])/g, '$1$2');
  }

  public getTemplateTagRenderer(): TemplateTagRenderer {
    return new TemplateTagRenderer({
      contentTitle: this.node.frontmatter.title,
      contentExcerpt: this.getExcerpt(),
      contentSeoTitle: this.node.frontmatter.seo?.title ? this.node.frontmatter.seo.title : this.node.frontmatter.title,
      contentSeoDescription: this.node.frontmatter.seo?.description
        ? this.node.frontmatter.seo.description
        : this.getExcerpt(),
    });
  }
}
