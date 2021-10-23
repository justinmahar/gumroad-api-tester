/**
 * Configure your Gatsby Browser APIs here.
 *
 * This file is where your styles go!
 *
 * Gatsby 3 Browser APIs:
 *   - disableCorePrefetching
 *   - onClientEntry
 *   - onInitialClientRender
 *   - onPostPrefetchPathname
 *   - onPreRouteUpdate
 *   - onPrefetchPathname
 *   - onRouteUpdate
 *   - onRouteUpdateDelayed
 *   - onServiceWorkerActive
 *   - onServiceWorkerInstalled
 *   - onServiceWorkerRedundant
 *   - onServiceWorkerUpdateFound
 *   - onServiceWorkerUpdateReady
 *   - registerServiceWorker
 *   - replaceHydrateFunction
 *   - shouldUpdateScroll
 *   - wrapPageElement
 *   - wrapRootElement
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// === CSS/LESS/SASS imports ===

// == Bootstrap Base ==
require('bootstrap/dist/css/bootstrap.min.css');

// == PrismJS code syntax highlighting themes ==
require('prismjs/themes/prism.css');
// require('prismjs/themes/prism-coy.css');
// require('prismjs/themes/prism-dark.css');
// require('prismjs/themes/prism-funky.css');
// require('prismjs/themes/prism-okaidia.css');
// require("prismjs/themes/prism-solarizedlight.css")
// require('prismjs/themes/prism-tomorrow.css');
// require('prismjs/themes/prism-twilight.css');

// == Custom Styles ==
require('./src/styles/styles.scss');

// Reload when there's an update
const onServiceWorkerUpdateReadyFunction = (_apiCallbackContext) => {
  window.location.reload();
};
export const onServiceWorkerUpdateReady = onServiceWorkerUpdateReadyFunction;
