const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\.cache\\dev-404-page.js"))),
  "component---src-pages-about-jsx": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\pages\\about.jsx"))),
  "component---src-templates-category-jsx": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\templates\\category.jsx"))),
  "component---src-templates-listing-jsx": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\templates\\listing.jsx"))),
  "component---src-templates-post-jsx": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\templates\\post.jsx"))),
  "component---src-templates-tag-jsx": hot(preferDefault(require("E:\\github\\gatsby-project-porfolio\\src\\templates\\tag.jsx")))
}

