import React from 'react';
import MdxContent from '../../data/MdxContent';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Head from '../layouts/Head';

export interface MdxHeadProps {
  mdxContent: MdxContent;
  children?: React.ReactNode;
}

export default function MdxHead(props: MdxHeadProps): JSX.Element {
  const mdxContent: MdxContent = props.mdxContent;

  const seoDescription: string | undefined =
    mdxContent.node.frontmatter.seo?.description && mdxContent.node.frontmatter.seo.description !== 'none'
      ? mdxContent.node.frontmatter.seo.description
      : mdxContent.getExcerpt();
  const seoImageUrl: string | undefined =
    mdxContent.node.frontmatter.seo?.imageUrl && mdxContent.node.frontmatter.seo.imageUrl !== 'none'
      ? mdxContent.node.frontmatter.seo.imageUrl
      : undefined;
  const seoImageWidth: number | undefined = mdxContent.node.frontmatter.seo?.imageWidth;
  const seoImageHeight: number | undefined = mdxContent.node.frontmatter.seo?.imageHeight;
  const seoImageAlt: string | undefined =
    mdxContent.node.frontmatter.seo?.imageAlt && mdxContent.node.frontmatter.seo.imageAlt !== 'none'
      ? mdxContent.node.frontmatter.seo.imageAlt
      : undefined;

  const mdxTemplateTagRenderer: TemplateTagRenderer = mdxContent.getTemplateTagRenderer();

  return (
    <Head
      seo={{
        description: seoDescription,
        imageUrl: seoImageUrl,
        imageWidth: seoImageWidth,
        imageHeight: seoImageHeight,
        imageAlt: seoImageAlt,
      }}
      templateTagRenderer={mdxTemplateTagRenderer}
    >
      {props.children}
    </Head>
  );
}
