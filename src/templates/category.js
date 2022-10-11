import * as React from "react"
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from '../components/layout.js';

const category = ({ data, pageContext }) => {
    var title = data.wpCategory.name
    const posts = data.wpCategory.posts.nodes
    var categories = data.allWpCategory.nodes
    return (
        <Layout>
            <Seo post={data.wpCategory} />
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
                  <h1>{title}</h1>
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
                <a href="/journal/" className="badge">All</a>
                {categories.map(category => {
                  if (category.uri === data.wpCategory.uri) {
                    return (
                      <a href={category.uri} className="badge badge-success">{category.name}</a>
                    )
                  } else {
                    return (
                      <a href={category.uri} className="badge">{category.name}</a>
                    )
                  }
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
                <div className="col-12 col-md-4 m-mb-4">
                  <div className="post-card">
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
  query($id: String!) {
    wpCategory(id: { eq: $id }) {
      name
      uri
      posts {
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
            raw
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

export default category;