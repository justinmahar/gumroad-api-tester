import moment from 'moment';
import React from 'react';
import { Container } from 'react-bootstrap';
import MdxContent from '../../data/MdxContent';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../settings/useSettings';
import { MdxNodeRenderer } from '../content/MdxNodeRenderer';
import Body from '../layouts/Body';
import Layout from '../layouts/Layout';
import MdxHead from './MdxHead';

export interface MdxPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MdxPageTemplate(props: MdxPageTemplateProps): JSX.Element {
  const mdxContent: MdxContent = new MdxContent(props.data.mdx);
  const settings: Settings = useSettings();

  const templateTagRenderer: TemplateTagRenderer = mdxContent
    .getTemplateTagRenderer()
    .combineWith(settings.getTemplateTagRenderer());
  const contentTitle = templateTagRenderer.render(mdxContent.node.frontmatter.title);

  // Set to true to show the date
  const showDate = false;
  let dateString = '';
  if (mdxContent.node.frontmatter.date) {
    const date = moment(mdxContent.node.frontmatter.date);
    dateString = date.utc().format('MMMM Do, YYYY');
  }

  return (
    <Layout>
      <MdxHead mdxContent={mdxContent} />
      <Body>
        <Container>
          <h1 className="mb-4">{contentTitle}</h1>
          {showDate && <p className="text-muted pl-1 mb-4 font-italic">{dateString}</p>}
          <MdxNodeRenderer mdxNode={mdxContent.node} />
        </Container>
      </Body>
    </Layout>
  );
}

// Page query is located in js/MdxPageTemplate.js
