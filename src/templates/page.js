import * as React from "react"
import { navigate, graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';

import Layout from '../components/layout.js';

import star from "../assets/images/star.svg"
import wiggle from "../assets/images/wiggle.svg"

var strftime = require('strftime')

const page = ({ data, pageContext }) => {
    var title = data.wpPage.title
    return (
        <Layout className="whitepaper">
            <Seo post={data.wpPage} />

            <div className="header">
                <div className="header-row empty-row">
                    <hr />
                    <div className="container text-muted">
                    </div>
                </div>
                <div className="header-row link-row">
                    <hr />
                    <div className="container text-muted">
                        <div className="row">
                            <div className="col-12">
                                <a style={{cursor: "pointer"}} onClick={() => navigate(-1)}>Go back</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-row">
                    <hr />
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 order-1 order-md-0 sidebar">
                        <div>
                            <div className="wiggle" style={{ marginBottom: "1em" }}></div>
                            <p><span className="text-muted">Last Updated:</span><br />{strftime('%B %o %Y', new Date(data.wpPage.modified))}</p>
                        </div>
                        <div>
                            <img src={star} alt="Green Star Shape" style={{marginBottom: "1em"}}/>
                            <p>Got a question about something you see here?</p>
                            <p>Ping us an email:<br /><a href="mailto:hello@fiftyml.com" className="text-muted">hello@fiftyml.com</a></p>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 offset-md-1 order-0 order-md-1">
                        <span dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />
                    </div>
                </div>
            </div>


            


        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      uri
      date
      modified
      content
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

export default page;