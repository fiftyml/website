import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const recipe = ({ data, pageContext}) => {
    var title = data.wpRecipe.title
    return (
        <Layout>
            <h1>{title}</h1>
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
    }
  }
`;

export default recipe;