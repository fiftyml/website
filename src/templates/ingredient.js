import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const ingredient = ({ data, pageContext }) => {
    var title = data.wpIngredient.title
    return (
        <Layout>
            <h1>{title}</h1>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpIngredient(id: { eq: $id }) {
      title
      uri
      date
      modified
    }
  }
`;

export default ingredient;