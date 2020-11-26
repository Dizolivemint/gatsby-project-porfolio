const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-project-page-js": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\templates\\ProjectPage.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\.cache\\dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\pages\\index.js")))
}

