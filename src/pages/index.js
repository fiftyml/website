import * as React from "react"
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from '../components/layout.js';

const IndexPage = ({ data }) => {

  const posts = data.allWpPost.nodes
  const recipes = data.allWpRecipe.nodes
  const ingredients = data.allWpIngredient.nodes


  return (
    <Layout>
      <div className="header">
        <div className="header-row empty-row">
          <hr />
          <div className="container text-muted">
          </div>
        </div>
        <div className="header-row">
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-10">
                <h1>We help you find <span className="text-green">new</span> cocktail recipes using ingredients you <span className="text-green">already have.</span></h1>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="home-select">
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>I’m looking for drink recipes that use
              <select id="ingredientSelect" onChange={() => window.location.href = document.getElementById("ingredientSelect").value}>
                <option selected disabled>any ingredient</option>
                {ingredients.map(ingredient => {
                  return (
                    <option value={ingredient.uri}>{ingredient.name}</option>
                  )
                })}
              </select>
              </h2>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="container" style={{ marginTop: "5em" }}>
        <div className="row wiggle-header">
          <div className="col">
            <div className="wiggle mobile-hide"></div>
          </div>
          <div className="col-auto text-right">
            <h2>Most Popular Recipes</h2>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: 0, marginBottom: "3em" }} />
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

     

      <div className="container" style={{ marginTop: "5em" }}>
        <div className="row wiggle-header">
          <div className="col-auto text-left">
            <h2>Lastest Journal Posts</h2>
          </div>
          <div className="col">
            <div className="wiggle mobile-hide"></div>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: 0, marginBottom: "3em" }} />
      <div className="container">
        <div className="row">
          {posts.map(post => {
            var image = getImage(post.featuredImage.node.localFile)
            return (
              <div className="col-12 col-md-4">
                <div className="post-card m-mb-4">
                  <a href={post.uri}>
                    <GatsbyImage image={image} alt="Sausage" />
                  </a>
                  <div className="badge-group small">
                    {post.categories.nodes.map(category => {
                      return (
                        <a className="badge" href={category.uri}>{category.name}</a>
                      )
                    })}
                  </div>
                  <a href={post.uri} className="h4">{post.title}</a>
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
  query {
    allWpPost(sort: {fields: date, order: DESC}, limit: 6) {
        nodes {
            title
            uri
            categories {
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
        }
      }
    allWpRecipe(sort: {fields: date, order: DESC}, limit: 6) {
        nodes {
            title
            uri
            slug
            recipeCategories {
                nodes {
                    uri
                    name
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
    allWpIngredient {
      nodes {
        name
        uri
      }
    }
  }
`;

export default IndexPage

export const Head = () => <title>Home Page</title>
