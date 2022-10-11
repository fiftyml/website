import * as React from "react"
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/layout.js';

const RecipePage = ({ data }) => {

    var recipes = data.allWpRecipe.nodes
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
                        <div className="row wiggle-header" style={{ marginBottom: "0em" }}>
                            <div className="col">
                                <div className="wiggle mobile-hide"></div>
                            </div>
                            <div className="col-auto text-right">
                                <h1>All Drink Recipes</h1>
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
                            <a href="/journal/" className="badge badge-success">All</a>
                            {categories.map(category => {
                                return (
                                    <a href={category.uri} className="badge">{category.name}</a>
                                )
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
  query {
    allWpRecipe(sort: {fields: date, order: DESC}) {
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
    allWpRecipeCategory {
      nodes {
        name
        uri
      }
    }
  }
`;

export default RecipePage