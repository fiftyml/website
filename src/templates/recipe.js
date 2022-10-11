import React, { useEffect, useState, useMemo } from "react"
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/layout.js';

import star from "../assets/images/star.svg"

const Recipe = ({ data, pageContext}) => {

    const image = getImage(data.wpRecipe.recipeInformation.image.localFile)

    var recipe = data.wpRecipe
    var title = data.wpRecipe.title

    var rootIngredients = data.wpRecipe.recipeInformation.ingredients
    var formattedIngredients = []

    for (let i=0; i < rootIngredients.length; i++) {
      if (rootIngredients[i].otherMeasurement) {
        let current = [rootIngredients[i].ingredientname.name, rootIngredients[i].quantity, rootIngredients[i].otherMeasurement]
        formattedIngredients.push(current)
      } else {
        let current = [rootIngredients[i].ingredientname.name, rootIngredients[i].quantity, rootIngredients[i].measurement]
        formattedIngredients.push(current)
      }
    }

    const ingredients = useMemo(() => 
      formattedIngredients
    , []);

    // Get Single Serving Measurements
    var singleServingMeasurements = []
    for (var i = 0; i < ingredients.length; i++) {
      singleServingMeasurements.push(ingredients[i][1])
    }

    // Create States for Servings + Measurements
    const [servings, setServings] = useState(1);
    const [measurements, setMeasurements] = useState(singleServingMeasurements)

    // Change Serving Count on +/- Click
    const ChangeServings = (change) => {
      if ((servings + change) > 0 && (servings + change) <= 20) {
        setServings(servings + change);        
      }
    };

    // On Servings Change, Update Measurements
    useEffect(() => {
      let output = [];
      for (var i = 0; i < ingredients.length; i++) {
        output.push(ingredients[i][1] * servings)
      }
      setMeasurements(output);
    }, [ingredients, servings]);

    return (
        <Layout>
          <Seo post={data.wpRecipe} />
          <div className="header">
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
                  <div className="col-12 col-md-8">
                    <h1>{title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          

          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
              <GatsbyImage image={image} alt={data.wpRecipe.recipeInformation.image.altText} />
              </div>
              <div className="col-12 col-md-4 offset-md-1 m-mt-3">
                <h2>Ingredients</h2>
                <table className="recipe-table" id="ingredientsList">
                  {
                    ingredients.map((ingredient, index) => {
                      return (
                        <tr>
                          <td>{ingredient[0]}</td>
                          <td><span id={"ingredient-" + index}>{measurements[index]}</span>{ingredient[2]}</td>
                        </tr>
                      )
                    })
                  }
                <tr className="servings">
                    <td>Servings</td>
                    <td>
                      <span className="button-group"> 
                        <button id="minusServing" onClick={() => ChangeServings(-1)}>-</button>
                        <p id="servingCount">{servings}</p>
                        <button id="addServing" onClick={() => ChangeServings(1)}>+</button>
                      </span>
                    </td>
                  </tr>
                  {/* <tr className="measurements">
                    <td>Measurements</td>
                    <td>
                      <span className="button-group">
                        <p className="active" id="minusServing" onClick={() => ChangeServings(-1)}>ml</p>
                        <p id="addServing" onClick={() => ChangeServings(1)}>Oz</p>
                      </span>
                    </td>
                  </tr> */}
                </table>
                
              </div>
            <div className="col-12 col-md-2 offset-md-2 m-mt-3" style={{ display: "flex", flexDirection: "column" }}>
                <img src={star} alt="Green Star Shape" style={{ marginTop: "auto", width: "fit-content", marginBottom: "1em"}} />
                <p>{recipe.recipeInformation.introText}</p>
              </div>
            </div>
          </div>

        <div className="container" style={{ marginTop: "5em" }}>
          <div className="row">
            <div className="col-12">
                  <h2>How to make a {title}</h2>
            </div>
          </div>
        </div>
        <hr style={{marginTop: 0}}/>
        <div className="container">     
          <div className="row">

            {recipe.recipeInformation.method.map((step, index) => {

              if (index % 2) {
                return (
                  <div className="col-10 offset-2 offset-md-0 col-md-3">
                    <p className="h3 text-green">{index + 1}.</p>
                    <span dangerouslySetInnerHTML={{ __html: step.step }}></span>
                  </div>
                )
              } else {
                return (
                  <div className="col-10 col-md-3">
                    <p className="h3 text-green">{index + 1}.</p>
                    <span dangerouslySetInnerHTML={{ __html: step.step }}></span>
                  </div>
                )
              }
            })}

            
          </div>
        </div>
        <hr />


        <div className="container" style={{ marginTop: "5em" }}>
          <div className="row wiggle-header">
            <div className="col">
                <div className="wiggle mobile-hide"></div>
            </div>
            <div className="col-auto text-right">
              <h2>Time for a history lesson</h2>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: 0, marginBottom: "3em" }} />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 offset-md-2" dangerouslySetInnerHTML={{ __html: recipe.recipeInformation.history }}>
            </div>
            <div className="col-12 col-md-4 offset-md-1" style={{ display: "flex", flexDirection: "column" }}>
                <table className="basic-table m-mt-2 m-mb-3">
                  {recipe.recipeInformation.historyTable.map(row => {
                    return (
                      <tr>
                        <td>{row.left}</td>
                        <td>{row.right}</td>
                      </tr>
                    )
                  })}
                </table>
              <p className="h3 text-green text-right history-snippet" style={{ marginTop: "auto" }}>{recipe.recipeInformation.historySnippet}</p>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "5em" }}>
          <div className="row wiggle-header">
            <div className="col-auto text-left">
              <h2>{title} FAQs</h2>
            </div>
            <div className="col">
              <div className="wiggle mobile-hide"></div>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: 0, marginBottom: "3em" }} />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-4">
              <table className="basic-table m-mt-2 m-mb-3">
                {recipe.recipeInformation.faqs.map(faq => {
                  return (
                    <tr>
                      <td><p>{faq.question}</p></td>
                      <td><p>{faq.answer}</p></td>
                    </tr>
                  )
                })}
              </table>
            </div>
          </div>
        </div>

        {recipe.recipeInformation.contentBlocks.map((block, index) => {
          if ((index + 1) % 2) {
            return (
              <>
                <div className="container" style={{ marginTop: "5em" }}>
                  <div className="row wiggle-header">
                    <div className="col">
                      <div className="wiggle mobile-hide"></div>
                    </div>
                    <div className="col-auto text-right">
                      <h2>{block.title}</h2>
                    </div>
                  </div>
                </div>
                <hr style={{ marginTop: 0, marginBottom: "3em" }} />
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-5 offset-md-2" dangerouslySetInnerHTML={{ __html: block.content }}>
                    </div>
                  </div>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className="container" style={{ marginTop: "5em" }}>
                  <div className="row wiggle-header">
                    <div className="col-auto text-left">
                      <h2>{block.title}</h2>
                    </div>
                    <div className="col">
                      <div className="wiggle mobile-hide"></div>
                    </div>
                  </div>
                </div>
                <hr style={{ marginTop: 0, marginBottom: "3em" }} />
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-7 offset-md-4" dangerouslySetInnerHTML={{ __html: block.content }}>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        })}
        
        

          
          
        </Layout>
    )
} 

export const query = graphql`
  query($id: String!) {
    wpRecipe(id: { eq: $id }) {
      title
      uri
      date
      modified
      recipeInformation {
        contentBlocks {
          content
          title
        }
        faqs {
          question
          answer
        }
        method {
          step
        }
        introText
        history
        historyTable {
          left
          right
        }
        historySnippet
        ingredients {
          ingredientname {
            name
          }
          measurement
          quantity
          otherMeasurement
        }
        image {
          altText
          localFile {
              childImageSharp {
                  gatsbyImageData(quality: 80)
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
            articleType
            pageType
            raw
        }
      }
    }
  }
`;

export default Recipe;  