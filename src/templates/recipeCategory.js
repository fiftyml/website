import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';


const recipeCategory = ({ data, pageContext }) => {
    var title = data.wpRecipeCategory.name
    return (
        <Layout>
            <h1>{title}</h1>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpRecipeCategory(id: { eq: $id }) {
      name
      uri
    }
  }
`;

export default recipeCategory;