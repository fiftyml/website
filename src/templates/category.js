import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const category = ({ data, pageContext }) => {
    var title = data.wpCategory.name
    return (
        <Layout>
            <h1>{title}</h1>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpCategory(id: { eq: $id }) {
      name
      uri
    }
  }
`;

export default category;