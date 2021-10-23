<h2 align="center">
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad">
    <img alt="Gatsby Starter: MDX Launchpad" src="https://github.com/justinmahar/gatsby-starter-mdx-launchpad/raw/master/static/media/site-icon.png" width="30" />
  </a>
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad">
    Gatsby Starter: MDX Launchpad
  </a>
</h2>
<h3 align="center">
  Lightweight Gatsby starter supporting MDX and TypeScript. Start lightyears ahead!
</h3>
<p align="center">
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad/generate">
    <img src="https://img.shields.io/badge/GitHub-Use%20this%20template-brightgreen"/>
  </a>
  <a href="https://app.netlify.com/sites/gatsby-starter-mdx-launchpad/deploys">
    <img src="https://api.netlify.com/api/v1/badges/21f52584-91b7-4198-8ac7-827357fef04f/deploy-status" alt="Deploy Status"/>
  </a>
</p>

👁️ **[Live Demo](https://gatsby-starter-mdx-launchpad.netlify.app/)**

## Overview

The main goal of this [Gatsby starter](https://www.gatsbyjs.com/starters/) is to take care of several boilerplate pain points that get in the way of starting a new project, while still being flexible enough to be used as a starting point for a website, blog, or progressive web app. 

This starter supports [MDX](https://mdxjs.com/) for pages and content. MDX lets you seamlessly write JSX in your Markdown documents, and makes writing long-form content with components a blast. This remains an optional feature of the starter. Feel free to add new pages the good old Gatsby way!

Other features include TypeScript support, site settings, SEO and smart page slugs, private pages and content partials, lightweight blog features, redirects, PWA support, syntax highlighting, Google Analytics, and more!

See below for the main list of features.

### Features include:

- **🔥 Updated For Gatsby 3.0**
  - Make your project faster in every way that matters! [See all Gatsby v3 features &raquo;](https://www.gatsbyjs.com/blog/gatsby-v3/)
- **🪶 Lightweight And Low Overhead**
  - Provides more than enough to get started, but not so much to get in your way. Easily tear apart and customize to your heart's content!
- **🎛️ Easy Site Settings**
  - Configure and extend site settings in `settings.yml` for convenience. Use the included `useSettings` hook for quick settings access in your components.
- **🔘 Bootstrap and Font Awesome**
  - The most popular component framework and icon sets have already been included so you can start building right away.
- **📈 Google Analytics Support**
  - Start tracking right away. Simply add your measurement ID to `settings.yml` and you're good to go!
- **🔍 SEO Made Easy**
  - Includes best of class SEO support. With automatic fallbacks and all the heavy lifting done for you, SEO is a breeze.
- **🧑‍💻 MDX Markdown**
  - Add JSX to your Markdown! Drop components into your content seamlessly. Welcome to Markdown on steroids.
- **📄 MDX Pages And Partials**
  - Either auto-generate entire pages from MDX markdown, or simply embed MDX content partials in any of your components. Or just use regular Gatsby pages. Create content your way.
- **🕵️ Private Pages**
  - Hide MDX pages from queries and the sitemap using a simple `private` frontmatter setting.
- **↪️ Redirects**
  - This starter supports redirects for Netlify out of the box, configured right in `settings.yml`. Easily switch to any other hosting platform such as Amazon.
- **📱 Progressive Web App Support**
  - PWAs are the future! This starter uses sensible defaults and includes PWA features to boot.
- **💁 TypeScript Support**
  - Enjoy the benefits of type-safety, code completion, and more with TypeScript support.
- **💅 Styled Components**
  - Style your app without stress. Learn about styled components [here](https://styled-components.com/).
- **🔣 Syntax Highlighting With PrismJS**
  - [PrismJS](https://prismjs.com/) is included to make your code blocks shine in almost any language, with multiple themes available.
- **📑 Template Tags**
  - Use template tags such as `{siteName}` and `{contentTitle}` to reference values in your `settings.yml` and frontmatter.
- **📦 Gatsby API ES Modules**
  - ES Module support! Comfortably use `import` and `export` keywords in your Gatsby API files.
- **🕸️ XML Sitemap**
  - Give web crawlers a helping hand by auto-generating a `sitemap.xml` with all of your non-private pages.
- **🌟 And much more!**
  - I hope you enjoy! Please [star the project](https://github.com/justinmahar/gatsby-starter-mdx-launchpad) if it's helpful so others can find it. :)

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying this starter.

    ```shell
    # Create a new Gatsby site using this starter
    gatsby new my-project https://github.com/justinmahar/gatsby-starter-mdx-launchpad
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-project/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    > Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql).

    Open the `my-project` directory in your code editor of choice and edit `src/pages/index.tsx`. Save your changes and the browser will update in real time!

## 🚀 Quick start (Gatsby Cloud)

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/justinmahar/gatsby-starter-mdx-launchpad)

## Table Of Contents

- [Overview](#overview)
  - [Features include:](#features-include)
- [🚀 Quick start](#-quick-start)
- [🚀 Quick start (Gatsby Cloud)](#-quick-start-gatsby-cloud)
- [Table Of Contents](#table-of-contents)
- [Adding Page Components](#adding-page-components)
- [Adding MDX Pages](#adding-mdx-pages)
  - [Private and Hidden Pages](#private-and-hidden-pages)
    - [Private Pages](#private-pages)
    - [Hidden Pages](#hidden-pages)
- [Adding Blog Posts](#adding-blog-posts)
  - [Querying For Posts](#querying-for-posts)
- [Adding Partial Content](#adding-partial-content)
  - [MdxPartial Component](#mdxpartial-component)
  - [Querying MDX Partials Manually](#querying-mdx-partials-manually)
- [Rendering Markdown For MDX Nodes](#rendering-markdown-for-mdx-nodes)
  - [Customizing Rendered Markdown](#customizing-rendered-markdown)
    - [Adding Component Short Codes](#adding-component-short-codes)
- [MDX Page Template](#mdx-page-template)
- [Included Frontmatter](#included-frontmatter)
- [Adding New Frontmatter Fields](#adding-new-frontmatter-fields)
- [Querying MDX Content](#querying-mdx-content)
- [Layouts](#layouts)
- [Search Engine Optimization (SEO)](#search-engine-optimization-seo)
  - [Title Format](#title-format)
  - [Specifying Content SEO](#specifying-content-seo)
  - [Slugs And Stop Words](#slugs-and-stop-words)
- [Configuring Redirects](#configuring-redirects)
- [Site Settings](#site-settings)
  - [Included Settings](#included-settings)
  - [Adding New Settings](#adding-new-settings)
  - [Using The Settings Hook](#using-the-settings-hook)
- [Template Tags](#template-tags)
  - [Settings](#settings)
  - [MDX Content](#mdx-content)
  - [Using Template Tags In MDX Content](#using-template-tags-in-mdx-content)
  - [Using Template Tags Elsewhere](#using-template-tags-elsewhere)
- [PrismJS Syntax Highlighting](#prismjs-syntax-highlighting)
- [Progressive Web App (PWA) Configuration](#progressive-web-app-pwa-configuration)
- [Google Analytics](#google-analytics)
- [Removing Bootstrap and Font Awesome](#removing-bootstrap-and-font-awesome)
- [Gatsby APIs And ES Modules](#gatsby-apis-and-es-modules)
- [Terms of Service and Privacy Policy](#terms-of-service-and-privacy-policy)
- [Contributing](#contributing)
- [BSD Zero Clause License](#bsd-zero-clause-license)

## Adding Page Components

You can add new pages to `/pages` as you would [normally in Gatsby](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/).

## Adding MDX Pages

You can add MDX markdown pages as well, allowing you to author content that includes JSX components.

To create an MDX page, add a new `.mdx` file in `src/mdx/pages` with the following content:

```md
---
title: New Page
---

This is a new MDX page.
```

The only frontmatter you need for new pages is a `title`. This will cause a new page with your MDX markdown to generate at `/new-page`.

You can optionally provide a `slug` for the URL, and if unspecified, a SEO-friendly slug will be automatically created from the title. See the [SEO section](#slugs-and-stop-words) for how this works. 

Since the slug is generated from the frontmatter and not the filename, feel free to call the file anything you'd like.

See all [frontmatter options](#included-frontmatter), including `excerpt`, `seo`, `date`, and more.

### Private and Hidden Pages

#### Private Pages

You can make any page private by setting the `private: true` frontmatter. This will prevent the page from being listed in the sitemap, and will cause the page URL to use the path prefix `privatePagePathPrefix` set in `settings.yml`, which is by default in the format `/private/my-secret-page`.

#### Hidden Pages

To hide any page completely, set the `partial: true` frontmatter. This changes the MDX into a [content partial](#adding-partial-content) so it will never be generated as a page. This can be useful for temporarily removing content, writing drafts, or taking notes next to your content.

## Adding Blog Posts

This starter has a lightweight blog feature. Simply add the frontmatter `group: posts` to your MDX and put your MDX in `src/mdx/pages/posts`. There is also a `category` field you can use to categorize content, if desired.

### Querying For Posts

You can query your posts sorted by descending date like so:

```js
import { MdxNode } from '../data/MdxContent';
import { graphql, useStaticQuery } from 'gatsby';
```

```js
const postsData = useStaticQuery(graphql`
  query PostsQuery {
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
const postNodes: MdxNode[] = postsData?.posts?.nodes ? postsData.posts.nodes : [];
```

In this query, we're filtering for content that's not partial or private, and is in the group `posts`.

If you'd like to query posts from a particular category:

```js
const postsData = useStaticQuery(graphql`
  query DevPostsQuery {
    devPosts: allMdx(
      filter: { frontmatter: { partial: { ne: true }, private: { ne: true }, group: { eq: "posts" }, category: { eq: "development" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...mdxContent
      }
    }
  }
`);
const devPostNodes: MdxNode[] = postsData?.devPosts?.nodes ? postsData.devPosts.nodes : [];
```

This will query for all posts in the category `development`.

## Adding Partial Content

Content partials are pieces of MDX markdown that you can embed in any of your components.

To add an MDX content partial, create a new `.mdx` file in `src/mdx/partials` with the following content:

```md
---
title: My Partial
slug: my-partial
partial: true
---

## Partial Content

Content goes here!
```

Setting `partial: true` in the frontmatter prevents the MDX from being generated as a page. We can then use the [MdxPartial component](#mdxpartial-component), or manually query over this field, to render the content anywhere we'd like.

### MdxPartial Component

You can use the `MdxPartial` component (`src/components/content/MdxPartial.tsx`) to easily render any MDX partial using its `slug`, like so:

```jsx
<MdxPartial slug="my-partial" />
```

This component queries all partials and then finds the MDX node with the slug provided. The node is then rendered using `MdxNodeRenderer`. If no partial is found, an empty JSX element is rendered.

`MdxPartial` is included as a [short code](https://mdxjs.com/blog/shortcodes) in all MDX content so you don't need to import it.

### Querying MDX Partials Manually

MDX content partials can be manually queried for and included in any of your components like so:

```tsx
import { graphql } from 'gatsby';
import { MdxNodeRenderer } from '../components/content/MdxNodeRenderer';
import React from 'react';

interface MyPageProps {
  data: any;
}

export default function MyPage(props: MyPageProps): JSX.Element {
  return (
    <div>
      <h1>This is an example of using a content partial!</h1>
      <MdxNodeRenderer mdxNode={props.data.mdx} />
    </div>
  );
}

// Page query
export const query = graphql`
  query MyPartialQuery {
    mdx(fields: { slug: { eq: "my-partial" } }) {
      ...mdxContent
    }
  }
`;
```

You can also use a [static query](https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/) to get your partial content data:

```tsx
const partialData = useStaticQuery(graphql`
  query MyPartialQuery {
    mdx(fields: { slug: { eq: "my-partial" } }) {
      ...mdxContent
    }
  }
`);
```

```tsx
<MdxNodeRenderer mdxNode={partialData.mdx} />
```

## Rendering Markdown For MDX Nodes

The `MdxNodeRenderer` component (`src/components/content/MdxNodeRenderer.tsx`) is used to render MDX nodes. 

Pass the MDX node in via the `mdxNode` prop.

```tsx
import { MdxNodeRenderer } from '../components/content/MdxNodeRenderer';
```

```tsx
const data = useStaticQuery(graphql`
  query MyQuery {
    mdx(fields: { slug: { eq: "my-mdx-content" } }) {
      ...mdxContent
    }
  }
`);
```

```tsx
<MdxNodeRenderer mdxNode={data.mdx} />
```

### Customizing Rendered Markdown

The rendered markdown can easily be customized if you'd like, too. For instance, you may want to add margin, padding or font styles for certain elements.

Just add your renderers for `p`, `h1`, `h2`, etc, to the `components` object in `src/components/content/MdxNodeRenderer.tsx` to customize the rendering for the tags you desire.

For convenience, this file already has commented out renderers for all supported tags. Just uncomment and away you go.

#### Adding Component Short Codes

MDX also supports [short codes](https://mdxjs.com/blog/shortcodes). These allow you to use React components in your MDX without having to import them.

For instance, you may want to add short codes to easily support YouTube and Twitter embeds in your content. This starter already includes a short code for [TemplateText](#using-template-tags-in-mdx-content), [MdxPartial](#mdxpartial-component), and Gatsby's blazing fast [Link](https://www.gatsbyjs.com/docs/linking-between-pages/) component. 🔥

Add your short codes to the `shortCodes` object in `MdxNodeRenderer.tsx`, and see the docs on [short codes](https://mdxjs.com/blog/shortcodes) for some examples.

## MDX Page Template

All MDX pages are rendered using the page template defined in `src/components/page-templates/MdxPageTemplate.tsx`.

Changes to this component will apply to all MDX pages. You will likely want to make changes to this file to style your app the way you'd like.

In addition, `head` element metadata for MDX pages is handled in `src/components/page-templates/MdxHead.tsx`, should you want to customize that behavior.

## Included Frontmatter

Frontmatter is the metadata associated with each of your MDX markdown pages. This includes things such as the title, slug, and so forth.

MDX pages and partials by default support the following frontmatter fields:

| field             | type      | required | description                                                                                                                                                                          |
| ----------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`           | `string`  | **yes**  | The title of the content.                                                                                                                                                            |
| `slug`            | `string`  | no       | URL slug for the content. Autogenerated from title if unspecified. [Read more here.](#slugs-and-stop-words)                                                                          |
| `excerpt`         | `string`  | no       | Customized excerpt for the content. Will be the first few words from the content if unspecified.                                                                                     |
| `seo.title`       | `string`  | no       | Title used for SEO. Will be `title` if unspecified.                                                                                                                                  |
| `seo.description` | `string`  | no       | Description used for SEO. Will be the excerpt if unspecified.                                                                                                                        |
| `seo.imageUrl`    | `string`  | no       | Image URL used for sharing SEO. Will be the site image if unspecified.                                                                                                               |
| `seo.imageWidth`  | `number`  | no       | SEO image width. Only specify if `seo.imageUrl` is provided.                                                                                                                         |
| `seo.imageHeight` | `number`  | no       | SEO image height. Only specify if `seo.imageUrl` is provided.                                                                                                                        |
| `seo.imageAlt`    | `string`  | no       | SEO image alt. Only specify if `seo.imageUrl` is provided.                                                                                                                           |
| `partial`         | `boolean` | no       | When `true`, a page will not be generated for the content. Defaults to `false`.                                                                                                      |
| `private`         | `boolean` | no       | When `true`, the page will not be listed in the `sitemap.xml` and will be prefixed with the setting `privatePagePathPrefix` from `settings.yml`. Example: `/private/my-private-page` |
| `category`        | `string`  | no       | A category for the content.                                                                                                                                                          |
| `group`           | `string`  | no       | A group for the content. Can be used to group content by type, such as `posts`.                                                                                                      |
| `date`            | `string`  | no       | A date for the content in the format `YYYY-MM-DD`.                                                                                                                                   |

> `seo` is an object field with sub-fields (don't actually use a dot `.` for these; see `frontmatter-specs.mdx` for an example).

## Adding New Frontmatter Fields

All frontmatter fields are specified in `src/mdx/frontmatter-specs.mdx` and `src/data/MDXContent.ts`. 

If you'd like to add or change the frontmatter fields for your pages and partials, follow these two steps:

- Open `src/mdx/frontmatter-specs.mdx` and add your new MDX frontmatter fields, specifying dummy data such as `none` for strings. 
  - This will tell Gatsby what types to expect for your data when making queries.
- Open `src/data/MDXContent.ts` and add your new MDX frontmatter fields to `mdxFragmentQuery` and `MdxNode`. 
  - This will allow you to query the data using the `...mdxContent` [GraphQL fragment](https://www.apollographql.com/docs/react/data/fragments/), and will give you type checking and autocompletion for your new fields. 🔥
  - Optionally, you can add the data to `getTemplateTagRenderer()` so you can access it via the template tag system.

## Querying MDX Content

You can query your MDX content (including all frontmatter) throughout the app like so:

```graphql
query MyQuery {
  allMdx {
    nodes {
      ...mdxContent
    }
  }
}
```

If you're unfamiliar, the syntax `...mdxContent` is the use of a [GraphQL fragment](https://www.apollographql.com/docs/react/data/fragments/). The fragment is defined in `src/data/MDXContent.ts` and includes all MDX data we want to query for, and makes things a lot cleaner and easier to read!

> Tip: You can use [GraphiQL](http://localhost:8000/__graphiql) to easily create filters and sorts on your MDX content when your development server is running.

Once you have the data, wrap each node in an `MdxContent` instance, like so:

```js
import MdxContent from '../data/MdxContent';
```

```js
const mdxContent: MdxContent = new MdxContent(mdxNode);
```

And you can render MDX content like so:

```js
import { MdxNodeRenderer } from '../components/content/MdxNodeRenderer';
```

```jsx
<MdxNodeRenderer mdxNode={mdxContent.node} />
```

See `MdxPageTemplate` (`src/components/page-templates/MdxPageTemplate.tsx`) for how MDX pages are rendered in this starter.

## Layouts

The standard [Gatsby layout pattern](https://www.gatsbyjs.com/docs/how-to/routing/layout-components/) is used for this starter's pages. Layout components are located in `src/components/layouts`. Customize the files in this directory to affect your entire site.

The `Layout` component will wrap its children with a `Header` and `Footer`.

You can use the following for any new pages:

```jsx
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';

interface Props {}

export default function NewPage(props: Props): JSX.Element {
  return (
    <Layout>
      <Head contentTitle="My Page Title" seo={{ description: 'A description of this page' }} />
      <Body>
        <Container>
          <Row>
            <Col>Page content goes here.</Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}
```

If you want to add something to the `head` element for a particular page, all `Head` component children are added directly to the `head` element using [React Helmet](https://github.com/nfl/react-helmet).

## Search Engine Optimization (SEO)

The `Head` (`src/components/layouts/Head.tsx`) and `MdxHead` (`src/components/page-templates/MdxHead.tsx`) components handle SEO under the hood, using fallbacks from site metadata where possible. For instance, if no SEO image is provided, the site image is used as a fallback.

In addition, `MdxHead` uses the MDX data to populate SEO data for you, falling back on defaults where possible. The goal with this part of the starter was to abstract away SEO boilerplate so you can focus on building your project. However these are your entry points to dig into this functionality should you feel the need to.

All `Head` and `MdxHead` component children are added directly to the `head` element using [React Helmet](https://github.com/nfl/react-helmet).

### Title Format

You can configure how page titles are presented in `src/settings/settings.yml` using template tags. These settings apply to all pages in your app.

The settings are as follows:

- `seoTitleFormat`
  - Format used for the SEO title. Supports template tags.
- `seoTitleSeparator`
  - Separator used in SEO titles. Used between page name and site name.

Example:

```yml
seoTitleFormat: '{contentTitle}{seoTitleSeparator}{siteName}'
seoTitleSeparator: ' - '
```

This would create a page title like so: `My Content Title - My Site Name`.

See the [Template Tags section](#template-tags) for all template tags available.

### Specifying Content SEO

For Gatsby pages, you can use the `Head` component, like so:

```jsx
<Head contentTitle={'Page Title'} seo={{ description: 'Page description' }} />
```

The `seo` prop accepts a `title`, `description`, `imageUrl`, `imageWidth`, `imageHeight`, and `imageAlt`. All are optional.

SEO for MDX content can be specified in the frontmatter. See the [frontmatter section](#included-frontmatter) in this document for more.

### Slugs And Stop Words

MDX slugs are auto-generated when `slug` is not specified in the frontmatter. They are generated from the title, and are designed to be as SEO-friendly as possible. 

As such, all [stop words](https://www.npmjs.com/package/stopword) and duplicate words are removed from the slugs. They are converted to all lowercase, and all non-alphanumeric characters are converted to dashes.

For instance, the title `"Everything you need to know about everything"` would have the auto-generated slug `everything-need-know`.

You can review and tweak this logic in the `slugify` function in `gatsby-node.esm.js`.

If you do specify a `slug` in the frontmatter, it will be used as is. That way you can bypass this logic and make the slug whatever you'd like--just be sure to specify a URL-safe slug since no processing is done on slugs you specify explicitly.

## Configuring Redirects

If you move content to a new URL, or even move content to an entirely new domain, you can set up redirects to keep link traffic flowing smoothly.

Just add your redirects to the `redirects` array in `settings.yml`, following the specs defined in [createRedirect](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect). 

At a minimum, specify `fromPath` and `toPath`, and be sure to set `isPermanent` to `true` if not a temporary redirect.

Redirects are created using the `createRedirect` Gatsby node API action function in `createPages`. The project is configured with `gatsby-plugin-netlify` but redirects can be configured for other services. See [the createRedirect docs](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect) for more.

Example in `settings.yml`:

```yml
redirects:
  - fromPath: /old-url
    toPath: /new-url
    isPermanent: true
  - fromPath: /another-old-url
    toPath: /another-new-url
    isPermanent: true
```

> Note: Depending on your configuration, redirects usually only work once a project is deployed (and not in a development environment).

## Site Settings

This starter has a YAML file containing all site settings defined in `src/settings/setting.yml`, including site metadata.

In addition, all site settings can be quickly accessed from any function component using the `useSettings` hook in `src/settings/useSettings.ts`. 🙌

A default site image and icon are present in `/static/media`. There's also a favicon in `/static`. Replace these files with your own images. Be sure to update `src/settings/settings.yml` with the correct file names, image alts, and sizes.

**You'll want to update all `siteMetadata` settings with your own project information.**

### Included Settings

- `siteMetadata`
  - Site metadata exported from Gatsby config. This data can be queried using `site { siteMetadata { ... } }` as per usual.
- `gatsbyPluginManifestOptions`
  - Options provided directly to the [gatsby-plugin-manifest plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/) for PWA support.
- `seoTitleFormat`
  - Format used for the SEO title. Supports [template tags](#template-tags).
- `seoTitleSeparator`
  - Separator used in SEO titles. Used between page name and site name.
- `privatePagePathPrefix`
  - Prefix used before private page slugs. Must not start or end with a slash. For example, if `private` is the prefix, the private page URL for a page titled `'My Private Page'` would look like: `/private/my-private-page`
- `googleAnalyticsMeasurementId`
  - Measurement ID for Google analytics. Use `none` to disable.
- `twitterSiteUsername`
  - Twitter site username for SEO purposes. Provide the twitter handle for your site, or use `none` to disable. 
- `redirects`
  - An array of redirects. Use the [createRedirect object specs](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createRedirect). See [Configuring Redirects](#configuring-redirects) for more info.

### Adding New Settings

Site settings are configured in `src/settings/settings.yml` and `src/settings/useSettings.ts`.

To add new site settings, follow these two steps:

- Open `src/settings/settings.yml` and add the settings you'd like to the end of the file.
- Open `src/settings/useSettings.ts` and add your new settings specs to `settingsYaml` in both `SettingsQuery` and `SettingsData`.
  - This will allow you to access the data using the `useSettings` hook, and will give you type checking and autocompletion for your new fields. 🔥
  - Optionally, you can add the data to `getTemplateTagRenderer()` so you can access it via the template tag system.

### Using The Settings Hook

Using the hook is very simple. In your function component, use the following:

```ts
import { useSettings } from '../settings/useSettings';
```

```ts
const settings: Settings = useSettings();
```

From here, you can access site metadata such as `settings.data.site.siteMetadata.siteName`, or any custom settings such as `settings.data.settingsYaml.pandaBears`.

## Template Tags

A template tag system exists that allows you to reference site and content information using template tags.

Template tags are [lower camel case](https://en.wikipedia.org/wiki/Camel_case) keywords that are always wrapped in curly braces. For example, <small> `{siteName}` </small> will reference the site name configured in Site Settings. Template tags are automatically applied to your frontmatter fields.

The following template tags are available:

### Settings

| Template Tag                                      | Value                            |
| ------------------------------------------------- | -------------------------------- |
| <small> `{siteName}` </small>                     | Name of site                     |
| <small> `{siteDescription}` </small>              | Description of site              |
| <small> `{siteImage}` </small>                    | Site image URL                   |
| <small> `{siteImageAlt}` </small>                 | Site image alt text              |
| <small> `{siteIcon}` </small>                     | Site icon URL                    |
| <small> `{siteIconAlt}` </small>                  | Site icon alt text               |
| <small> `{siteUrl}` </small>                      | Site URL                         |
| <small> `{siteVersion}` </small>                  | Site version from `package.json` |
| <small> `{seoTitleSeparator}` </small>            | Title separator for SEO          |
| <small> `{privatePagePathPrefix}` </small>        | Prefix used before private pages |
| <small> `{googleAnalyticsMeasurementId}` </small> | Google Analytics tracking ID     |
| <small> `{twitterSiteUsername}` </small>          | Twitter site username            |
| <small> `{year}` </small>                         | Current year (i.e. 2021)         |

### MDX Content

| Template Tag                               | Value                          |
| ------------------------------------------ | ------------------------------ |
| <small> `{contentTitle}` </small>          | Title of current content       |
| <small> `{contentExcerpt}` </small>        | Excerpt from current content   |
| <small> `{contentSeoTitle}` </small>       | SEO title of the content       |
| <small> `{contentSeoDescription}` </small> | SEO description of the content |

### Using Template Tags In MDX Content

You can use `TemplateText` (`src/components/content/TemplateText.tsx`) to render text containing template tags in your MDX content.

This component is included as a [short code](https://mdxjs.com/blog/shortcodes) in all MDX content so you don't need to import it.

For example, in your markdown you could write: 

```md
<TemplateText text="{contentTitle} on {siteName}" />
```

This would be rendered as: `My Content Title on My Site Name`

Read about adding your own component short codes [here](#adding-component-short-codes).

### Using Template Tags Elsewhere

`Settings` (from `useSettings` hook) and `MdxContent` (wraps MDX data) both have a getter for a `TemplateTagRenderer` which can be used to render their respective template tags.

For example, in a function component, you might do something like this:

```ts
const settings: Settings = useSettings();
const tags: TemplateTagRenderer = settings.getTemplateTagRenderer();
const copyrightStatement = tags.render('Copyright {year}, {siteName}');
// Copyright 2021, My Site Name
```

> Note: Renderers for settings and MDX content can be combined using `TemplateTagRenderer.combineWith()`

## PrismJS Syntax Highlighting

[PrismJS](https://prismjs.com/) is included for syntax highlighting support. 

If you'd like to use one of the many [themes available](https://prismjs.com/), open `gatsby-browser.js` and uncomment the theme you want to use.

For example:
```js
require('prismjs/themes/prism-okaidia.css');
```

> Note: Do not include `prism.css` if you're using a theme.

## Progressive Web App (PWA) Configuration

This starter includes PWA support. You can configure this in `src/settings/settings.yml`.

Change the following setting:

- `gatsbyPluginManifestOptions`
  - Options provided directly to the [gatsby-plugin-manifest plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/) for PWA support.

These settings are then handed to the manifest plugin during the Gatsby config stage.

## Google Analytics

This project uses the [gatsby-plugin-google-gtag](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/) plugin for Google Analytics.

Simply add your measurement ID to `src/settings/settings.yml` as `googleAnalyticsMeasurementId` and you're ready to go. Set this to `none` to disable Google Analytics.

## Removing Bootstrap and Font Awesome

If you'd like to remove Bootstrap and Font Awesome: 

- Delete the `bootstrap.min.css` import from `gatsby-browser.js`
- Run the following: 
  ```zsh
  npm uninstall bootstrap react-bootstrap @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
  ```

## Gatsby APIs And ES Modules

The [esm](https://www.npmjs.com/package/esm) package is being used to support ES Modules in Gatsby's API files as per [Gatsby's guide](https://support.gatsbyjs.com/hc/en-us/articles/1500000294121-Using-ES6-Module-Syntax-in-Gatsby-API-Files-on-Gatsby-Cloud).

This lets us leave CommonJS syntax behind in favor of newer ES module syntax. This means you can comfortably use the `import` and `export` keywords from Gatsby's API files.

The Gatsby API files that support ES modules in this project have the filename suffix `.esm.js`.

> Note: This approach does not apply to  `gatsby-browser.js`. 

## Terms of Service and Privacy Policy

While this project is licensed under the [BSD Zero Clause License](#bsd-zero-clause-license), the author still feels obligated to state that the terms of service and privacy policy pages included are for demonstration purposes only. Be sure to get proper legal advice and replace the content on those pages with your own legal text.

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

Read the code of conduct here: [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md)

## BSD Zero Clause License

Copyright (c) 2021 [Justin Mahar](https://github.com/justinmahar)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
