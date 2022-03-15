exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bootstrap/,
            use: loaders.null(),
          },
          {
            test: /axios/,
            use: loaders.null(),
          },
          {
            test: /react-bootstrap/,
            use: loaders.null(),
          },
          {
            test: /react-json-view/,
            use: loaders.null(),
          }
        ],
      },
    })
  }
}
