const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const model = path.resolve('./src/templates/model.js')
    resolve(
      graphql(
        `
          {
            allContentfulModel {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulModel.edges
        posts.forEach(post => {
          createPage({
            path: `/model/${post.node.slug}/`,
            component: model,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
