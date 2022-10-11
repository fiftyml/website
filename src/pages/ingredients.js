import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const IngredientsPage = ({ data }) => {

    var ingredients = data.allWpIngredient.nodes
    const recipes = data.allWpRecipe.nodes

    const alphabet = [
        ["A", false],
        ["B", false],
        ["C", false],
        ["D", false],
        ["E", false],
        ["F", false],
        ["G", false],
        ["H", false],
        ["I", false],
        ["J", false],
        ["K", false],
        ["L", false],
        ["M", false],
        ["N", false],
        ["O", false],
        ["P", false],
        ["Q", false],
        ["R", false],
        ["S", false],
        ["T", false],
        ["U", false],
        ["V", false],
        ["W", false],
        ["X", false],
        ["Y", false],
        ["Z", false],
    ]
    
    if (!ingredients[0].count) {
        for (var i = 0; i < recipes.length; i++) {
            var recipeIngredients = recipes[i].recipeInformation.ingredients
            for (var x = 0; x < recipeIngredients.length; x++) {
                var index = ingredients.findIndex(ing => ing.name === recipeIngredients[x].ingredientname.name);
                if (!ingredients[index].count) {
                    ingredients[index].count = 1
                } else {
                    ingredients[index].count++
                }
            }
        }
    }
    


    return (
        
        <Layout>
            <div className="header" style={{marginBottom: "1em"}}>
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
                        <div className="row wiggle-header">
                            <div className="col">
                                <div className="wiggle mobile-hide"></div>
                            </div>
                            <div className="col-auto text-right">
                                <h1>All Ingredients</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="badge-group">
                            {alphabet.map(letter => {
                                return (
                                    <a href={"#" + letter[0]} className="badge">{letter[0]}</a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ marginBottom: "5em", marginTop: "1em" }} />

            <div className="ingredients-list">

                {ingredients.map(ingredient => {
                    return (
                        <div className="ingredient" id={ingredient.name[0]}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <a className="h1" href={ingredient.uri}>{ingredient.name}</a>
                                    </div>
                                    <div className="col-4">
                                        <p><span className="badge">{ingredient.count} Recipes</span></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        
                    )
                })}

            </div>
        


        </Layout>
    )
}

export const query = graphql`
  query {
    allWpIngredient(sort: {fields: name, order: ASC}) {
        nodes {
        name
        uri
        }
    }
    allWpRecipe {
        nodes {
            recipeInformation {
                ingredients {
                    ingredientname {
                        id
                        name
                    }
                }
            }
        }
    }
  }
`;

export default IngredientsPage