import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const IndexPage = ({ data }) => {

  const posts = data.allWpPost.nodes
  const recipes = data.allWpRecipe.nodes
  const ingredients = data.allWpIngredient.nodes
  const recipeCategories = data.allWpRecipeCategory.nodes
  const categories = data.allWpCategory.nodes

  return (
    <Layout>
      <h1>fifty_ml</h1>

      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => {
          return (
            <li><a href={recipe.slug}>{recipe.title}</a></li>
          )
        })}
      </ul>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map(ingredient => {
          return (
            <li><a href={ingredient.uri}>{ingredient.title}</a></li>
          )
        })}
      </ul>

      <h3>Recipe Categories</h3>
      <ul>
        {recipeCategories.map(category => {
          return (
            <li><a href={category.uri}>{category.name}</a></li>
          )
        })}
      </ul>

      <h2>Blog Posts</h2>

      <ul>
        {posts.map(post => {
          return (
            <li><a href={post.uri}>{post.title}</a></li>
          )
        })}
      </ul>

      <h3>Categories</h3>
      <ul>
        {categories.map(category => {
          return (
            <li><a href={"/journal/" + category.slug }>{category.name}</a></li>
          )
        })}
      </ul>

    </Layout>
  )
}

export const query = graphql`
  query {
    allWpPost {
      nodes {
        title
        uri
      }
    }
    allWpRecipe {
      nodes {
        title
        slug
      }
    }
    allWpRecipeCategory {
      nodes {
        name
        uri
      }
    }
    allWpIngredient {
      nodes {
        title
        uri
      }
    }
    allWpCategory {
      nodes {
        name
        slug
      }
    }
  }
`;

export default IndexPage

export const Head = () => <title>Home Page</title>
