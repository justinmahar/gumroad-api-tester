import { graphql, Link, useStaticQuery } from 'gatsby';
import moment from 'moment';
import React from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';
import MdxContent, { MdxNode } from '../data/MdxContent';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const postsData = useStaticQuery(graphql`
    query IndexQuery {
      posts: allMdx(
        filter: { frontmatter: { partial: { ne: true }, private: { ne: true }, group: { eq: "posts" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);

  const pageTitle = `{siteName}`;
  const description = `{siteDescription}`;

  const postNodes: MdxNode[] = postsData?.posts?.nodes ? postsData.posts.nodes : [];

  const postElements = postNodes.map((node: MdxNode) => {
    return (
      <div className="mb-4" key={node.id}>
        <MdxPostCard mdxNode={node} />
      </div>
    );
  });

  return (
    <Layout>
      <Head seo={{ title: pageTitle, description: description }} />
      <Body>
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Posts</h2>
              {postElements}
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}

interface MdxPostCardProps {
  mdxNode: MdxNode;
}

const MdxPostCard = (props: MdxPostCardProps) => {
  const mdxContent: MdxContent = new MdxContent(props.mdxNode);
  const date = moment(mdxContent.node.frontmatter.date);
  const dateString = date.utc().format('MMMM Do, YYYY');
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <h4>
          <Link to={mdxContent.node.fields.slug}>{mdxContent.node.frontmatter.title}</Link>
        </h4>
        <div>
          <Badge>{dateString}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          {mdxContent.getExcerpt()}{' '}
          <Link to={mdxContent.node.fields.slug}>
            <Button size="sm" variant="link">
              Read more &raquo;
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};
