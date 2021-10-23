/**
 * Gatsby gives plugins and site builders many APIs for controlling your site.
 *
 * Gatsby 3 APIs:
 *   - createPages
 *   - createPagesStatefully
 *   - createResolvers
 *   - createSchemaCustomization
 *   - onCreateBabelConfig
 *   - onCreateDevServer
 *   - onCreateNode
 *   - onCreatePage
 *   - onCreateWebpackConfig
 *   - onPostBootstrap
 *   - onPostBuild
 *   - onPreBootstrap
 *   - onPreBuild
 *   - onPreExtractQueries
 *   - onPreInit
 *   - pluginOptionsSchema
 *   - preprocessSource
 *   - resolvableExtensions
 *   - setFieldsOnGraphQLNodeType
 *   - sourceNodes
 *   - unstable_shouldOnCreateNode
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import path from 'path';
import readYaml from 'read-yaml';
import sw from 'stopword';

/** Load settings YAML */
const settings = readYaml.sync(`${__dirname}/src/settings/settings.yml`);

export const onCreateNode = ({ node, actions }, pluginOptions) => {
  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const { createNodeField } = actions;
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    // Use frontmatter slug as-is if provided, otherwise slugify the title
    let slugValue = node.frontmatter.slug;
    if (!slugValue) {
      slugValue = slugify(node.frontmatter.title);
    }
    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Slug for the content
      value: slugValue,
    });
  }
};

export const createPages = ({ graphql, actions }, pluginOptions) => {
  // Destructure actions object for the functions we need
  const { createRedirect, createPage } = actions;

  // Create redirects configured in settings.yml
  // See: https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect
  const redirects = Array.isArray(settings.redirects) ? settings.redirects : [];
  redirects.forEach((redirect) => createRedirect(redirect));

  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const mdxQueryPromise = graphql(`
    query NodeMDXQuery {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            partial
            private
          }
        }
      }
      settingsYaml {
        privatePagePathPrefix
      }
    }
  `).then((result) => {
    // This is some boilerplate to handle errors
    if (result.errors) {
      console.error(result.errors);
      Promise.reject(result.errors);
    }

    const privatePagePathPrefix = result.data.settingsYaml.privatePagePathPrefix;

    const mdxNodes = result.data.allMdx.nodes;

    const mdxPageTemplate = path.resolve(`${__dirname}/src/components/page-templates/js/MdxPageTemplate.js`);

    // We'll call `createPage` for each result, creating each page.
    mdxNodes.forEach((node) => {
      // Don't create pages for partials
      if (!node.frontmatter.partial && node.fields.slug) {
        const pageConfig = {
          // We'll use the slug we created in onCreateNode, in addition to a private path prefix if private
          path: `${node.frontmatter.private ? `${privatePagePathPrefix}/` : ''}${node.fields.slug}`,
          // This component will wrap our MDX content
          component: mdxPageTemplate,
          // Data passed to context is available in props, and in page queries as GraphQL variables.
          context: {
            slug: node.fields.slug,
          },
        };

        // https://www.gatsbyjs.org/docs/actions/#createPage
        createPage(pageConfig);
      }
    });
  });

  // On running multiple queries:
  // https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
  return Promise.all([mdxQueryPromise]);
};

const slugify = (text) => {
  const createSlug = (rawText) => {
    return (
      rawText
        .toLowerCase()
        // Remove apostrophes
        .replace(/['’]/gi, '')
        // Replace all non-alphanumerics with dashes
        .replace(/\W/gi, '-')
        // Remove dashes at start or end
        .replace(/(^-+)|(-+$)/gi, '')
        // Remove duplicate dashes
        .replace(/-+/gi, '-')
    );
  };
  // Remove all stop words, make resulting array lowercase and distinct, join with dashes, then create the slug
  let slug = createSlug(
    [...new Set(sw.removeStopwords(text.split(/[!?:;,."*()\s]/)).map((word) => word.toLowerCase()))].join('-'),
  );
  // If the slug is empty after doing so, simply slugify the text without removing stop words
  if (slug.length === 0) {
    slug = createSlug(text);
  }
  // If even THEN the slug is still empty, just make it lowercase and alphanumeric with dashes
  if (slug.length === 0) {
    slug = text
      .toLowerCase()
      // Replace all non-alphanumerics with dashes
      .replace(/\W/gi, '-');
  }
  return slug;
};

// == Webpack Exclusions (for unchecked window and IndexedDB usage) ==
// export const onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html') {
//     // Test for library name(s) using regex and exclude them
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /library-name-regex-goes-here/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };
