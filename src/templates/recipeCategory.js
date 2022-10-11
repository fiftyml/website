import * as React from "react"
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from 'gatsby-plugin-wpgraphql-seo';

import Layout from '../components/layout.js';


const recipeCategory = ({ data, pageContext }) => {
    var title = data.wpRecipeCategory.name
    var recipes = data.wpRecipeCategory.recipes.nodes
    var categories = data.allWpRecipeCategory.nodes
    return (
        <Layout>
          <div className="header" style={{ marginBottom: "1em" }}>
            <div className="header-row empty-row">
              <hr />
              <div className="container text-muted">
              </div>
            </div>
            <div className="header-row empty-row">
              <hr />
              <div className="container text-muted">
              </div>
            </div>
            <div className="header-row">
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-12 text-right">
                    <h1>{title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="badge-group small">
                  <a href="/recipes/" className="badge">All</a>
                  {categories.map(category => {
                    if (category.uri === data.wpRecipeCategory.uri) {
                      return (
                        <a href={category.uri} className="badge badge-success">{category.name}</a>
                      )
                    } else {
                      return (
                        <a href={category.uri} className="badge">{category.name}</a>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ marginBottom: "5em", marginTop: "0em" }} />

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
    allWpRecipeCategory {
      nodes {
        name
        uri
      }
    }
    wpRecipeCategory(id: { eq: $id }) {
      name
      uri
      recipes {
        nodes {
          slug
          title
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
        schema {
            raw
        }
      }
    }
  }
`;

export default recipeCategory;