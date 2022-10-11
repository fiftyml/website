import * as React from "react"
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/layout.js';

const JournalPage = ({ data }) => {

    var posts = data.allWpPost.nodes
    var categories = data.allWpCategory.nodes

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
                        <div className="row">
                            <div className="col-12">
                                <h1>Our Journal</h1>
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

                    {posts.map(post => {
                        var image = getImage(post.featuredImage.node.localFile)
                        return (
                            <div className="col-12 col-md-4">
                                <div className="post-card m-mb-4">
                                    <a href={post.uri}>
                                        <GatsbyImage image={image} alt="Sausage" />
                                    </a>
                                    <div className="badge-group small">
                                        {post.categories.nodes.map(category => {
                                            return (
                                                <a className="badge" href={category.uri}>{category.name}</a>
                                            )
                                        })}
                                    </div>
                                    <a href={post.uri} className="h4">{post.title}</a>
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
    allWpPost(sort: {fields: date, order: DESC}) {
        nodes {
            title
            uri
            categories {
                nodes {
                    uri
                    name
                }
            }
            featuredImage {
                node {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(aspectRatio: 1.5, quality: 80)
                        }
                    }
                }
            }
        }
    }
    allWpCategory {
      nodes {
        name
        uri
      }
    }
  }
`;

export default JournalPage