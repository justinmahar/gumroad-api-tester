/**
 * Configure your Gatsby site with this file.
 *
 * Gatsby 3 Config Options:
 *   - siteMetadata (object)
 *   - plugins (array)
 *   - flags (object)
 *   - pathPrefix (string)
 *   - polyfill (boolean)
 *   - mapping (object)
 *   - proxy (object)
 *   - developMiddleware (function)
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * Note: Reload your development server when making changes to this file.
 */

// NOTE: Site settings are located at: src/settings/settings.yml

/**
 * Some configurable settings are needed here, but they're outside Gatsby's GraphQL environment.
 * So, we'll use read-yaml to read them directly from the YAML files as JSON.
 */
import readYaml from 'read-yaml';
import packageJson from './package.json';

/** Load settings YAML */
const settings = readYaml.sync(`${__dirname}/src/settings/settings.yml`);

// Add site version to siteMetadata
settings.siteMetadata.siteVersion = packageJson.version;

// Ensure there is no trailing slash on the Site URL
settings.siteMetadata.siteUrl = settings.siteMetadata.siteUrl.replace(/(.*)[/]+$/, '$1');
// Replace siteUrl template tag in siteImage
settings.siteMetadata.siteImage = settings.siteMetadata.siteImage.replace('{siteUrl}', settings.siteMetadata.siteUrl);

// == PWA Manifest Plugin Setup ==
// For more info on PWA support, see: https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
/** These options are passed directly into the manifest plugin. */
const gatsbyPluginManifestOptions = {
  name: settings.gatsbyPluginManifestOptions.name,
  short_name: settings.gatsbyPluginManifestOptions.shortName,
  start_url: settings.gatsbyPluginManifestOptions.startUrl,
  theme_color: settings.gatsbyPluginManifestOptions.themeColor,
  background_color: settings.gatsbyPluginManifestOptions.backgroundColor,
  display: settings.gatsbyPluginManifestOptions.display,
  icon:
    settings.gatsbyPluginManifestOptions.customIcon !== 'none'
      ? settings.gatsbyPluginManifestOptions.customIcon
      : settings.siteMetadata.siteIcon,
  // icon_options: {
  //   purpose: `maskable any`, // Image has icon masks and safe zone in mind, and is for use in any context. - https://w3c.github.io/manifest/#purpose-member
  // },
  // include_favicon: false, // This will exclude favicon link tag - https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/#disable-favicon
};
// Fix path to icon:
// Gatsby serves content in static without "static" in the path, but here
// the path must be relative to the project root. So we add in static before the path.
if (gatsbyPluginManifestOptions.icon) {
  gatsbyPluginManifestOptions.icon =
    'static' + (gatsbyPluginManifestOptions.icon.startsWith('/') ? '' : '/') + gatsbyPluginManifestOptions.icon;
}
// == END PWA Manifest Plugin Setup ==

const plugins = [
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      ...gatsbyPluginManifestOptions,
    },
  },
  {
    resolve: 'gatsby-plugin-offline',
    options: {
      workboxConfig: {
        importWorkboxFrom: `cdn`,
        runtimeCaching: [
          {
            urlPattern: /.*/,
            // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache
            handler: `NetworkFirst`,
          },
        ],
      },
    },
  },
  // `gatsby-plugin-remove-serviceworker`, // Uncomment when gatsby-plugin-offline disabled
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      exclude: [`/${settings.privatePagePathPrefix}/*`],
    },
  },
  `gatsby-plugin-robots-txt`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-typescript-checker`,
  `gatsby-plugin-sass`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          // For line numbering/highlights and more, see:
          // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            // Use this string to denote which language to use in inline code blocks.
            // Example: `js:::let finalBoss = "Bowser"`
            // The js::: part is removed and everything after it is highlighted as js.
            inlineCodeMarker: ':::',
            aliases: {},
          },
        },
      ],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `mdx-source`,
      path: `${__dirname}/src/mdx`,
    },
  },
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `yml-settings`,
      path: `${__dirname}/src/settings`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/static/media`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-netlify`,
  `gatsby-plugin-styled-components`,
];

// == Google Analytics ==
// https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
// Only add the analytics plugin if there's a measurement ID specified
if (settings.googleAnalyticsMeasurementId !== 'none') {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [
        settings.googleAnalyticsMeasurementId, // Google Analytics / GA
      ],
    },
  });
}
// == End Analytics ==

export default {
  // https://github.com/gatsbyjs/gatsby/discussions/28331%E2%80%8B
  flags: {
    // Enable all experiments aimed at improving develop server start time
    // https://github.com/gatsbyjs/gatsby/discussions/28331%E2%80%8B
    FAST_DEV: true,
  },
  siteMetadata: {
    ...settings.siteMetadata,
  },
  plugins: plugins,
};
