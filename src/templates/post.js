import * as React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout.js';

const post = ({ data, pageContext }) => {
    var title = data.wpPost.title
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 post-content">
                        <h1>{title}</h1>
                        <span dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />
                    </div>
                    <div className="col-12 col-md-4 post-sidebar">
                        <p>Related Posts:</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      uri
      date
      modified
      content
    }
  }
`;

export default post;