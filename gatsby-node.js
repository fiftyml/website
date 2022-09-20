const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {

    const { createPage } = actions

    // Get and Create All Posts
    //////////////////////////////////////////////////////////////////////////////

    const {
        data: {
            allWpPost: { nodes: allPosts },
        },
    } = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `)

    const posts = allPosts

    const postTemplate = path.resolve(`./src/templates/post.js`)

    allPosts.forEach(post => {
        createPage({
            // will be the url for the page
            path: post.uri,
            // specify the component template of your choice
            component: slash(postTemplate),
            // In the ^template's GraphQL query, 'id' will be available
            // as a GraphQL variable to query for this post's data.
            context: {
                id: post.id,
            },
        })
    })


    // Get and Create All  Categories
    //////////////////////////////////////////////////////////////////////////////

    const {
        data: {
            allWpCategory: { nodes: allCategories },
        },
    } = await graphql(`
    query {
      allWpCategory {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `)

    const categoryTemplate = path.resolve(`./src/templates/category.js`)


    allCategories.forEach(category => {
        const postsPerPage = 15
        const numPages = Math.ceil(category.count / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? "/journal/" + category.slug : "/journal/" + category.slug + "/" + (i + 1),
                component: slash(categoryTemplate),
                context: {
                    id: category.id,
                    name: category.name,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                },
            })
        })
    })


    // Get and Create All Recipes
    //////////////////////////////////////////////////////////////////////////////

    const {
        data: {
            allWpRecipe: { nodes: allRecipes },
        },
    } = await graphql(`
    query {
      allWpRecipe {
        nodes {
          id
          uri
          slug
        }
      }
    }
  `)

    const recipeTemplate = path.resolve(`./src/templates/recipe.js`)

    allRecipes.forEach(recipe => {
        createPage({
            // will be the url for the page
            path: recipe.slug,
            // specify the component template of your choice
            component: slash(recipeTemplate),
            // In the ^template's GraphQL query, 'id' will be available
            // as a GraphQL variable to query for this post's data.
            context: {
                id: recipe.id,
            },
        })
    })

  // Get and Create All Ingredients
  //////////////////////////////////////////////////////////////////////////////

  const {
    data: {
      allWpIngredient: { nodes: allIngredients },
    },
  } = await graphql(`
    query {
      allWpIngredient {
        nodes {
          id
          uri
          slug
        }
      }
    }
  `)

  const ingredientTemplate = path.resolve(`./src/templates/ingredient.js`)

  allIngredients.forEach(ingredient => {
    createPage({
      // will be the url for the page
      path: ingredient.uri,
      // specify the component template of your choice
      component: slash(ingredientTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this post's data.
      context: {
        id: ingredient.id,
      },
    })
  })


    // Get and Create All Recipe Categories
    //////////////////////////////////////////////////////////////////////////////

    const {
        data: {
          allWpRecipeCategory: { nodes: allRecipeCategories },
        },
    } = await graphql(`
    query {
      allWpRecipeCategory {
        nodes {
          id
          name
          slug
        }
      }
    }
  `)

    const recipeCategoryTemplate = path.resolve(`./src/templates/recipeCategory.js`)


    allRecipeCategories.forEach(recipeCategory => {
        createPage({
            // will be the url for the page
            path: "/recipes/" + recipeCategory.slug,
            // specify the component template of your choice
            component: slash(recipeCategoryTemplate),
            // In the ^template's GraphQL query, 'id' will be available
            // as a GraphQL variable to query for this post's data.
            context: {
                id: recipeCategory.id,
                name: recipeCategory.name
            },
        })
    })


    // Get and Create All Pages
    //////////////////////////////////////////////////////////////////////////////

    const {
        data: {
            allWpPage: { nodes: allPages },
        },
    } = await graphql(`
    query {
      allWpPage {
        nodes {
          id
          uri
        }
      }
    }
  `)


}


const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = async (
    {
        actions,
        cache,
        createNodeId,
        createResolvers,
        store,
        reporter,
    },
) => {
    const { createNode } = actions

    await createResolvers({
        WPGraphQL_MediaItem: {
            imageFile: {
                type: "File",
                async resolve(source) {
                    let sourceUrl = source.sourceUrl

                    if (source.mediaItemUrl !== undefined) {
                        sourceUrl = source.mediaItemUrl
                    }

                    return await createRemoteFileNode({
                        url: encodeURI(sourceUrl),
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    })
                },
            },
        },
    })
}