import * as React from "react"
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/layout.js'; 

const ingredient = ({ data, pageContext }) => {
    var name = data.wpIngredient.name
    var recipes = data.allWpRecipe.nodes
    return (
        <Layout>
            <Seo post={data.wpIngredient} />
            <div className="header" style={{ marginBottom: "5em" }}>
              <div className="header-row empty-row">
                <hr />
                <div className="container text-muted">
                </div>
              </div>
          <div className="header-row">
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1>Drink Recipes</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="header-row">
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 offset-md-4 text-green">
                  <h1>with {name}</h1>
                </div>
              </div>
            </div>
          </div>
              <hr />
            </div>

            <div className="container">
              <div className="row">

                {recipes.map(recipe => {
                  var image = getImage(recipe.recipeInformation.image.localFile)
                  return (
                    <div className="col-6 col-md-3 m-mb-4">
                      <div className="recipe-card">
                        <a href={"/" + recipe.slug}>
                          <GatsbyImage image={image} alt={recipe.recipeInformation.image.altText} />
                        </a>
                        <a href={"/" + recipe.slug} className="h4">{recipe.title}</a>
                        <div className="badge-group small">
                          {recipe.recipeCategories.nodes.map(category => {
                            return (
                              <a className="badge" href={category.uri}>{category.name}</a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpIngredient(id: { eq: $id }) {
      name
      uri
      seo {
        title
        metaDesc  
        focuskw
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
            altText
            sourceUrl
            srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
            altText
            sourceUrl
            srcSet
        }
        canonical
        cornerstone
      }
    }
    allWpRecipe( filter: {
      recipeInformation: {
        ingredients: {
          elemMatch: {
            ingredientname: {
              id: {
                in: [$id] 
              }
            }
          }
        }
      }
    }
    ) {
      nodes {
        id
        slug
        title
        slug
        uri
        recipeCategories {
            nodes {
                uri
                name
            }
        }
        featuredImage {
            node {
                localFile {
                    childImageSharp {
                        gatsbyImageData(aspectRatio: 1.5, quality: 80)
                    }
                }
            }
        }
        recipeInformation {
            image {
                altText
                localFile {
                    childImageSharp {
                        gatsbyImageData(quality: 80)
                    }
                }
            }
        }
      }
    }
  }
`;

export default ingredient;