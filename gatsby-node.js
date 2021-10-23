/**
 * See gatsby-node.esm.js.
 *
 * The esm package allows us to use ES Modules for gatsby's API files.
 * More info at: https://support.gatsbyjs.com/hc/en-us/articles/1500000294121-Using-ES6-Module-Syntax-in-Gatsby-API-Files-on-Gatsby-Cloud
 */

const requireEsm = require('esm')(module);
module.exports = requireEsm('./gatsby-node.esm.js');
